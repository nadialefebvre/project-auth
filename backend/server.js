import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import allEndpoints from "express-list-endpoints"
import crypto from "crypto"
import bcrypt from "bcrypt"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-auth"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

const User = mongoose.model("User", UserSchema)

app.get("/", (req, res) => {
  res.send(
    {
      "Welcome!": "Random Auth App",
      "All endpoints are listed here": "/endpoints",
      "Frontend": "https://random-auth.netlify.app"
    }
  )
})

app.get("/endpoints", (req, res) => {
  res.send(allEndpoints(app))
})

app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find()
    
    res.status(200).json({
      success: true,
      status_code: 200,
      response: allUsers
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: error
      }
    })
  }
})

//--------------------------- REGISTRATION ENDPOINT ---------------------------//
app.post("/register", async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()

    const userExists = await User.findOne({ username })

    if (userExists) {
      res.status(400).json({
        success: false,
        status_code: 400,
        response: {
          message: "Please choose another username."
        }
      })
    } else if (password.length < 8) {
      res.status(400).json({
        success: false,
        status_code: 400,
        response: {
          message: "Password must be at least 8 characters long."
        }
      })
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt)
      }).save()

      res.status(201).json({
        success: true,
        status_code: 201,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          userId: newUser._id
        }
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Could not create user.",
        errors: error.errors
      }
    })
  }
})

//--------------------------- LOGIN ENDPOINT ---------------------------//
app.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        status_code: 200,
        response: {
          username: user.username,
          accessToken: user.accessToken,
          userId: user._id
        }
      })
    } else {
      res.status(400).json({
        success: false,
        status_code: 400,
        response: {
          message: "Username and password don't match."
        },
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: error
      }
    })
  }
})

//--------------------------- AUTHENTICATED ENDPOINT ---------------------------//
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")

  try {
    const user = await User.findOne({ accessToken: accessToken })

    if (user) {
      next()
    } else {
      res.status(401).json({
        success: false,
        status_code: 401,
        response: {
          message: "Please log in / You are logged out"
        }
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      status_code: 400,
      response: {
        message: "Bad request.",
        errors: error
      }
    })
  }
}

app.get("/loggedin", authenticateUser)
app.get("/loggedin", (req, res) => {
  res.status(200).json({
    success: true,
    status_code: 200,
    response: "You are logged in!"
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

import React, { useState, useEffect } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"

import loading from "reducers/loading"
import user from "reducers/user"
import Loader from "../components/Loader"
import Copyright from "../components/Copyright"
import { API_URL } from "utils/utils"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector((store) => store.loading.isLoading)
  const accessToken = useSelector((store) => store.user.accessToken)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [mode, setMode] = useState("register")

  useEffect(() => {
    if (accessToken) {
      navigate("/loggedin")
    }
  }, [accessToken])

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (!username || !password) {
      alert("Username and password are required.")
    } else {
      dispatch(loading.actions.setLoading(true))
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      }
      fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setUsername(data.response.username))
              dispatch(user.actions.setUserId(data.response.userId))
              dispatch(user.actions.setAccessToken(data.response.accessToken))
              dispatch(user.actions.setError(null))
            })
          } else {
            batch(() => {
              alert(data.response.message)
              dispatch(user.actions.setError(data.response))
              dispatch(user.actions.setUsername(null))
              dispatch(user.actions.setUserId(null))
              dispatch(user.actions.setAccessToken(null))
            })
          }
          dispatch(loading.actions.setLoading(false))
        })
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      square
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {mode === "register" ? "Register" : "Log in"}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={onFormSubmit}
          sx={{ mt: 1, maxWidth: 450 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {mode === "register" ? "Register" : "Log in"}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => setMode(mode === "register" ? "login" : "register")}>
                {mode === "register"
                  ?
                  "You have an account? Click here to log in"
                  :
                  "Don't have an account? Click here to register"
                }
              </Link>
            </Grid>
          </Grid>
          <Copyright />
        </Box>
      </Box>
    </Grid>
  )
}

export default Login

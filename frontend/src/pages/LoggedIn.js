import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import Typography from "@mui/material/Typography"

import { API_URL } from "utils/utils"
import user from "../reducers/user"
import Copyright from "../components/Copyright"

const LoggedIn = () => {

  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const accessToken = useSelector((store) => store.user.accessToken)
  const username = useSelector((store) => store.user.username)

  useEffect(() => {
    if (!accessToken) {
      navigate("/")
    }
  }, [accessToken])

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      },
    }

    fetch(API_URL("loggedin"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.response)
          dispatch(user.actions.setError(null))
        } else {
          dispatch(user.actions.setError(data.response))
        }
      })
  }, [])

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
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logged in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography
            component="h1"
            variant="h6"
            sx={{ mt: 4, mb: 4, textAlign: "center" }}
          >
            Bravo {username}, you did it!<br />{message}
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => dispatch(user.actions.logOut())}
          >
            Log out
          </Button>
          <Copyright />
        </Box>
      </Box>
    </Grid>
  )
}

export default LoggedIn

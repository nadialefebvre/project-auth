import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Typography from '@mui/material/Typography'

import Copyright from "../components/Copyright"

const NotFound = () => {

  const navigate = useNavigate()

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <HelpOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Not found
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/")}
          >
            Go back to home page
          </Button>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  )
}

export default NotFound

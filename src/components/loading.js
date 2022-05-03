import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import '../styles/loading.css'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <p>
        <h1 className="LogoLabel" style={{ cursor: 'default', fontSize: 100 }}>
          Social Web
        </h1>
        Loading...
        <br />
        <b>Please wait!</b>
        <br />
        <CircularProgress sx={{ marginTop: 1 }} color="secondary" />
      </p>
    </div>
  )
}

export default LoadingScreen

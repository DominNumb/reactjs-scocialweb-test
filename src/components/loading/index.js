import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import './loading.css'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <h1
        className="LogoLabel"
        style={{ cursor: 'default', fontSize: 100, textAlign: 'center' }}
      >
        Social Web
      </h1>
      <p>
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

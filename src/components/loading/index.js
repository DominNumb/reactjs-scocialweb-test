import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import './loading.css'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      {/* <p>
        Loading...
        <br />
        <b>Please wait!</b>
        <br />
        <CircularProgress sx={{ marginTop: 1 }} color="secondary" />
      </p> */}

      <section>
        <div className="shadow" />
        <div className="bowl">
          <div className="liquid" />
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default LoadingScreen

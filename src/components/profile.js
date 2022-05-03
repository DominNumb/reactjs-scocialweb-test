import React, { Component } from 'react'
import Navbar from './navbar'

//REDUX
import { connect } from 'react-redux'

const Profile = () => {
  console.log()
  return (
    <>
      <div>
        <header className="site-header sticky-top ">
          <Navbar />
        </header>
        <div className="container">
          <a>Cs</a>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Profile)

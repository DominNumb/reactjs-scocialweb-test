import React, { Component } from 'react'
import Navbar from '../navbar'

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
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <div>Cs</div>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a> <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a> <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a> <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a> <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a> <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a> <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a> <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
          <a>Cs</a>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    slscreen: state.selectedScreen.slscreen,
    usrLoading: state.loadingScreen.usrLoading,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    handleUserLogin: (user) => dispatch({ type: 'USER_LOGIN', data: user }),
    handleSelectScreen: (screen) => {
      dispatch({ type: 'USER_SCREEN', data: screen })
    },
    handleSetLoading: (loading) => {
      dispatch({ type: 'USER_LOADING', data: loading })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

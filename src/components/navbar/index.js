import React, { useState } from 'react'
import './navbar.css'

//REDUX
import { connect } from 'react-redux'
import { getAuth } from 'firebase/auth'

//MAIN NAVBAR
const Navbar = (props, { onLoad }) => {
  const auth = getAuth()

  //LogOut FUNCTION
  function handleLogout(user, onLogout, onScreen) {
    //setLoading(true)
    props.onLoad(true)
    onLogout(user)
    auth
      .signOut()
      .then(function () {
        console.log('[INFO] User LogedOut')
        onScreen('login')
        props.onLoad(false)
        //setLoading(false)
      })
      .catch(function (error) {
        console.log('[ERROR] ' + error)
        props.onLoad(false)
        //setLoading(false)
      })
  }

  //MAIN RETURN
  return (
    <>
      <ul>
        <div>
          <li>
            {/* eslint-disable-next-line */}
            <a
              href="#"
              className="LogoNavbar"
              style={{ marginLeft: 30 }}
              onClick={() => props.handleSelectScreen('home')}
            >
              Social Web
            </a>
          </li>
          <li>
            {props.slscreen === 'profile' ? (
              /* eslint-disable-next-line */
              <a
                href="#"
                style={{ color: '#c30099' }}
                onClick={() => props.handleSelectScreen('profile')}
              >
                Profile
              </a>
            ) : (
              /* eslint-disable-next-line */
              <a
                href="#"
                style={{ color: 'white' }}
                onClick={() => props.handleSelectScreen('profile')}
              >
                Profile
              </a>
            )}
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a href="#" style={{ color: 'white' }}>
              Messages
            </a>
          </li>
        </div>
        <div>
          <li style={{ float: 'right' }}>
            {/* eslint-disable-next-line */}
            <a
              className="button-27"
              style={{ marginRight: 30 }}
              onClick={() =>
                handleLogout(
                  props.user,
                  props.handleUserLogedOut,
                  props.handleSelectScreen,
                )
              }
            >
              LogOut
            </a>
          </li>
        </div>
      </ul>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
    firebaseConfig: state.firebaseConfig,
    user: state.user,
    slscreen: state.selectedScreen.slscreen,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    handleUserLogedOut: (user) => {
      dispatch({ type: 'USER_LOGOUT', data: user })
    },
    handleSelectScreen: (screen) => {
      dispatch({ type: 'USER_SCREEN', data: screen })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

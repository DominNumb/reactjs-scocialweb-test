import React from 'react'
import '../styles/navbar.css'

//REDUX
import { connect } from 'react-redux'
import { getAuth } from 'firebase/auth'

//MAIN NAVBAR
const Navbar = (props) => {
  const auth = getAuth()

  //LogOut FUNCTION
  function handleLogout(user, onLogout, onScreen) {
    onLogout(user)
    auth
      .signOut()
      .then(function () {
        console.log('[INFO] User LogedOut')
        onScreen('login')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  //MAIN RETURN
  return (
    <nav className="Navbar navbar-expand-lg ShadowNavbar">
      <div className="container-fluid">
        <a className="navbar-brand">
          <span
            className="LogoNavbar"
            style={{ cursor: 'pointer' }}
            onClick={() => props.handleSelectScreen('home')}
          >
            Social Web
          </span>
        </a>
        <div className="navbar-collapse">
          <ul className="Navbar-nav">
            <li className="Nav-link">
              <span style={{ color: 'white', cursor: 'default' }}>Profile</span>
            </li>
            <li className="Nav-link">
              <span style={{ color: 'white', cursor: 'default' }}>
                Messages
              </span>
            </li>
          </ul>
          <form className="d-flex">
            <button
              className="button-27"
              onClick={() =>
                handleLogout(
                  props.user,
                  props.handleUserLogedOut,
                  props.handleSelectScreen,
                )
              }
            >
              LogOut
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
    firebaseConfig: state.firebaseConfig,
    user: state.user,
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

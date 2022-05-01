import React from 'react'

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
    <nav
      className="navbar navbar-expand-lg navbar-dark ShadowNavbar"
      style={{ backgroundColor: '#121212' }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" style={{ cursor: 'pointer' }}>
          <span
            className="LogoNavbar"
            onClick={() => this.props.handleSelectScreen('home')}
          >
            Social Web
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a href="#" className="nav-link" aria-current="page">
              Profile
            </a>
            <a className="nav-link" href="#">
              Messages
            </a>
          </div>
        </div>
        <div className="d-flex">
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

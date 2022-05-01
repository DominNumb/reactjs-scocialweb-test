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
    <>
      <ul>
        <div>
          <li>
            <a className="LogoNavbar">Social Web</a>
          </li>
          <li>
            <a href="#news">Profile</a>
          </li>
        </div>
        <div>
          <li style={{ float: 'right' }}>
            <a
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
            </a>
          </li>
        </div>
      </ul>
    </>
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

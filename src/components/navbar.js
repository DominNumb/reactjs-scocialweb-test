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
            <a
              className="LogoNavbar"
              style={{ marginLeft: 30 }}
              onClick={() => props.handleSelectScreen('home')}
            >
              Social Web
            </a>
          </li>
          <li>
            {props.slscreen === 'profile' ? (
              <a
                href="#"
                style={{ color: '#c30099' }}
                onClick={() => props.handleSelectScreen('profile')}
              >
                Profile
              </a>
            ) : (
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
            <a href="#" style={{ color: 'white' }}>
              Messages
            </a>
          </li>
        </div>
        <div>
          <li style={{ float: 'right' }}>
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

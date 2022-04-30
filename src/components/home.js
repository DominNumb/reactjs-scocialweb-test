import React, { Component } from 'react'

//REDUX
import { connect } from 'react-redux'
import { getAuth } from 'firebase/auth'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  //MAIN HOME
  render() {
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
        <h1>Home screen</h1>
        <button
          className="button-27"
          onClick={() =>
            handleLogout(
              this.props.user,
              this.props.handleUserLogedOut,
              this.props.handleSelectScreen,
            )
          }
        >
          logOut
        </button>
      </>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

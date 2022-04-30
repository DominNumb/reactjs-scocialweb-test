import React, { Component } from 'react'
import '../styles/app.css'
import Login from './login'
import Home from './home'
import Register from './register'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userIsSignedUp: 'null',
    }
  }

  render() {
    const app = initializeApp(this.props.firebaseConfig)
    const auth = getAuth()

    //Check if USER is already loged in
    if (this.state.userIsSignedUp === 'null') {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.setState({ userIsSignedUp: 'true' })
          console.log('[INFO] User was already logedIn')
          this.props.handleSelectScreen('home')
          this.props.handleUserLogin(user)
        } else {
          console.log("[INFO] User isn't logedIn")
          this.props.handleSelectScreen('login')
          this.setState({ userIsSignedUp: 'false' })
        }
      })
    }

    //Open HOME or LOGIN screen depand if user is signedin
    if (this.state.userIsSignedUp === 'true') {
      return (
        <div className="App">
          <Home />
        </div>
      )
    } else if (this.state.userIsSignedUp === 'false') {
      if (this.props.slscreen === 'login') {
        return (
          <div className="App">
            <Login />
          </div>
        )
      } else if (this.props.slscreen === 'register') {
        return (
          <div className="App">
            <Register />
          </div>
        )
      }
    }
  }
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
    handleUserLogin: (user) => dispatch({ type: 'USER_LOGIN', data: user }),
    handleSelectScreen: (screen) => {
      dispatch({ type: 'USER_SCREEN', data: screen })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

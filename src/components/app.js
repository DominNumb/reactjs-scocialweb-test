import React, { Component } from 'react'
import '../styles/app.css'
import Login from './login'
import Home from './home'

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
          this.props.handleUserLogin(user)
        } else {
          console.log("[INFO] User isn't logedIn")
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
      return (
        <div className="App">
          <Login />
        </div>
      )
    }
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
    handleUserLogin: (user) => dispatch({ type: 'USER_LOGIN', data: user }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

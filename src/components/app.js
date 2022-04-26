import React, { Component } from 'react'
import '../App.css'
import Login from './login'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const app = initializeApp(this.props.firebaseConfig)
    const auth = getAuth()
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    firebaseConfig: state.firebaseConfig,
  }
}

export default connect(mapStateToProps)(App)

import React, { Component } from 'react'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useremail: '',
      userpassword: '',
      errormsg: '',
    }
  }

  render() {
    const auth = getAuth()

    //Login function
    const handleLogin = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('[INFO] Login successful!')
          this.setState({ errormsg: '' })
          this.props.handleUserLogin(user)
          this.setState({ userpassword: '' })
        })
        .catch((error) => {
          const errorCode = error.code
          switch (error.code) {
            case 'auth/invalid-email':
              this.setState({ errormsg: 'Invalid email!' })
              break
            case 'auth/user-not-found':
              this.setState({ errormsg: 'User not found!' })
              break
            case 'auth/wrong-password':
              this.setState({ errormsg: 'Wrong password!' })
              break
            case 'auth/internal-error':
              this.setState({ errormsg: 'Internal error' })
              break
          }
          console.log('[ERROR] ' + errorCode)
        })
    }

    //Login return
    return (
      <div className="LoginForm">
        <div>
          <h1>Login</h1>
          <br />
          <input
            value={this.state.useremail}
            onChange={(event) =>
              this.setState({ useremail: event.target.value })
            }
            type="text"
            placeholder="Type email"
          />
          <br />
          <input
            value={this.state.userpassword}
            onChange={(event) =>
              this.setState({ userpassword: event.target.value })
            }
            type="password"
            placeholder="Type password"
          />
          <br />
          <button
            onClick={() =>
              handleLogin(this.state.useremail, this.state.userpassword)
            }
          >
            Login
          </button>
        </div>
        <div>
          <br />
          <span style={{ color: '#b71c1c' }}>{this.state.errormsg}</span>
          <br />
          <h3>v{this.props.version}</h3>
        </div>
      </div>
    )
  }
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
    user: state.user,
    version: state.appVersion.version,
    firebaseConfig: state.firebaseConfig,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    handleUserLogin: (user) => dispatch({ type: 'USER_LOGIN', data: user }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

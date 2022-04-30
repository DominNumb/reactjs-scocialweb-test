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
    const handleLogin = async (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('[INFO] Login successful!')
          this.setState({ errormsg: '' })
          this.props.handleUserLogin(user)
          this.props.handleSelectScreen('home')
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
            default:
              break
          }
          console.log('[ERROR] ' + errorCode)
        })
    }

    //Login return
    return (
      <div className="LoginForm">
        <div>
          <h1 className="LogoLabel">Login to Social Web</h1>
          <br />
          <input
            className="LoginInput"
            value={this.state.useremail}
            onChange={(event) =>
              this.setState({ useremail: event.target.value })
            }
            type="text"
            placeholder="Type email"
          />
          <br />
          <input
            className="LoginInput"
            value={this.state.userpassword}
            onChange={(event) =>
              this.setState({ userpassword: event.target.value })
            }
            type="password"
            placeholder="Type password"
          />
          <br />
          <br />
          <div className="LoginLabel">
            <span style={{ color: '#b71c1c' }}>{this.state.errormsg}</span>
          </div>
          <br />

          <span
            className="button-27"
            style={{ width: 200 }}
            onClick={() =>
              handleLogin(this.state.useremail, this.state.userpassword)
            }
          >
            Login
          </span>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          <span>You don't have an account? </span>
          <span
            style={{ color: 'purple', fontWeight: 'bold' }}
            onClick={() => console.log('Register new account please')}
          >
            Register here!
          </span>
        </div>
        <br />
        <div className="LoginLabel">
          <span>v{this.props.version} by DominNumb</span>
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
    handleSelectScreen: (screen) => {
      dispatch({ type: 'USER_SCREEN', data: screen })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

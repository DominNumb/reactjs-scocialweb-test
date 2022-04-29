import React, { Component } from 'react'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.errInput = React.createRef()
    this.focusErrInput = this.focusErrInput.bind(this)
    this.state = {
      useremail: '',
      userpassword: '',
    }
  }
  focusErrInput() {
    this.errInput.current.focus()
  }

  render() {
    const auth = getAuth()

    //Login function
    const handleLogin = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('Login successful!')
          this.props.handleUserLogin(user)
          this.setState({ userpassword: '' })
        })
        .catch((error) => {
          const errorCode = error.code
          switch (error.code) {
            case 'auth/invalid-email':
              this.errInput.current.value = 'Invalid email!'
              break
            case 'auth/user-not-found':
              this.errInput.current.value = 'User not found!'
              break
            case 'auth/wrong-password':
              this.errInput.current.value = 'Wrong password!'
              break
          }
          console.log('[ERROR] ' + errorCode)
        })
    }

    return (
      <>
        <div>
          <h1>Login to SocialWeb</h1>
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
          <center>
            <input
              type={'text'}
              style={{ background: 'white', border: 'none', color: 'red' }}
              ref={this.errInput}
              value=""
              disabled
            />
          </center>
          <br />
          <h3>v{this.props.version}</h3>
        </div>
      </>
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

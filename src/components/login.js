import React, { Component, version } from 'react'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useremail: '',
      userpassword: '',
    }
  }
  render() {
    const app = initializeApp(this.props.firebaseConfig)
    const auth = getAuth()

    //Login function
    const handleLogin = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('Login successful!')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('Error')
        })
    }

    return (
      <>
        <div>
          <h1>Login to SocialWeb</h1> <h3>v{this.props.version}</h3>
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
          <br />
          <br />
          <br />
          <hr />
          <button>get inf</button>
          <hr />
          <br />
          <br />
          <br />
          <br />
          <div>email: test@gmail.com</div>
          <div>password: test123</div>
        </div>
      </>
    )
  }
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
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

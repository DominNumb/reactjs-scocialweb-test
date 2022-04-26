import React, { Component, version } from 'react'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.infInput = React.createRef()
    this.focusInfInput = this.focusInfInput.bind(this)
    this.state = {
      useremail: '',
      userpassword: '',
    }
  }
  focusInfInput() {
    this.infInput.current.focus()
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
          this.props.handleUserLogin(user)
          this.setState({ userpassword: '' })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('Error')
        })
    }

    //Info Button Function
    const handleInf = () => {
      console.log(this.props.user)
      if (!this.props.user.email) {
        console.log('You are not logged in!')
        this.infInput.current.value = 'You are not logged in!'
      } else {
        console.log('You are signed In!')
        this.infInput.current.value = 'You are signed In!'
      }
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
          <button onClick={() => handleInf()}>get inf</button>
          <br />
          <input
            type={'text'}
            style={{ background: 'white', border: 'none' }}
            ref={this.infInput}
            value=""
            disabled
          />
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

import React, { Component } from 'react'
import './register.css'
import LoadingScreen from '../loading'
//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useremail: '',
      userpassword: '',
      errormsg: '',
      loading: false,
    }
  }
  render() {
    const auth = getAuth()

    //Register function
    const handleRegister = async (email, password) => {
      this.setState({ loading: true })
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('[INFO] Register successful!')
          this.setState({ errormsg: '' })
          this.props.handleUserLogin(user)
          this.props.handleSelectScreen('home')
          this.setState({ loading: false })
        })
        .catch((error) => {
          const errorCode = error.code
          switch (error.code) {
            case 'auth/invalid-email':
              this.setState({ errormsg: 'Invalid email!' })
              this.setState({ loading: false })
              break
            case 'auth/weak-password':
              this.setState({ errormsg: 'Weak password!' })
              this.setState({ loading: false })
              break
            case 'auth/email-already-in-use':
              this.setState({ errormsg: 'Email was already used!' })
              this.setState({ loading: false })
              break
            case 'auth/internal-error':
              this.setState({ errormsg: 'Internal error' })
              this.setState({ loading: false })
              break
            case 'auth/missing-email':
              this.setState({ errormsg: 'Email is missing!' })
              this.setState({ loading: false })
              break
            case 'auth/network-request-failed':
              this.setState({ errormsg: 'Internet connection failed!' })
              this.setState({ loading: false })
              break
            default:
              this.setState({ loading: false })
              break
          }
          console.log('[ERROR] ' + errorCode)
        })
    }

    //MAIN return
    if (!this.state.loading) {
      return (
        <>
          <div className="LoginForm">
            <div>
              <h1 className="LogoLabel" style={{ cursor: 'default' }}>
                Register
              </h1>
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
                  handleRegister(this.state.useremail, this.state.userpassword)
                }
              >
                Register
              </span>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
              <span style={{ cursor: 'default' }}>You have an account? </span>
              <span
                style={{
                  color: 'purple',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={() => this.props.handleSelectScreen('login')}
              >
                Login here!
              </span>
            </div>
          </div>
        </>
      )
    } else {
      return <LoadingScreen />
    }
  }
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
    user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
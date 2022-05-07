import React, { Component } from 'react'
import './register.css'
import LoadingScreen from '../loading'

//MUI
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CheckIcon from '@mui/icons-material/Check'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  doc,
  addDoc,
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      userphoto: '',
      userurl: '',
      useremail: '',
      userpassword: '',
      userpasswordSec: '',
      errormsg: '',
      userLoginDATA: '',
      loading: false,
      registerButton: false,
    }
  }
  render() {
    const auth = getAuth()
    const app = initializeApp(this.props.firebaseConfig)
    const db = getFirestore(app)
    const storage = getStorage(app)

    // #1 Check from DB  _______________________________________________________________________________________
    const handleCheckUsername = async (usrMail, usrPass) => {
      this.setState({ loading: true })
      this.props.handleSetAuthStatus(false)
      const usersRef = collection(db, 'users')
      const q = query(
        usersRef,
        where('username', '==', this.state.username.toLowerCase()),
      )
      await getDocs(q).then((response) => {
        const usrs = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
        const vysledek = usrs.map((user) => user.data.username)
        if (vysledek.toString() === this.state.username.toLowerCase()) {
          console.log('[ERROR] Username is unavaileble!')
          this.setState({ errormsg: 'Username is taken!' })
          this.setState({ loading: false })
        } else {
          console.log('[INFO] Username is availeble!')
          handleRegister(usrMail, usrPass) //# Stage 2
        }
      })
    }

    // #2 Register FUNCTION  ____________________________________________________________________________________
    const handleRegister = (email, password) => {
      //Check if is not second password empty
      if (this.state.userpassword === '') {
        this.setState({ errormsg: 'Password is missing!' })
        this.setState({ loading: false })
        this.props.handleSetAuthStatus(true)
      } else if (this.state.userpasswordSec === '') {
        this.setState({ errormsg: 'Second password is missing!' })
        this.setState({ loading: false })
        this.props.handleSetAuthStatus(true)
      } else if (this.state.userphoto === '') {
        this.setState({ errormsg: 'Photo URL is missing!' })
        this.setState({ loading: false })
        this.props.handleSetAuthStatus(true)
      } else if (this.state.userpassword === this.state.userpasswordSec) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            //auth.signOut()
            console.log('[INFO] Register to auth was successful!')
            this.setState({ userLoginDATA: user })
            handlePicSubmit() //# Stage 3
          })
          .catch((error) => {
            const errorCode = error.code
            switch (error.code) {
              case 'auth/invalid-email':
                this.setState({ errormsg: 'Invalid email!' })
                this.setState({ loading: false })
                this.props.handleSetAuthStatus(true)
                break
              case 'auth/weak-password':
                this.setState({ errormsg: 'Weak password!' })
                this.setState({ loading: false })
                this.props.handleSetAuthStatus(true)
                break
              case 'auth/email-already-in-use':
                this.setState({ errormsg: 'Email was already used!' })
                this.setState({ loading: false })
                this.props.handleSetAuthStatus(true)
                break
              case 'auth/internal-error':
                this.setState({ errormsg: 'Internal error' })
                this.setState({ loading: false })
                this.props.handleSetAuthStatus(true)
                break
              case 'auth/missing-email':
                this.setState({ errormsg: 'Email is missing!' })
                this.setState({ loading: false })
                this.props.handleSetAuthStatus(true)
                break
              case 'auth/network-request-failed':
                this.setState({ errormsg: 'Internet connection failed!' })
                this.setState({ loading: false })
                this.props.handleSetAuthStatus(true)
                break
              default:
                this.setState({ loading: false })
                this.props.handleSetAuthStatus(true)
                break
            }
            console.log('[ERROR] ' + errorCode)
          })
      } else {
        this.setState({ errormsg: 'Password are not the same!' })
        this.setState({ loading: false })
        this.props.handleSetAuthStatus(true)
      }
    }

    //Profile PIC Functions
    const handlePicChange = (event) => {
      if (event.target.files[0]) {
        this.setState({ userphoto: event.target.files[0] })
        this.setState({ registerButton: true })
      }
    }

    // #3 Upload profile PIC    ____________________________________________________________________________________
    const handlePicSubmit = () => {
      const imageRef = ref(
        storage,
        'users/' + this.state.useremail.toLowerCase() + '/image',
      )
      uploadBytes(imageRef, this.state.userphoto)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              this.setState({ userurl: url })
              console.log('[INFO] Photo uploaded to the storage!')
              handleCreateUser(url) //# Stage 4
            })
            .catch((error) => {
              console.log('[ERROR] GetURL: ', error.message)
              this.setState({ loading: false })
              this.props.handleSetAuthStatus(true)
            })
        })
        .catch((error) => {
          console.log('[ERROR] UploadBytes: ', error.message)
          this.setState({ loading: false })
          this.props.handleSetAuthStatus(true)
        })
    }

    // #4 Create user to Firestore    ____________________________________________________________________________________
    const handleCreateUser = (phtURL) => {
      const usersRef = collection(db, 'users')
      addDoc(usersRef, {
        email: this.state.useremail.toLowerCase(),
        photoURL: phtURL,
        username: this.state.username,
      }).then(() => {
        console.log('[INFO] Created NEW USER!!')
        this.props.handleSetAuthStatus(true)
        this.props.handleUserLogin(this.state.userLoginDATA)
        handleLogin(this.state.useremail.toLowerCase(), this.state.userpassword) //# Stage 5
      })
    }

    // #5 Login function  ____________________________________________________________________________________
    const handleLogin = async (email, password) => {
      this.setState({ loading: true })
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('[INFO] Login successful!')
          this.setState({ errormsg: '' })
          this.props.handleUserLogin(user)
          this.props.handleSelectScreen('home')
          this.setState({ loading: false })
          this.props.onLogin()
        })
        .catch((error) => {
          const errorCode = error.code

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

              <input
                className="LoginInput"
                value={this.state.username}
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
                type="text"
                placeholder="Username"
              />
              <br />
              <input
                className="LoginInput"
                value={this.state.useremail}
                onChange={(event) =>
                  this.setState({ useremail: event.target.value })
                }
                type="text"
                placeholder="Email"
              />
              <br />
              <input
                className="LoginInput"
                value={this.state.userpassword}
                onChange={(event) =>
                  this.setState({ userpassword: event.target.value })
                }
                type="password"
                placeholder="Password"
              />
              <br />
              <input
                className="LoginInput"
                value={this.state.userpasswordSec}
                onChange={(event) =>
                  this.setState({ userpasswordSec: event.target.value })
                }
                type="password"
                placeholder="Repeat password"
              />
              <br />
              <br />
              <br />
              <br />
              <span
                style={{
                  color: 'rgba(57, 54, 57, 0.805)',
                  fontWeight: 'bold',
                }}
              >
                Select profile picture:
              </span>
              <br />
              <br />

              {this.state.registerButton ? (
                <label style={{ cursor: 'pointer' }}>
                  <input
                    className="PhotoInput"
                    type="file"
                    placeholder="Image"
                    onChange={handlePicChange}
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <CheckIcon color="success" fontSize="large" />
                </label>
              ) : (
                <label style={{ cursor: 'pointer' }}>
                  <input
                    className="PhotoInput"
                    type="file"
                    placeholder="Image"
                    onChange={handlePicChange}
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <AddPhotoAlternateIcon color="secondary" fontSize="large" />
                </label>
              )}

              <br />

              <br />
              <div className="LoginLabel">
                <span style={{ color: '#b71c1c' }}>{this.state.errormsg}</span>
              </div>
              <br />
              {this.state.registerButton && (
                <span
                  className="button-27"
                  style={{ width: 200 }}
                  onClick={() =>
                    handleCheckUsername(
                      this.state.useremail,
                      this.state.userpassword,
                    )
                  }
                >
                  Register
                </span>
              )}
            </div>
            <br />

            <div>
              <span style={{ cursor: 'default' }}>You have an account? </span>
              <span
                style={{
                  color: 'rgb(245, 66, 245)',
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
    handleSetAuthStatus: (stat) => {
      dispatch({ type: 'AUTH_STATUS', data: stat })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

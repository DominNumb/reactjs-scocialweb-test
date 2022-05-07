import React, { Component } from 'react'
import './register.css'
import LoadingScreen from '../loading'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
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
          handleRegister(usrMail, usrPass)
        }
      })
    }

    // #2 Register FUNCTION  ____________________________________________________________________________________
    const handleRegister = async (email, password) => {
      //Check if is not second password empty
      if (this.state.userpassword === '') {
        this.setState({ errormsg: 'Password is missing!' })
        this.setState({ loading: false })
      } else if (this.state.userpasswordSec === '') {
        this.setState({ errormsg: 'Second password is missing!' })
        this.setState({ loading: false })
      } else if (this.state.userphoto === '') {
        this.setState({ errormsg: 'Photo URL is missing!' })
        this.setState({ loading: false })
      } else if (this.state.userpassword === this.state.userpasswordSec) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            console.log('[INFO] Register successful!')
            this.setState({ errormsg: '' })
            this.setState({ userLoginDATA: user })
            handlePicSubmit() //ADD inside new user func in DB
            //open new FUNC that update user info with username <----------------------- X FIX X
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
      } else {
        this.setState({ errormsg: 'Password are not the same!' })
        this.setState({ loading: false })
      }
    }

    //Profile PIC Functions
    const handlePicChange = (event) => {
      if (event.target.files[0]) {
        this.setState({ userphoto: event.target.files[0] })
      }
    }
    const handlePicSubmit = () => {
      const imageRef = ref(storage, 'users/' + this.state.useremail + '/image')
      uploadBytes(imageRef, this.state.userphoto)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              this.setState({ userurl: url })
              console.log('[INFO] Photo uploaded to the storage!')
              handleCreateUser(url)
              //HERE NEED TO UPDATE user info in DB with photoURL <---------------------------- X FIX X
            })
            .catch((error) => {
              console.log('[ERROR] GetURL: ', error.message)
              this.setState({ loading: false })
            })
        })
        .catch((error) => {
          console.log('[ERROR] UploadBytes: ', error.message)
          this.setState({ loading: false })
        })
    }

    const handleCreateUser = (phtURL) => {
      const usersRef = collection(db, 'users')
      addDoc(usersRef, {
        email: this.state.useremail,
        photoURL: phtURL,
        username: this.state.username,
      }).then(() => {
        console.log('[INFO] Created NEW USER!!')
        this.setState({ loading: false })
        this.props.handleUserLogin(this.state.userLoginDATA)
        this.props.handleSelectScreen('home')
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
              <input
                className="LoginInput"
                onChange={handlePicChange}
                type="file"
                placeholder="Photo"
              />

              <br />
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
                  handleCheckUsername(
                    this.state.useremail,
                    this.state.userpassword,
                  )
                }
              >
                Register
              </span>
            </div>
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

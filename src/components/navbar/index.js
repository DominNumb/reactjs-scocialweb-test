import React, { useState, useEffect } from 'react'
import './navbar.css'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  doc,
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

//MAIN NAVBAR
const Navbar = (props, { onLoad }) => {
  const auth = getAuth()
  const app = initializeApp(props.firebaseConfig)
  const db = getFirestore(app)

  //USER INFO
  const [userData, setUserData] = useState(null)
  const [username, setUsername] = useState(null)
  const [userphoto, setUserphoto] = useState(null)
  function getUsername() {
    const citiesRef = collection(db, 'users')
    const q = query(citiesRef, where('email', '==', props.user.email))
    getDocs(q).then((response) => {
      const usrs = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }))
      setUserData(usrs)
      setUsername(usrs.map((user) => user.data.username))
      setUserphoto(usrs.map((user) => user.data.photoURL))
    })
  }
  useEffect(() => {
    getUsername()
  }, [])

  //LogOut FUNCTION
  function handleLogout(user, onLogout, onScreen) {
    props.onLoad(true)
    onLogout(user)
    auth
      .signOut()
      .then(function () {
        console.log('[INFO] User LogedOut')
        onScreen('login')
        props.onLoad(false)
      })
      .catch(function (error) {
        console.log('[ERROR] ' + error)
        props.onLoad(false)
      })
  }

  //MAIN RETURN
  return (
    <>
      <ul>
        <div>
          <li>
            {/* eslint-disable-next-line */}
            <a
              href="#"
              className="LogoNavbar"
              style={{ marginLeft: 30 }}
              onClick={() => props.handleSelectScreen('home')}
            >
              Social Web
            </a>
          </li>
          <li>
            <a
              href="#"
              style={
                props.slscreen === 'profile'
                  ? { color: '#c30099' }
                  : { color: 'white' }
              }
              onClick={() => props.handleSelectScreen('profile')}
            >
              Profile
            </a>
          </li>
          <li>
            {/* eslint-disable-next-line */}
            <a href="#" style={{ color: 'white' }}>
              Messages
            </a>
          </li>
        </div>
        <div>
          <img src={userphoto} className="NavbarPhoto" />
          <li style={{ float: 'right' }}>
            {/* eslint-disable-next-line */}
            <a
              className="button-27"
              style={{ marginRight: 30 }}
              onClick={() =>
                handleLogout(
                  props.user,
                  props.handleUserLogedOut,
                  props.handleSelectScreen,
                )
              }
            >
              LogOut
            </a>
          </li>
        </div>
      </ul>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
    firebaseConfig: state.firebaseConfig,
    user: state.user,
    slscreen: state.selectedScreen.slscreen,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    handleUserLogedOut: (user) => {
      dispatch({ type: 'USER_LOGOUT', data: user })
    },
    handleSelectScreen: (screen) => {
      dispatch({ type: 'USER_SCREEN', data: screen })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

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
    const q = query(
      citiesRef,
      where('email', '==', props.user.email.toLowerCase()),
    )
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

  //SIDEBAR
  function openNav() {
    document.getElementById('mySidebar').style.width = '250px'
    document.getElementById('main').style.marginLeft = '250px'
    document.getElementById('openbtn').style.display = 'none'
  }
  function closeNav() {
    document.getElementById('mySidebar').style.width = '0'
    document.getElementById('main').style.marginLeft = '0'
    document.getElementById('openbtn').style.display = 'unset'
  }

  //MAIN RETURN
  return (
    <>
      <ul className="NavbarBlur">
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
            {/* eslint-disable-next-line */}
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
            <a
              href="#"
              style={
                props.slscreen === 'messages'
                  ? { color: '#c30099' }
                  : { color: 'white' }
              }
              onClick={() => props.handleSelectScreen('messages')}
            >
              Messages
            </a>
          </li>
        </div>
        <div>
          <img
            decoding="async"
            loading="lazy"
            src={userphoto}
            style={{ marginRight: '30px' }}
            className="NavbarPhoto"
          />
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
      <div className="sidebarMain ShadowNavbar">
        <div id="mySidebar" className="sidebar">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => closeNav()}
          >
            ×
          </a>
          <a
            href="#"
            className="LogoNavbar"
            style={{ fontSize: '30px', marginBottom: '40px' }}
            onClick={() => props.handleSelectScreen('home')}
          >
            Social Web
          </a>
          <a
            href="#"
            style={
              props.slscreen === 'profile'
                ? { color: '#c30099', marginBottom: '15px' }
                : { color: 'white', marginBottom: '15px' }
            }
            onClick={() => props.handleSelectScreen('profile')}
          >
            Profile
          </a>
          <a
            href="#"
            style={
              props.slscreen === 'messages'
                ? { color: '#c30099', marginBottom: '15px' }
                : { color: 'white', marginBottom: '15px' }
            }
            onClick={() => props.handleSelectScreen('messages')}
          >
            Messages
          </a>
          <a style={{ padding: '0' }}>
            {' '}
            <img
              style={{
                marginTop: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '97.5px',
              }}
              decoding="async"
              loading="lazy"
              src={userphoto}
              className="NavbarPhoto"
            />
          </a>

          <a
            className="button-27"
            style={{ margin: '30px', padding: '8px 8px 8px 8px' }}
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
        </div>

        <div id="main">
          <button id="openbtn" className="openbtn" onClick={() => openNav()}>
            ☰ Menu
          </button>
        </div>
      </div>
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

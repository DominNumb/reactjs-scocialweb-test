import React, { useEffect, useState } from 'react'
import Navbar from '../navbar'
import LoadingScreen from '../loading'

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

//REDUX
import { connect } from 'react-redux'

const Profile = (props, { onLoad }) => {
  const app = initializeApp(props.firebaseConfig)
  const db = getFirestore(app)

  //USER INFO
  const [userData, setUserData] = useState()
  const [username, setUsername] = useState()
  const [userphoto, setUserphoto] = useState()
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

  //Loading Function
  const [loading, setLoading] = useState(false)
  const handleLoading = (status) => {
    if (status === true) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }

  //Main return
  if (!loading) {
    return (
      <>
        <div>
          <header className="site-header sticky-top ">
            <Navbar onLoad={handleLoading} />
          </header>
          <div className="container">
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>Your username: {username}</div>
            <div>.</div>
            <img src={userphoto} width="240px" height="240px" />
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a> <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a> <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a> <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a> <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a> <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a> <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a> <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
            <a>.</a>
          </div>
        </div>
      </>
    )
  } else {
    return <LoadingScreen />
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    slscreen: state.selectedScreen.slscreen,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

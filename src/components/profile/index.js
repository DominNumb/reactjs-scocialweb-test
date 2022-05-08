import React, { useEffect, useState } from 'react'
import Navbar from '../navbar'
import LoadingScreen from '../loading'
import './profile.css'

//MUI
import EditIcon from '@mui/icons-material/Edit'

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
          <div className="container">
            <br />
            <img
              className="ProfileImage"
              decoding="async"
              loading="lazy"
              src={userphoto}
              width="240px"
              height="240px"
            ></img>
            <div className="LogoLabel">{username}</div>
            <br />

            <hr color="#631199" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
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

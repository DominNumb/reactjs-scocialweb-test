import React, { useEffect, useState } from 'react'
import LoadingScreen from '../loading'

//REDUX
import { connect } from 'react-redux'

const MessagesScreen = (props, { onLoad }) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen)

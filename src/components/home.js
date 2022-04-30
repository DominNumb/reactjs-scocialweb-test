import React, { Component } from 'react'

//Redux
import { connect } from 'react-redux'
import { getAuth } from 'firebase/auth'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <h1>Home screen</h1>
        <button onClick={() => this.props.handleUserLogedOut(this.props.user)}>
          logOut
        </button>
      </>
    )
  }
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
    firebaseConfig: state.firebaseConfig,
    user: state.user,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    handleUserLogedOut: (user) => {
      const auth = getAuth()
      dispatch({ type: 'USER_LOGOUT', data: user })
      auth
        .signOut()
        .then(function () {
          console.log('[INFO] User LogedOut')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

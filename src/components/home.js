import React, { Component } from 'react'

//Redux
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <h1>Home screen</h1>
        <button>logOut</button>
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
    handleUserLogedOut: (user) => dispatch({ type: 'USER_LOGOUT', data: user }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

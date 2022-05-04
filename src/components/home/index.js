import React, { Component } from 'react'
import Navbar from '../navbar'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { getAuth } from 'firebase/auth'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  //MAIN HOME
  render() {
    //eslint-disable-next-line
    const auth = getAuth()

    //MAIN RETURN
    return (
      <>
        <div>
          <header className="site-header sticky-top ">
            <Navbar />
          </header>
          <div className="container">
            <br />
            <h1>Home screen</h1>
            <br />
            <span>Welcome '</span>
            <span style={{ color: 'white' }}>{this.props.user.email}</span>
            <span>'</span>
            <br />
            <br />
            <br />
          </div>
        </div>
      </>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

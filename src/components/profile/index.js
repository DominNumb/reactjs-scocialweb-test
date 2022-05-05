import React, { useState } from 'react'
import Navbar from '../navbar'
import LoadingScreen from '../loading'

//REDUX
import { connect } from 'react-redux'

const Profile = (props, { onLoad }) => {
  const [loading, setLoading] = useState(false)
  const handleLoading = (status) => {
    alert(status)
    if (status === true) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }

  if (!this.state.loading) {
    return (
      <>
        <div>
          <header className="site-header sticky-top ">
            <Navbar onLoad={handleLoading} />
          </header>
          <div className="container">
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <div>Cs</div>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a> <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a> <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a> <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a> <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a> <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a> <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a> <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
            <a>Cs</a>
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

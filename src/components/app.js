import React, { Component } from 'react'
import '../styles/app.css'
import Login from './login'
import Home from './home'
import Register from './register'
import Profile from './profile'

//REDUX
import { connect } from 'react-redux'

//FIREBASE
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LoadingScreen from './loading'
import Navbar from './navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userIsSignedUp: undefined,
      loading: false,
    }
  }

  componentDidMount() {
    const auth = getAuth()
    console.log('[INFO] App did mount!')

    //Check if USER is already loged in
    if (this.state.userIsSignedUp === undefined) {
      onAuthStateChanged(auth, (user) => {
        if (this.props.athStat === true) {
          console.log('[AUTH] ON: Processing...')
          if (user) {
            this.setState({ userIsSignedUp: true })
            console.log('[INFO] User was already logedIn')
            this.props.handleSelectScreen('home')
            this.props.handleUserLogin(user)
          } else {
            console.log("[INFO] User isn't logedIn")
            this.props.handleSelectScreen('login')
            this.setState({ userIsSignedUp: false })
          }
        } else {
          console.log('[AUTH] OFF')
        }
      })
    }
  }

  render() {
    // eslint-disable-next-line
    const app = initializeApp(this.props.firebaseConfig)
    const auth = getAuth()

    //LOADING FUNC
    const handleLoading = (status) => {
      if (status === true) {
        this.setState({ loading: true })
      } else {
        this.setState({ loading: false })
      }
    }

    //Open HOME or LOGIN screen depand if user is signedin
    if (this.state.userIsSignedUp === true) {
      return (
        <div className="App">
          <header className="site-header sticky-top ">
            <Navbar onLoad={handleLoading} />
          </header>
          {this.props.slscreen === 'home' && (
            <>
              <Home />
            </>
          )}
          {this.props.slscreen === 'profile' && (
            <>
              <Profile />
            </>
          )}
        </div>
      )
    } else if (this.state.userIsSignedUp === false) {
      if (this.props.slscreen === 'login') {
        return (
          <div className="App">
            <Login />
          </div>
        )
      } else if (this.props.slscreen === 'register') {
        return (
          <div className="App">
            <Register onLogin={() => this.setState({ userIsSignedUp: true })} />
          </div>
        )
      }
    }

    return <LoadingScreen />
  }
}

//REDUX CONTAINER
function mapStateToProps(state) {
  return {
    firebaseConfig: state.firebaseConfig,
    user: state.user,
    slscreen: state.selectedScreen.slscreen,
    usrLoading: state.loadingScreen.usrLoading,
    athStat: state.authStatus.authstat,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUserLogin: (user) => dispatch({ type: 'USER_LOGIN', data: user }),
    handleSelectScreen: (screen) => {
      dispatch({ type: 'USER_SCREEN', data: screen })
    },
    handleSetLoading: (loading) => {
      dispatch({ type: 'USER_LOADING', data: loading })
    },
    handleSetAuthStatus: (stat) => {
      dispatch({ type: 'AUTH_STATUS', data: stat })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

import user from './user'
import appVersion from './version'
import firebaseConfig from './firebase/config'
import selectedScreen from './selectedScreen'

const allReducers = {
  user,
  appVersion,
  selectedScreen,
  firebaseConfig,
}

const reducer = (state = allReducers, action) => {
  const newState = { ...state }
  switch (action.type) {
    case 'USER_LOGIN':
      newState.user = action.data
      return newState

    case 'USER_LOGOUT':
      newState.user = { user: [null] }
      return newState

    case 'USER_SCREEN':
      newState.selectedScreen.slscreen = action.data
      return newState

    default:
      break
  }
  return newState
}

export default reducer

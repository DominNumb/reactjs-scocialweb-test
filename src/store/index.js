import user from './user'
import appVersion from './version'
import firebaseConfig from './firebase/config'

const allReducers = {
  user,
  appVersion,
  firebaseConfig,
}

const reducer = (state = allReducers, action) => {
  const newState = { ...state }
  switch (action.type) {
    case 'USER_LOGIN':
      newState.user = action.data
      return newState
      break
    case 'USER_LOGOUT':
      newState.user = { user: [null] }
      return newState
      break
  }
  return newState
}

export default reducer

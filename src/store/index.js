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
      console.log(action.data)
      break
  }
  return newState
}

export default reducer

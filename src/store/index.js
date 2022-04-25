import user from './user'
import appVersion from './version'

const allReducers = {
  user,
  appVersion,
}

const reducer = (state = allReducers, action) => {
  const newState = { ...state }
  switch (action.type) {
    case 'USER_LOGIN':
      console.log(action.data.email)
      break
  }
  return newState
}

export default reducer

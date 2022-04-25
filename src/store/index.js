import user from './user'

const allReducers = {
  user,
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

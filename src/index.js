import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/app'
import reportWebVitals from './reportWebVitals'

//REDUX
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './store'
const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

reportWebVitals()

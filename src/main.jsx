import React from 'react'
import ReactDOM from 'react-dom/client'
import './template.css'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <LoadingBar style={{zIndex: '999'}} />
      <App />
    </Provider>
  </React.StrictMode>
)

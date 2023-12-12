import { configureStore } from '@reduxjs/toolkit'
import { thunk } from "redux-thunk"
import userReducer from "./states/user/reducer"
import { loadingBarReducer } from 'react-redux-loading-bar'

export default configureStore({
  reducer: {
    user: userReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: [ thunk ]
})
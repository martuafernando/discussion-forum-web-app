import { configureStore } from '@reduxjs/toolkit'
import { thunk } from "redux-thunk"
import userReducer from "./states/user/reducer"
import { loadingBarReducer } from 'react-redux-loading-bar'
import errorReducer from './states/error/reducer'
import threadReducer from './states/thread/reducer'

export default configureStore({
  reducer: {
    user: userReducer,
    loadingBar: loadingBarReducer,
    error: errorReducer,
    threads: threadReducer
  },
  middleware: [ thunk ]
})
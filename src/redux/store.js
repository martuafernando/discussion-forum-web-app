import { configureStore } from '@reduxjs/toolkit'
import { thunk } from "redux-thunk"
import userReducer from "./states/user/reducer"
import { loadingBarReducer } from 'react-redux-loading-bar'
import errorReducer from './states/error/reducer'
import threadReducer from './states/threads/reducer'
import leaderboardReducer from './states/leaderboard/reducer'
import detailThreadReducer from './states/thread/reducer'
import hamburgerMenuReducer from './states/hamburger-menu/reducer'
import preloadReducer from './states/preload/reducer'

export default configureStore({
  reducer: {
    user: userReducer,
    loadingBar: loadingBarReducer,
    error: errorReducer,
    threads: threadReducer,
    thread: detailThreadReducer,
    leaderboard: leaderboardReducer,
    hamburgerMenu: hamburgerMenuReducer,
    preload: preloadReducer,
  },
  middleware: [ thunk ]
})
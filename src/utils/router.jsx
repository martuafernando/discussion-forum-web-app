import { createBrowserRouter, createRoutesFromElements, Outlet, Route, Navigate } from "react-router-dom"
import LoginPage from "@pages/login-page/LoginPage"
import MainLayout from "@components/layouts/main-layout/MainLayout"
import NotFoundPage from "@pages/not-found-page/NotFoundPage"
import RegisterPage from '@pages/register-page/RegisterPage'
import HomePage from "@pages/home-page/HomePage"
import CreateThread from "../pages/create-thread-page/CreateThreadPage"
import DetailThreadPage from "../pages/detail-thread-page/DetailThreadPage"
import LeaderboardPage from "../pages/leaderboard-page/LeaderboardPage"
import ProfilePage from "../pages/profile-page/ProfilePage"
import { useDispatch } from "react-redux"
import { useEffect } from 'react'
import { logoutUser } from "../redux/states/user/action"
import agent from "./agent"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/auth' element={<RequireNoAuth />} errorElement={<NotFoundPage />}>
        <Route element={<MainLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>  
      </Route>

      <Route element={<RequireAuth />} errorElement={<NotFoundPage />}>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route element={<HomePage />}>
            <Route path='thread/create' element={<CreateThread />} />
            <Route path='thread/:threadId' element={<DetailThreadPage />} />
          </Route>
          <Route path='leaderboards' element={<LeaderboardPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='logout' element={<Logout />} />
        </Route>
      </Route>
    </>
  )
)

function RequireAuth() {
  const token = agent.getToken()
  if(!token) return <Navigate to='/auth/login' />

  return <Outlet />
}

function RequireNoAuth() {
  const token = agent.getToken()

  if(token) return <Navigate to='/' />

  return <Outlet />
}

function Logout() {
  const dispatch = useDispatch()
  const token = agent.getToken()

  useEffect(() => {
    if (token) {
      dispatch(logoutUser())
    }
  }, [dispatch, token])

  return token ? <Navigate to='/auth/login' /> : <Outlet />
}

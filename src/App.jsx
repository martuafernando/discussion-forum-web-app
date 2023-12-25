import './App.css'
import LoginPage from '@pages/login-page/LoginPage'
import { RouterProvider } from 'react-router-dom'
import { router } from '@utils/router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { asyncGetProfile } from './redux/states/user/action'
import { useSelector } from 'react-redux'
import NotFoundPage from './pages/not-found-page/NotFoundPage'
import LoadingPage from './pages/loading-page/LoadingPage'

export default function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(store => store.preload)
  useEffect(() => {
    dispatch(asyncGetProfile())
  }, [dispatch])

  return (
    <>
      { !isLoading
      ? (
        <RouterProvider
          router={router}
          fallbackElement={<NotFoundPage />}
        />
      )
      : (
        <LoadingPage />
      )
    }
    </>
  );
}

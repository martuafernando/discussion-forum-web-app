import './App.css'
import Header from '@components/Header/Header'
import LoginPage from '@pages/LoginPage/LoginPage'
import { RouterProvider } from 'react-router-dom'
import { router } from '@utils/router'

export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<LoginPage />}
    />
  );
}

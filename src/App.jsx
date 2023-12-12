import './App.css'
import LoginPage from '@pages/login-page/LoginPage'
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

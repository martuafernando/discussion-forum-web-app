import { createBrowserRouter, createRoutesFromElements, Outlet, Route, Navigate } from "react-router-dom";
import LoginPage from "@pages/login-page/LoginPage";
import MainLayout from "@layouts/main-layout/MainLayout";
import NotFoundPage from "@pages/not-found-page/NotFoundPage";
import RegisterPage from '@pages/register-page/RegisterPage';
import HomePage from "@pages/home-page/HomePage";
import { user } from "../redux/selectors";
import { useSelector } from "react-redux";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/auth' element={<MainLayout />} errorElement={<NotFoundPage />}>

        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
          
      </Route>

      <Route element={<RequireAuth />}>
        <Route index element={<HomePage />} />
      </Route>
    </>
  )
);

function RequireAuth() {
  const authUser = useSelector(user);

  if(!authUser) return <Navigate to='/auth/login' />

  return <Outlet />
}
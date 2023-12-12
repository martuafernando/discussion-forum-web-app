import { createBrowserRouter, createRoutesFromElements, Outlet, Route, Navigate } from "react-router-dom";
import LoginPage from "@pages/LoginPage/LoginPage";
import MainLayout from "@layouts/MainLayout/MainLayout";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import RegisterPage from '@pages/RegisterPage/RegisterPage';
import HomePage from "@pages/HomePage/HomePage";
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
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, Navigate } from "react-router-dom";
import LoginPage from "@pages/login-page/LoginPage";
import MainLayout from "@components/layouts/main-layout/MainLayout";
import NotFoundPage from "@pages/not-found-page/NotFoundPage";
import RegisterPage from '@pages/register-page/RegisterPage';
import HomePage from "@pages/home-page/HomePage";
import { useSelector } from "react-redux";
import CreateThread from "../pages/create-thread/CreateThread";
import DetailThreadPage from "../pages/detail-thread-page/DetailThreadPage";

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
          <Route path='leaderboards' element={<HomePage />} />
          <Route path='profile' element={<HomePage />} />
        </Route>
      </Route>
    </>
  )
);

function RequireAuth() {
  const user = useSelector(store => store.user);
  if(!user.id) return <Navigate to='/auth/login' />

  return <Outlet />
}

function RequireNoAuth() {
  const user = useSelector(store => store.user);

  if(user.id) return <Navigate to='/' />

  return <Outlet />
}
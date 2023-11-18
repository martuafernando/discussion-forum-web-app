import { createBrowserRouter, createRoutesFromElements, Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "@pages/LoginPage/LoginPage";
import MainLayout from "@layouts/MainLayout/MainLayout";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import RegisterPage from '@pages/RegisterPage/RegisterPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />} errorElement={<NotFoundPage />}>

      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />

      {/* <Route element={<RequireAuth />}>
        <Route index element={<HomePage />} />

        <Route path='archive' element={<ArchivesPage />} />
        <Route path='notes/:id' element={<Detail />} />
      </Route> */}
        
    </Route>
  )
);
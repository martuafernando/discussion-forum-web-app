
import {ScrollRestoration, Outlet} from 'react-router-dom';
import Header from '@components/header/Header';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <footer>©️ Fernando Sibarani 2023</footer>
      <ScrollRestoration />
    </>
  );
}

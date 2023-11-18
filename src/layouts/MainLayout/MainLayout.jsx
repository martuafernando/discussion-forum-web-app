import React from "react";
import { ScrollRestoration, Outlet } from "react-router-dom";
import Header from "../../components/Header/header";
import './MainLayout.css'

export default function MainLayout() {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <footer>©️ Fernando Sibarani 2023</footer>
      <ScrollRestoration />
    </>
  );
}
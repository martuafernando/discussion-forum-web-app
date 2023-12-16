import React from "react";
import { ScrollRestoration, Outlet } from "react-router-dom";
import Header from "@components/header/Header";
import './ModalLayout.css'

export default function ModalLayout({ children }) {
  return (
    <div className="modal-layout__container">
      <div className="modal-layout">
        { children }
      </div>
    </div>
  );
}
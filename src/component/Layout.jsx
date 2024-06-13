import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
  
export default function Layout() {
  return (
    <div className="  ">
      <Navbar  />
      <Outlet />
      <Footer />
    </div>
  );
}

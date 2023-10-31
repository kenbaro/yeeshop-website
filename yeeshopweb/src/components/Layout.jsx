import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Layout = (props) => {

  return (
    <>
      <Header 
        headerDto={props.headerDto}
        headerHandler={props.headerHandler}
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../Component/HeaderHome";

const HomeTemplate = () => {
  return (
    <>
      <HeaderHome />
      <div className="content" style={{ minHeight: 650 }}>
        <Outlet />
      </div>
    </>
  );
};

export default HomeTemplate;

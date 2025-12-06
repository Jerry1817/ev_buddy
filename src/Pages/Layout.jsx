// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div style={{ paddingTop: "64px", paddingBottom: "72px" }}>
        <Outlet />
      </div>
    </>
  );
}

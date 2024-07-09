import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "src/features/Home";
import Community from "src/features/Community";
import Announcements from "src/features/Announcements";
import Notifications from "src/features/Notifications";
import Header from "src/features/Header";
import Login from "src/features/Login";

import { useAuth } from "src/utils/authenticationHelper/authProvider";

export default function AppRouter(): ReactElement {
  const { account } = useAuth();
  console.log("account", account);
  return (
    <BrowserRouter>
      {account !== null && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

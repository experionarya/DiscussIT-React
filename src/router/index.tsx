import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "src/features/Home";
import Community from "src/features/Community";
import Announcements from "src/features/Announcements";
import Notifications from "src/features/Notifications";
import Header from "src/features/Header";

export default function AppRouter(): ReactElement {
  return (
    <BrowserRouter>
    <div>
      <Header/>
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="community" element={<Community />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

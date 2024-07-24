import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "src/features/Home";
import Community from "src/features/Community";
import Announcements from "src/features/Announcements";
import Notifications from "src/features/Notifications";
import Header from "src/features/Header";
import Login from "src/features/Login";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import Post from "src/features/Post";
import CreatePost from "src/features/CreatePost";

function PrivatePage(): ReactElement {
  const { account } = useAuth();

  return (
    <>
      {account !== null && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community/category-posts" element={<Community />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/community/category-posts/replies" element={<Post />} />
      </Routes>
    </>
  );
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PrivatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

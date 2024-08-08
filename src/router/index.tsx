import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "src/features/Home";
import Community from "src/features/Community";
import Notifications from "src/features/Notifications";
import Header from "src/features/Header";
import Login from "src/features/Login";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import PostDetails from "src/features/PostDetails";
import CreatePost from "src/features/CreatePost";
import Profile from "src/features/Header/components/Profile";
import TagsDetailPage from "src/features/TagsDetailPage";

function PrivatePage(): ReactElement {
  const { account } = useAuth();

  return (
    <div className="flex w-full flex-col">
      {account !== null && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community/category-posts" element={<Community />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route
          path="/community/category-posts/replies"
          element={<PostDetails />}
        />
        <Route
          path="community/category-posts/edit-posts"
          element={<CreatePost />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tags/tag-threads/:tagName" element={<TagsDetailPage />} />
      </Routes>
    </div>
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

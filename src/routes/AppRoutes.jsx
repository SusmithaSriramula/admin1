import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ReporterList from "../pages/ReporterList";
import ReporterDetail from "../pages/ReporterDetail";
import UserProfile from "../pages/UserProfile";
import UserAccess from "../pages/UserAccess";
import PublishedNews from "../pages/PublishedNews";
import Approver1 from "../pages/Approver1";
import Approver2 from "../pages/Approver2"; // ✅ fixed the name


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="reporters" element={<ReporterList />} />
        <Route path="reporters/:id" element={<ReporterDetail />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="user-access" element={<UserAccess />} />
        <Route path="approver1" element={<Approver1 />} />
        <Route path="approver2" element={<Approver2 />} />
        <Route path="published-news" element={<PublishedNews />} />
      </Route>
    </Routes>
  );
}

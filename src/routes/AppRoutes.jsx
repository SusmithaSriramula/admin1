import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ReporterList from "../pages/ReporterList";
import ReporterDetail from "../pages/ReporterDetail";
import UserManagement from "../pages/UserManagement"; // ✅ Make sure this exists

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="reporters" element={<ReporterList />} />
        <Route path="reporters/:id" element={<ReporterDetail />} />
        <Route path="user-profile" element={<UserManagement />} /> {/* ✅ Added */}
      </Route>
    </Routes>
  );
}


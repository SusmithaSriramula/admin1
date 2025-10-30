import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import DashboardOverview from '../pages/DashboardOverview'
import ReporterList from '../pages/ReporterList'
import ReporterDetail from '../pages/ReporterDetail'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="reporters" element={<ReporterList />} />
        <Route path="reporters/:id" element={<ReporterDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

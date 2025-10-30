import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'  // ✅ Import toast provider

export default function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" /> {/* ✅ Add toast notification container */}
    </>
  )
}

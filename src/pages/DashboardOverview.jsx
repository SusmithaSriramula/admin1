import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardOverview(){
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm text-gray-500">Super Admin • Overview</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/reporters" className="p-4 bg-white rounded shadow hover:shadow-md">
          <div className="text-sm text-gray-500">Reporters</div>
          <div className="mt-2 font-bold text-xl">View reporters</div>
        </Link>
      </div>
    </div>
  )
}

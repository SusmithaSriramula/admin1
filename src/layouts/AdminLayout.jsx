import React, {useState} from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Users, Newspaper, BarChart2, Settings, Menu } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminLayout(){
  const [collapsed, setCollapsed] = useState(false)
  const loc = useLocation()
  const nav = [
    {to: '/', label: 'Dashboard', icon: <Home size={18}/>},
    {to: '/reporters', label: 'Reporters', icon: <Users size={18}/>},
    {to: '/settings', label: 'Settings', icon: <Settings size={18}/>},
  ]

  return (
    <div className="flex h-screen">
      <aside className={`bg-white border-r ${collapsed ? 'w-16' : 'w-64'} transition-all duration-200 flex flex-col`}>
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">A</div>
            {!collapsed && <div className="font-semibold">Admin</div>}
          </div>
          <button onClick={()=>setCollapsed(s=>!s)} className="p-1 text-gray-600"><Menu size={16} /></button>
        </div>

        <nav className="flex-1 p-2">
          {nav.map(n => (
            <Link key={n.to} to={n.to}
              className={`flex items-center gap-3 p-2 rounded hover:bg-gray-50 ${loc.pathname === n.to || loc.pathname.startsWith(n.to) ? 'bg-gray-100' : ''}`}>
              <div className="text-gray-600">{n.icon}</div>
              {!collapsed && <div className="text-sm">{n.label}</div>}
            </Link>
          ))}
        </nav>

        <div className="p-3 text-xs text-gray-500 border-t">
          <div className="truncate">Role: Super Admin</div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.25}}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}

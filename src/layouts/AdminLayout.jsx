import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  Menu,
  User,
  FileCheck,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const loc = useLocation();

  // 🧭 Navigation items
  const nav = [
    { to: "/", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/reporters", label: "Reporters", icon: <Users size={18} /> },
    { to: "/user-access", label: "User Access", icon: <User size={18} /> },
    { to: "/user-profile", label: "User Profile", icon: <FileCheck size={18} /> },
    { to: "/approver1", label: "Approver 1", icon: <ShieldCheck size={18} /> },
    { to: "/approver2", label: "Approver 2", icon: <ShieldCheck size={18} /> },
    { to: "/published-news", label: "Published News", icon: <Newspaper size={18} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r shadow-sm ${
          collapsed ? "w-16" : "w-64"
        } transition-all duration-200 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-indigo-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">
              A
            </div>
            {!collapsed && (
              <div className="font-semibold text-indigo-700">Admin Panel</div>
            )}
          </div>
          <button
            onClick={() => setCollapsed((s) => !s)}
            className="p-1 text-gray-600 hover:text-indigo-600"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {nav.map((n) => {
            const active =
              loc.pathname === n.to || loc.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 p-2 rounded-md transition-all ${
                  active
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={active ? "text-indigo-600" : "text-gray-500"}>
                  {n.icon}
                </div>
                {!collapsed && <div className="text-sm">{n.label}</div>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 text-xs text-gray-500 border-t bg-gray-50">
          <div className="truncate">Role: Super Admin</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

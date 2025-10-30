import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserPlus, Settings } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "View Reporters",
      description: "Manage, view and approve reporters' activity.",
      icon: <Users className="text-indigo-600" size={28} />,
      path: "/reporters",
    },
    {
      title: "User Profile",
      description: "Create or edit user accounts, assign roles and approvers.",
      icon: <UserPlus className="text-green-600" size={28} />,
      path: "/user-profile",
    },
    {
      title: "Settings",
      description: "Manage system configurations and permissions.",
      icon: <Settings className="text-gray-600" size={28} />,
      path: "/settings",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Welcome to Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              {card.icon}
            </div>
            <h2 className="text-lg font-semibold mb-1 text-gray-800">
              {card.title}
            </h2>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

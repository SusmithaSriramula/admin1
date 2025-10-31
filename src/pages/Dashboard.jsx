import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserPlus, Settings, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("admin_users");
    return saved ? JSON.parse(saved) : [];
  });

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("admin_users", JSON.stringify(users));
  }, [users]);

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User deleted successfully");
  };

  const handleUpdate = () => {
    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
    toast.success("User updated successfully");
  };

  const cards = [
    {
      title: "View Reporters",
      description: "view reporters activity",
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

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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

      {/* User List */}
      <div className="bg-white border rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-3">User Accounts</h2>

        {users.length === 0 ? (
          <p className="text-gray-500 text-sm">No users available.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="text-center">
                  <td className="border p-2">{u.username}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.role}</td>
                  <td className="border p-2">{u.status}</td>
                  <td className="border p-2 flex justify-center gap-3">
                    <button
                      onClick={() => setEditUser(u)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-3">Edit User</h2>
            <input
              type="text"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
              className="border p-2 rounded w-full mb-3"
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              className="border p-2 rounded w-full mb-3"
            />
            <select
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
              className="border p-2 rounded w-full mb-3"
            >
              <option value="Reporter">Reporter</option>
              <option value="Approver">Approver</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

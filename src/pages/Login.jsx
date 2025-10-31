import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Approver1");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = { name: email.split("@")[0], email, role };
    localStorage.setItem("user", JSON.stringify(user));

    if (role === "Approver1") navigate("/approver1");
    else if (role === "Approver2") navigate("/approver2");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Approver1">Approver 1</option>
          <option value="Approver2">Approver 2</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

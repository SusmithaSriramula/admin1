import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UserAccess() {
  const [userAccessList, setUserAccessList] = useState(() => {
    const saved = localStorage.getItem("user_access");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    access_id: "",
    user_id: "",
    password: "",
    role: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("user_access", JSON.stringify(userAccessList));
  }, [userAccessList]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.access_id || !formData.user_id || !formData.password || !formData.role) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (editIndex !== null) {
      const updatedList = [...userAccessList];
      updatedList[editIndex] = formData;
      setUserAccessList(updatedList);
      toast.success("Access details updated!");
      setEditIndex(null);
    } else {
      setUserAccessList([...userAccessList, formData]);
      toast.success("Access record created!");
    }

    setFormData({ access_id: "", user_id: "", password: "", role: "" });
  };

  const handleEdit = (index) => {
    setFormData(userAccessList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = userAccessList.filter((_, i) => i !== index);
    setUserAccessList(updated);
    toast.success("Access record deleted!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Access</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <input
          type="text"
          name="access_id"
          placeholder="Access ID"
          value={formData.access_id}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="user_id"
          placeholder="User ID (Link to Profile)"
          value={formData.user_id}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Reporter">Reporter</option>
          <option value="Approver 1">Approver 1</option>
          <option value="Approver 2">Approver 2</option>
        </select>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 col-span-2"
        >
          {editIndex !== null ? "Update Access" : "Create Access"}
        </button>
      </form>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Access Records</h3>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Access ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userAccessList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 p-3">
                  No records found
                </td>
              </tr>
            ) : (
              userAccessList.map((u, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{u.access_id}</td>
                  <td className="border p-2">{u.user_id}</td>
                  <td className="border p-2">{u.role}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(i)}
                      className="text-blue-600 hover:underline mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-600 hover:underline mx-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

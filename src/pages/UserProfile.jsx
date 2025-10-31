import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UserProfile() {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem("user_profiles");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    user_id: "",
    full_name: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
    current_address: "",
    permanent_address: "",
    government_id: "",
    id_type: "",
    profile_pic: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("user_profiles", JSON.stringify(profiles));
  }, [profiles]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setFormData({ ...formData, [name]: event.target.result });
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.user_id || !formData.full_name || !formData.email) {
      toast.error("Please fill mandatory fields (User ID, Name, Email)");
      return;
    }

    if (editIndex !== null) {
      const updated = [...profiles];
      updated[editIndex] = formData;
      setProfiles(updated);
      toast.success("Profile updated successfully!");
      setEditIndex(null);
    } else {
      setProfiles([...profiles, formData]);
      toast.success("Profile created successfully!");
    }

    setFormData({
      user_id: "",
      full_name: "",
      age: "",
      gender: "",
      email: "",
      mobile: "",
      current_address: "",
      permanent_address: "",
      government_id: "",
      id_type: "",
      profile_pic: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(profiles[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = profiles.filter((_, i) => i !== index);
    setProfiles(updated);
    toast.success("Profile deleted");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="current_address"
          placeholder="Current Address"
          value={formData.current_address}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="permanent_address"
          placeholder="Permanent Address"
          value={formData.permanent_address}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <select
          name="id_type"
          value={formData.id_type}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Government ID Type</option>
          <option>Adhar</option>
          <option>PAN</option>
          <option>Voter ID</option>
          <option>Driving License</option>
        </select>
        <input
          type="text"
          name="government_id"
          placeholder="Government ID Number"
          value={formData.government_id}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          name="profile_pic"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-2"
        >
          {editIndex !== null ? "Update Profile" : "Create Profile"}
        </button>
      </form>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">User Profiles</h3>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-3">
                  No profiles found
                </td>
              </tr>
            ) : (
              profiles.map((p, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{p.user_id}</td>
                  <td className="border p-2">{p.full_name}</td>
                  <td className="border p-2">{p.email}</td>
                  <td className="border p-2">{p.mobile}</td>
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

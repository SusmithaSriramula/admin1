import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    mobile: "",
    employeeId: "",
    employeeType: "Full-Time",
    permanentAddress: "",
    currentAddress: "",
    govtIdType: "",
    govtIdFile: null,
    role: "Reporter",
    approvers: [],
    status: "Draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, govtIdFile: file }));
  };

  const handleApproverChange = (index, value) => {
    const updated = [...form.approvers];
    updated[index] = value;
    setForm((prev) => ({ ...prev, approvers: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (
      !form.username ||
      !form.password ||
      !form.email ||
      !form.mobile ||
      !form.employeeId ||
      !form.govtIdType ||
      !form.govtIdFile
    ) {
      toast.error("Please fill all mandatory fields including Govt ID upload");
      return;
    }

    if (form.role === "Reporter" && form.approvers.filter(Boolean).length < 2) {
      toast.error("Please assign two approvers for reporter");
      setForm((prev) => ({ ...prev, status: "Draft" }));
      return;
    }

    // If all good
    toast.success("User profile created successfully!");
    console.log("User Data:", form);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
        User Profile &gt; Create New User
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium mb-1">Username *</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password *</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mobile *</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Employee ID *
          </label>
          <input
            type="text"
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Employee Type *
          </label>
          <select
            name="employeeType"
            value={form.employeeType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option>Full-Time</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Permanent Address *
          </label>
          <textarea
            name="permanentAddress"
            value={form.permanentAddress}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Current Address *
          </label>
          <textarea
            name="currentAddress"
            value={form.currentAddress}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Govt ID Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Govt ID Type *</label>
          <select
            name="govtIdType"
            value={form.govtIdType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select ID Type</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN">PAN</option>
            <option value="Driving License">Driving License</option>
            <option value="Voter ID">Voter ID</option>
          </select>
        </div>

        {form.govtIdType && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload {form.govtIdType} *
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
            />
            {form.govtIdFile && (
              <p className="text-sm text-green-600 mt-1">
                Uploaded: {form.govtIdFile.name}
              </p>
            )}
          </div>
        )}

        {/* Role & Approvers */}
        <div>
          <label className="block text-sm font-medium mb-1">Role *</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Admin">Admin</option>
            <option value="Approver">Approver</option>
            <option value="Reporter">Reporter</option>
          </select>
        </div>

        {form.role === "Reporter" && (
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Approver 1 *
              </label>
              <input
                type="text"
                value={form.approvers[0] || ""}
                onChange={(e) => handleApproverChange(0, e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Approver Name or ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Approver 2 *
              </label>
              <input
                type="text"
                value={form.approvers[1] || ""}
                onChange={(e) => handleApproverChange(1, e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Approver Name or ID"
              />
            </div>
          </div>
        )}

        <div className="col-span-2 flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => {
              setForm((prev) => ({ ...prev, status: "Draft" }));
              toast.success("Saved as draft");
            }}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

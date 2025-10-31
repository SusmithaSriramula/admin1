import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Approver1() {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState({ search: "", status: "All" });

  // Load or initialize data
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("approver1_data")) || [
      {
        id: "N101",
        title: "City Flood Updates",
        reporter: "Ravi Kumar",
        submissionDate: "2025-10-30",
        media: "https://via.placeholder.com/300",
        description: "Heavy rains caused flooding in Hyderabad.",
        status: "Pending",
        approver1Notes: "",
        approvedDate: "",
      },
      {
        id: "N102",
        title: "Election Results",
        reporter: "Priya Sharma",
        submissionDate: "2025-10-29",
        media: "https://via.placeholder.com/300",
        description: "Local elections concluded successfully.",
        status: "Approved by Approver 1",
        approver1Notes: "",
        approvedDate: "",
      },
    ];
    setSubmissions(stored);
  }, []);

  // Save to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("approver1_data", JSON.stringify(submissions));
  }, [submissions]);

  // Handle actions
  const handleAction = (id, action, notes = "") => {
    const updated = submissions.map((item) =>
      item.id === id
        ? {
            ...item,
            status:
              action === "approve"
                ? "Approved by Approver 1"
                : action === "notes"
                ? "Approved with Notes"
                : "Rejected",
            approver1Notes: notes,
            approvedDate:
              action === "approve" || action === "notes"
                ? new Date().toLocaleString()
                : "",
          }
        : item
    );

    setSubmissions(updated);
    toast.success(`Submission ${action.toUpperCase()} successfully`);
    setSelected(null);
  };

  // Filtered data
  const filteredData = submissions.filter((item) => {
    const matchSearch =
      item.reporter.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.id.toLowerCase().includes(filter.search.toLowerCase());
    const matchStatus =
      filter.status === "All" || item.status === filter.status;
    return matchSearch && matchStatus;
  });

  // UI
  return (
    <div className="p-4">
      {!selected ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Approver 1 Dashboard</h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by ID or Reporter"
              className="border rounded p-2 w-64"
              value={filter.search}
              onChange={(e) =>
                setFilter({ ...filter, search: e.target.value })
              }
            />
            <select
              className="border rounded p-2"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved by Approver 1</option>
              <option>Approved with Notes</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* Grid */}
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Reporter</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Submission Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50">
                  <td className="border p-2">{n.id}</td>
                  <td className="border p-2">{n.reporter}</td>
                  <td className="border p-2">{n.title}</td>
                  <td className="border p-2">{n.submissionDate}</td>
                  <td className="border p-2">{n.status}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => setSelected(n)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        // Detail View
        <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
          <button
            className="text-sm text-gray-500 mb-4 underline"
            onClick={() => setSelected(null)}
          >
            ← Back to List
          </button>

          <h3 className="text-lg font-semibold mb-3">
            {selected.title} ({selected.id})
          </h3>

          <img
            src={selected.media}
            alt="news"
            className="w-full h-60 object-cover rounded mb-4"
          />

          <p className="mb-2 text-gray-700 text-sm">
            <strong>Reporter:</strong> {selected.reporter}
          </p>
          <p className="mb-2 text-gray-700 text-sm">
            <strong>Submission Date:</strong> {selected.submissionDate}
          </p>
          <p className="mb-2 text-gray-700 text-sm">
            <strong>Status:</strong> {selected.status}
          </p>

          <p className="text-gray-800 mt-3 mb-2 text-sm">
            <strong>Description:</strong> {selected.description}
          </p>

          <textarea
            placeholder="Enter notes for approval..."
            className="w-full border rounded p-3 mb-3 text-sm h-48" // Increased height
            onChange={(e) =>
              setSelected({ ...selected, approver1Notes: e.target.value })
            }
            value={selected.approver1Notes}
          />

          <div className="flex flex-wrap gap-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded text-sm"
              onClick={() =>
                handleAction(selected.id, "approve", selected.approver1Notes)
              }
            >
              Approve
            </button>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              onClick={() =>
                handleAction(selected.id, "notes", selected.approver1Notes)
              }
            >
              Approve with Notes
            </button>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded text-sm"
              onClick={() =>
                handleAction(selected.id, "reject", selected.approver1Notes)
              }
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

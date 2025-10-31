import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Approver2() {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState({ search: "", status: "All" });

  // Load approved data from Approver 1
  useEffect(() => {
    const dataFromApprover1 = JSON.parse(localStorage.getItem("approver1_data")) || [];
    const approvedForA2 = dataFromApprover1.filter(
      (item) =>
        item.status === "Approved by Approver 1" ||
        item.status === "Approved with Notes"
    );

    const existingApprover2 = JSON.parse(localStorage.getItem("approver2_data")) || [];
    const merged = [...approvedForA2, ...existingApprover2].reduce((acc, curr) => {
      if (!acc.find((i) => i.id === curr.id)) acc.push(curr);
      return acc;
    }, []);

    setSubmissions(merged);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("approver2_data", JSON.stringify(submissions));
  }, [submissions]);

  // Handle action (approve / notes / return)
  const handleAction = (id, action, notes = "") => {
  const updated = submissions.map((item) =>
    item.id === id
      ? {
          ...item,
          status:
            action === "approve"
              ? "Approved for Publication"
              : action === "notes"
              ? "Approved with Final Notes"
              : "Returned to Approver 1",
          approver2Notes: notes,
          finalApprovalDate:
            action === "approve" || action === "notes"
              ? new Date().toLocaleString()
              : "",
        }
      : item
  );

  setSubmissions(updated);

  // ✅ Move this inside the function, after updating submissions
  if (action === "approve") {
    const final = updated.find((i) => i.id === id);
    const published = JSON.parse(localStorage.getItem("published_news")) || [];
    localStorage.setItem("published_news", JSON.stringify([...published, final]));
  }

  toast.success(`Submission ${action.toUpperCase()} successfully`);
  setSelected(null);
};


  // Filtered list
  const filteredData = submissions.filter((item) => {
    const matchSearch =
      item.reporter.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.id.toLowerCase().includes(filter.search.toLowerCase());
    const matchStatus =
      filter.status === "All" || item.status === filter.status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4">
      {!selected ? (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Approver 2 - Dashboard
          </h2>

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
              <option>Approved by Approver 1</option>
              <option>Approved with Notes</option>
              <option>Approved for Publication</option>
              <option>Approved with Final Notes</option>
              <option>Returned to Approver 1</option>
            </select>
          </div>

          {/* Grid */}
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Reporter</th>
                <th className="border p-2">Title</th>
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

          <div className="mb-2 text-gray-700 text-sm">
            <strong>Reporter:</strong> {selected.reporter}
          </div>
          <div className="mb-2 text-gray-700 text-sm">
            <strong>Current Status:</strong> {selected.status}
          </div>

          <div className="mb-2 text-gray-700 text-sm">
            <strong>Approver 1 Notes:</strong>{" "}
            {selected.approver1Notes || "None"}
          </div>

          <div className="mb-2 text-gray-700 text-sm">
            <strong>Final Description:</strong>
          </div>
          <textarea
            className="border p-2 w-full rounded mb-3 text-sm"
            value={selected.description}
            onChange={(e) =>
              setSelected({ ...selected, description: e.target.value })
            }
          />

          <div className="mb-2 text-gray-700 text-sm">
            <strong>Final Notes (optional):</strong>
          </div>
          <textarea
            className="border p-2 w-full rounded mb-3 text-sm"
            value={selected.approver2Notes || ""}
            onChange={(e) =>
              setSelected({ ...selected, approver2Notes: e.target.value })
            }
            placeholder="Write final approval notes..."
          />

          <div className="flex flex-wrap gap-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded text-sm"
              onClick={() =>
                handleAction(selected.id, "approve", selected.approver2Notes)
              }
            >
              Approve for Publication
            </button>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              onClick={() =>
                handleAction(selected.id, "notes", selected.approver2Notes)
              }
            >
              Approve with Notes
            </button>

            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded text-sm"
              onClick={() =>
                handleAction(selected.id, "return", selected.approver2Notes)
              }
            >
              Return to Approver 1
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

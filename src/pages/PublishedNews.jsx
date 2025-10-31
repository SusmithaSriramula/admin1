import React, { useEffect, useState } from "react";

export default function PublishedNews() {
  const [published, setPublished] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const publishedData = JSON.parse(localStorage.getItem("published_news")) || [];
    setPublished(publishedData);
  }, []);

  const filtered = published.filter(
    (p) =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.id.toLowerCase().includes(filter.toLowerCase()) ||
      p.reporter.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Published News Overview</h2>

      <input
        type="text"
        placeholder="Search by title, ID, or reporter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded mb-4 w-72"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No published news found.</p>
      ) : (
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Reporter</th>
              <th className="border p-2">Approver 1</th>
              <th className="border p-2">Approver 2</th>
              <th className="border p-2">Published Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => (
              <tr key={n.id} className="hover:bg-gray-50">
                <td className="border p-2">{n.id}</td>
                <td className="border p-2">{n.title}</td>
                <td className="border p-2">{n.reporter}</td>
                <td className="border p-2">{n.approver1 || "Approver 1"}</td>
                <td className="border p-2">{n.approver2 || "Approver 2"}</td>
                <td className="border p-2">{n.finalApprovalDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

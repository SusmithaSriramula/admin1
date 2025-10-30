import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchReporters } from '../services/mockApi'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import { motion } from 'framer-motion'

export default function ReporterList(){
  const [reporters, setReporters] = useState([])
  const [page, setPage] = useState(1)
  const [perPage] = useState(8)
  const [total, setTotal] = useState(0)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{ load(page, q) }, [page, q])

  async function load(page, q){
    setLoading(true)
    const res = await fetchReporters({page, perPage, q})
    setReporters(res.data)
    setTotal(res.total)
    setLoading(false)
  }

  function handleRow(r){
    navigate(`/reporters/${r.id}`)
  }

  const totalPages = Math.max(1, Math.ceil(total / perPage))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Reporters</h1>
        <div className="text-sm text-gray-500">Manage all reporters</div>
      </div>

      <div className="mb-4">
        <SearchBar value={q} onChange={setQ} />
      </div>

      {loading ? (
        <div className="p-8 bg-white rounded shadow text-center">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {reporters.map(r => (
              <motion.div key={r.id} className="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer"
                whileHover={{ y: -4 }}
                onClick={()=>handleRow(r)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-gray-500">ID: {r.id}</div>
                  </div>
                  <div className="text-sm text-right">
                    <div>Total: {r.totalSubmissions}</div>
                    <div className="text-gray-500 text-xs">Joined: {r.joinDate}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-600">
                  <div>Approved A1: {r.approvedByApprover1}</div>
                  <div>Approved A2: {r.approvedByApprover2}</div>
                  <div>Pending: {r.pending}</div>
                  <div>Rejected: {r.rejected}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded shadow p-2">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Reporter ID</th>
                  <th className="p-3 text-left">Reporter Name</th>
                  <th className="p-3 text-left">Total Submissions</th>
                  <th className="p-3 text-left">Approved by Approver 1</th>
                  <th className="p-3 text-left">Approved by Approver 2</th>
                  <th className="p-3 text-left">Pending / Rejected</th>
                </tr>
              </thead>
              <tbody>
                {reporters.map(r => (
                  <tr key={r.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={()=>handleRow(r)}>
                    <td className="p-3">{r.id}</td>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.totalSubmissions}</td>
                    <td className="p-3">{r.approvedByApprover1}</td>
                    <td className="p-3">{r.approvedByApprover2}</td>
                    <td className="p-3">{r.pending} / {r.rejected}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination current={page} totalPages={totalPages} onPage={setPage} />
        </>
      )}
    </div>
  )
}

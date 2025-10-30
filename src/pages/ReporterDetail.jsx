import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchReporterById } from '../services/mockApi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function ExpandableRow({s}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <tr className="border-t hover:bg-gray-50 cursor-pointer" onClick={()=>setOpen(o=>!o)}>
        <td className="p-2">{s.newsId}</td>
        <td className="p-2">{s.title}</td>
        <td className="p-2">{s.createdDate}</td>
        <td className="p-2">{s.status}</td>
        <td className="p-2">{s.approvedByApprover1 ? 'Yes' : 'No'}</td>
        <td className="p-2">{s.approvedByApprover2 ? 'Yes' : 'No'}</td>
        <td className="p-2">{s.publishedDate || '-'}</td>
      </tr>
      {open && (
        <tr className="bg-gray-50">
          <td colSpan={7} className="p-4 text-sm">
            <div className="mb-2"><strong>Comments:</strong></div>
            {s.comments.length ? s.comments.map((c,i)=>(<div key={i} className="mb-1 text-xs">- {c}</div>)) : <div className="text-xs text-gray-500">No comments</div>}
            <div className="mt-2"><strong>AI Metadata:</strong></div>
            <div className="text-xs">Model: {s.aiMeta.model}</div>
            <div className="text-xs">Prompt: {s.aiMeta.prompt.slice(0,200)}{s.aiMeta.prompt.length>200 ? '...' : ''}</div>
          </td>
        </tr>
      )}
    </>
  )
}

function ApprovalTimeline({approvals}) {
  return (
    <div className="flex flex-col gap-3">
      {approvals.map((a,i)=>(
        <div key={i} className="p-2 border rounded">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">{a.by} • {a.role}</div>
            <div className={`text-sm ${a.action==='approved' ? 'text-green-600' : 'text-red-600'}`}>{a.action}</div>
          </div>
          <div className="text-xs text-gray-500">{a.date}</div>
          {a.note && <div className="mt-1 text-sm">Note: {a.note}</div>}
        </div>
      ))}
    </div>
  )
}

export default function ReporterDetail(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ load() }, [id])

  async function load(){
    setLoading(true)
    const res = await fetchReporterById(id)
    setData(res)
    setLoading(false)
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (!data) return <div className="text-center mt-10">Not found</div>

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-2"><Link to="/">Home</Link> / <Link to="/reporters">Reporters</Link> / <span className="font-semibold">{data.profile.name}</span></nav>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{data.profile.name}</h1>
          <div className="text-sm text-gray-500">ID: {data.profile.id} • Joined: {data.profile.joinDate}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <div className="bg-white rounded shadow-sm p-4">
            <h2 className="font-semibold mb-2">Submission History</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">News ID</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Created Date</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">A1</th>
                  <th className="p-2 text-left">A2</th>
                  <th className="p-2 text-left">Published Date</th>
                </tr>
              </thead>
              <tbody>
                {data.submissions.map(s => <ExpandableRow key={s.newsId} s={s} />)}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded shadow-sm p-4 mt-4">
            <h2 className="font-semibold mb-2">Comments & Approvals</h2>
            <ApprovalTimeline approvals={data.approvalTimeline} />
          </div>
        </div>

        <div>
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <h3 className="font-semibold mb-2">Media Summary</h3>
            <div className="grid grid-cols-3 gap-2">
              {data.media.map((m,i)=>(
                <div key={i} className="border rounded p-2 text-center text-xs">
                  <div className="h-20 flex items-center justify-center bg-gray-50">{m.type}</div>
                  <div className="mt-1 truncate">{m.name}</div>
                  <div className="text-gray-500 text-xs">{m.sizeKb} KB</div>
                  <div className={`text-xs ${m.compressed ? 'text-green-600' : 'text-yellow-600'}`}>{m.compressed ? 'Compressed' : 'Original'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

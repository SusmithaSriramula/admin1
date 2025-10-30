import React from 'react'

export default function Pagination({current, totalPages, onPage}) {
  if (totalPages <= 1) return null
  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <button onClick={()=>onPage(Math.max(1, current-1))} className="px-3 py-1 border rounded">Prev</button>
      {Array.from({length: totalPages}, (_,i)=>i+1).map(p => (
        <button key={p} onClick={()=>onPage(p)}
          className={`px-3 py-1 rounded ${p===current ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>{p}</button>
      ))}
      <button onClick={()=>onPage(Math.min(totalPages, current+1))} className="px-3 py-1 border rounded">Next</button>
    </div>
  )
}

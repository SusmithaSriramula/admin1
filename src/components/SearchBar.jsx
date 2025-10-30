import React from 'react'

export default function SearchBar({value, onChange, placeholder = 'Search by ID, Name, Email'}) {
  return (
    <div className="flex gap-2 items-center">
      <select className="border px-3 py-2 rounded" name="filter" defaultValue="name">
        <option value="name">Name</option>
        <option value="id">Reporter ID</option>
        <option value="email">Email</option>
      </select>
      <input
        className="flex-1 border px-3 py-2 rounded"
        placeholder={placeholder}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Search</button>
    </div>
  )
}

const reporters = Array.from({length: 42}, (_,i) => {
  const id = `R-${String(i+1).padStart(3,'0')}`
  const totalSubmissions = Math.floor(Math.random()*50)
  const approvedByApprover1 = Math.floor(totalSubmissions * (0.4 + Math.random()*0.4))
  const approvedByApprover2 = Math.floor(approvedByApprover1 * (0.6 + Math.random()*0.3))
  const pending = Math.floor(totalSubmissions * Math.random()*0.2)
  const rejected = Math.max(0, totalSubmissions - approvedByApprover1 - pending)
  return {
    id,
    name: `Reporter ${i+1}`,
    email: `reporter${i+1}@news.co`,
    totalSubmissions,
    approvedByApprover1,
    approvedByApprover2,
    pending,
    rejected,
    joinDate: `2024-${String((i%12)+1).padStart(2,'0')}-${String((i%28)+1).padStart(2,'0')}`
  }
})

export function fetchReporters({page=1, perPage=8, q=''} = {}) {
  let data = reporters
  if (q) {
    const lower = q.toLowerCase()
    data = data.filter(r => r.name.toLowerCase().includes(lower) || r.email.toLowerCase().includes(lower) || r.id.toLowerCase().includes(lower))
  }
  const total = data.length
  const start = (page-1)*perPage
  const pageData = data.slice(start, start+perPage)
  return new Promise(resolve => setTimeout(()=>resolve({data: pageData, total}), 300))
}

export function fetchReporterById(id) {
  const base = reporters.find(r => r.id === id) || reporters[0]
  const submissions = Array.from({length: Math.min(12, base.totalSubmissions || 6)}, (_,i) => {
    const statusSet = ['draft','under review','published','rejected']
    const status = statusSet[i % statusSet.length]
    return {
      newsId: `${base.id}-N-${i+1}`,
      title: `Story ${i+1} by ${base.name}`,
      createdDate: `2025-${String((i%9)+1).padStart(2,'0')}-${String((i*3)%28+1).padStart(2,'0')}`,
      status,
      approvedByApprover1: i%3 === 0,
      approvedByApprover2: i%4 === 0,
      publishedDate: (status === 'published') ? `2025-${String((i%9)+1).padStart(2,'0')}-15` : null,
      comments: i%3 === 0 ? ['Please update headline', 'Add source for claim'] : [],
      aiMeta: {model: 'gpt-news-0', prompt: 'Check factuality & tone'}
    }
  })

  const approvalTimeline = [
    {by: 'Approver One', role: 'Approver 1', action: 'approved', date: '2025-05-02', note: 'Looks good'},
    {by: 'Approver Two', role: 'Approver 2', action: 'rejected', date: '2025-05-03', note: 'Need source for claim'}
  ]

  const media = [
    {type: 'image', name: 'cover.jpg', sizeKb: 512, compressed: true},
    {type: 'video', name: 'interview.mp4', sizeKb: 20480, compressed: false},
    {type: 'audio', name: 'notes.mp3', sizeKb: 1024, compressed: true},
  ]

  const activityChart = [
    {label: 'Jan', count: Math.floor(Math.random()*10)},
    {label: 'Feb', count: Math.floor(Math.random()*10)},
    {label: 'Mar', count: Math.floor(Math.random()*10)},
    {label: 'Apr', count: Math.floor(Math.random()*10)},
  ]

  return new Promise(resolve => setTimeout(()=>resolve({
    profile: base,
    submissions,
    approvalTimeline,
    media,
    activityChart
  }), 300))
}

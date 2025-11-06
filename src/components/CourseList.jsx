import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CourseList({ onSelect }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/courses`)
        const data = await res.json()
        setCourses(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-white/80">Loading courses...</div>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c)}
          className="group rounded-xl bg-white/5 border border-white/10 p-5 text-left hover:bg-white/10 transition"
        >
          <div className="h-32 rounded-lg bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 mb-4" />
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold group-hover:text-emerald-300">{c.title}</h3>
            <span className="text-xs text-white/60">{c.level}</span>
          </div>
          <p className="text-white/70 mt-2 text-sm line-clamp-3">{c.description}</p>
          <div className="mt-3 text-xs text-white/60">{c.category}</div>
        </button>
      ))}
    </div>
  )
}

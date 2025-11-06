import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function EnrollForm({ course }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${API}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, course_id: course.id }),
      })
      const data = await res.json()
      setStatus(data.status)
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-6">
      <h3 className="text-white font-semibold mb-3">Enroll</h3>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input
          className="bg-white/10 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="bg-white/10 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Join this course
        </button>
      </form>
      {status && (
        <div className="mt-3 text-sm text-white/80">
          {status === 'loading' && 'Submitting...'}
          {status === 'enrolled' && 'Enrolled successfully!'}
          {status === 'already_enrolled' && 'You are already enrolled.'}
          {status === 'error' && 'Something went wrong.'}
        </div>
      )}
    </div>
  )
}

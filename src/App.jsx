import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import CourseList from './components/CourseList'
import LessonViewer from './components/LessonViewer'
import EnrollForm from './components/EnrollForm'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [screen, setScreen] = useState('home')
  const [selected, setSelected] = useState(null)

  const goCourse = (c) => {
    setSelected(c)
    setScreen('learn')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black">
      <Navbar onNavigate={setScreen} active={screen} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {screen === 'home' && (
          <section>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white">Cybersecurity Learning Hub</h1>
              <p className="text-white/70 mt-2">Hands-on lessons, quick checks, and progress tracking.</p>
            </div>
            <CourseList onSelect={goCourse} />
          </section>
        )}

        {screen === 'courses' && (
          <section>
            <h2 className="text-white text-2xl font-semibold mb-6">All Courses</h2>
            <CourseList onSelect={goCourse} />
          </section>
        )}

        {screen === 'learn' && selected && (
          <div className="grid lg:grid-cols-[1fr_360px] gap-6">
            <LessonViewer course={selected} onBack={() => setScreen('courses')} />
            <EnrollForm course={selected} />
          </div>
        )}

        {screen === 'profile' && (
          <ProfileView />
        )}
      </main>
    </div>
  )}

function ProfileView() {
  const [progress, setProgress] = useState(null)
  useEffect(() => {
    const load = async () => {
      try {
        const email = 'student@example.com'
        const res = await fetch(`${API}/progress?email=${encodeURIComponent(email)}&course_id=any`)
        const data = await res.json()
        setProgress(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-6">
      <h3 className="text-white font-semibold">Your Progress</h3>
      {!progress && <div className="text-white/70 mt-2">Loading...</div>}
      {progress && (
        <div className="text-white/90 mt-2">
          Quizzes attempted: {progress.quizzes_attempted} — Correct: {progress.correct}
        </div>
      )}
    </div>
  )
}

export default App

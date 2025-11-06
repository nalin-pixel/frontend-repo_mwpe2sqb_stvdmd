import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function LessonViewer({ course, onBack }) {
  const [lessons, setLessons] = useState([])
  const [active, setActive] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/courses/${course.id}/lessons`)
      const data = await res.json()
      setLessons(data.items || [])
      if ((data.items || []).length) setActive(data.items[0])
    }
    load()
  }, [course.id])

  useEffect(() => {
    const loadQuiz = async () => {
      if (!active) return
      const res = await fetch(`${API}/lessons/${active.id}/quiz`)
      const data = await res.json()
      setQuiz(data.quiz)
      setAnswer(null)
      setResult(null)
    }
    loadQuiz()
  }, [active])

  const submit = async () => {
    if (!quiz) return
    const email = 'student@example.com' // demo identity
    const res = await fetch(`${API}/submit-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, quiz_id: quiz.id, selected_option: answer }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6">
      <aside className="rounded-xl bg-white/5 border border-white/10 p-4 h-fit">
        <button onClick={onBack} className="mb-4 text-sm text-emerald-300 hover:underline">← Back to courses</button>
        <h3 className="text-white font-semibold mb-3">Lessons</h3>
        <div className="space-y-2">
          {lessons.map(l => (
            <button
              key={l.id}
              onClick={() => setActive(l)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${active?.id === l.id ? 'bg-emerald-500/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
            >
              {l.order}. {l.title}
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-xl bg-white/5 border border-white/10 p-6">
        {active && (
          <>
            <h2 className="text-2xl font-semibold text-white">{active.title}</h2>
            <p className="text-white/80 mt-2">{active.content}</p>

            {quiz && (
              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="text-white font-semibold mb-3">Quick Check</h3>
                <p className="text-white/90">{quiz.question}</p>
                <div className="mt-3 grid gap-2">
                  {quiz.options.map((opt, i) => (
                    <label key={i} className={`flex items-center gap-3 rounded-md border border-white/10 p-3 cursor-pointer ${answer === i ? 'bg-emerald-500/10' : ''}`}>
                      <input
                        type="radio"
                        name="answer"
                        checked={answer === i}
                        onChange={() => setAnswer(i)}
                      />
                      <span className="text-white/90">{opt}</span>
                    </label>
                  ))}
                </div>
                <button
                  disabled={answer === null}
                  onClick={submit}
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-500 text-white disabled:opacity-50 hover:bg-emerald-600"
                >
                  Submit Answer
                </button>
                {result && (
                  <div className={`mt-3 text-sm ${result.correct ? 'text-emerald-300' : 'text-red-300'}`}>
                    {result.correct ? 'Correct!' : 'Not quite — try again.'}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

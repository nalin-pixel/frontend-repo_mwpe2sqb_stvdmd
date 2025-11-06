export default function Navbar({ onNavigate, active }) {
  const link = (key, label) => (
    <button
      key={key}
      onClick={() => onNavigate(key)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active === key ? 'bg-white/80 text-gray-900' : 'text-white/90 hover:bg-white/20'
      }`}
    >
      {label}
    </button>
  )

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-gray-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-300 font-bold">C</span>
          <span className="font-semibold">CyberLMS</span>
        </div>
        <nav className="flex items-center gap-2">
          {link('home', 'Home')}
          {link('courses', 'Courses')}
          {link('learn', 'Learn')}
          {link('profile', 'Profile')}
        </nav>
      </div>
    </header>
  )
}

import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/map', label: 'Map & Shelters' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/download', label: 'Download App' },
]

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-white shadow-lg shadow-primary-500/40">
            <span className="text-lg font-semibold">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-slate-50">
              Disaster Management
            </span>
            <span className="text-xs text-slate-400">Real-time response dashboard</span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-400' : 'text-slate-300 hover:text-slate-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-xs text-slate-300 sm:inline">
                Signed in as <span className="font-semibold text-primary-300">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hidden text-sm font-medium text-slate-300 hover:text-slate-50 sm:inline"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-full bg-primary-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/40 hover:bg-primary-400"
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}


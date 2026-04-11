import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.')
      return
    }

    login({
      name: email.split('@')[0] || 'Responder',
      email,
    })
    navigate('/')
  }

  return (
    <section className="mx-auto max-w-md space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">Log in</h1>
        <p className="text-sm text-slate-400">
          Access your disaster operations dashboard and team assignments.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40"
      >
        <div className="space-y-1">
          <label htmlFor="login-email" className="text-xs font-medium text-slate-200">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="login-password" className="text-xs font-medium text-slate-200">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-xs text-rose-400">{error}</p>}

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-600/40 hover:bg-primary-400"
        >
          Log in
        </button>

        <p className="text-center text-[11px] text-slate-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary-300 hover:text-primary-200">
            Create one
          </Link>
        </p>
      </form>
    </section>
  )
}


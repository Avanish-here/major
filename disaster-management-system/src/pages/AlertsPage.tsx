import { useState } from 'react'
import { useData } from '../context/DataContext'
import { AlertCard } from '../components/AlertCard'

export function AlertsPage() {
  const { alerts } = useData()
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      return
    }
    setSubscribed(true)
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">Real-time Alerts</h1>
        <p className="text-sm text-slate-400">
          Live stream of critical alerts from integrated meteorological, geological, and local
          response systems.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-50">Latest alerts</h2>
            <p className="text-[11px] text-slate-500">
              Showing {alerts.length} high-priority alerts
            </p>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-slate-50">Subscribe to alerts</h2>
            <p className="text-xs text-slate-400">
              Get push-style notifications in your inbox when new critical alerts are issued for
              your region.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="alerts-email" className="text-xs font-medium text-slate-300">
                Email address
              </label>
              <input
                id="alerts-email"
                type="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-600/40 hover:bg-primary-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
              disabled={subscribed}
            >
              {subscribed ? 'Subscribed to alerts' : 'Enable alert notifications'}
            </button>
          </form>

          <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300">
            <p className="font-semibold text-slate-100">How notifications work</p>
            <ul className="mt-1 space-y-1 text-[11px] text-slate-400">
              <li>• Critical alerts are sent immediately.</li>
              <li>• High and Severe alerts are summarized every 30 minutes.</li>
              <li>• You can unsubscribe from any notification email.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}


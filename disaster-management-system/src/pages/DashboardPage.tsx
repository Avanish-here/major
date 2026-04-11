import { useData } from '../context/DataContext'
import { DisasterCard } from '../components/DisasterCard'

function StatCard({
  label,
  value,
  sublabel,
  accent,
}: {
  label: string
  value: string
  sublabel: string
  accent: 'emerald' | 'sky' | 'rose'
}) {
  const accentClasses: Record<typeof accent, string> = {
    emerald:
      'border-emerald-500/30 bg-emerald-500/5 text-emerald-300 shadow-emerald-900/40 from-emerald-500/10 to-transparent',
    sky: 'border-sky-500/30 bg-sky-500/5 text-sky-300 shadow-sky-900/40 from-sky-500/10 to-transparent',
    rose: 'border-rose-500/30 bg-rose-500/5 text-rose-300 shadow-rose-900/40 from-rose-500/10 to-transparent',
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 shadow-xl shadow-slate-950/40 ${accentClasses[accent]}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr opacity-60" />
      <div className="relative space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="text-2xl font-semibold text-slate-50">{value}</p>
        <p className="text-xs text-slate-400">{sublabel}</p>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const { disasters } = useData()
  const totalActive = disasters.length
  const totalShelters = disasters.reduce((sum, d) => sum + d.sheltersAvailable, 0)

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">
              Global Disaster Overview
            </h1>
            <p className="text-sm text-slate-400">
              Live situational awareness of active disasters, response capacity, and population
              impact.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200 shadow-sm shadow-emerald-900/40 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live feed updating every few seconds
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Active disasters"
          value={totalActive.toString()}
          sublabel="Tracked across all integrated sources"
          accent="emerald"
        />
        <StatCard
          label="Countries covered"
          value={
            new Set(disasters.map((d) => d.location.split(',').pop()?.trim() ?? d.location)).size.toString()
          }
          sublabel="Unique countries with active monitored events"
          accent="sky"
        />
        <StatCard
          label="Available shelters"
          value={totalShelters.toString()}
          sublabel="With verified capacity and staff on-site"
          accent="rose"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-50">Recent disasters</h2>
            <p className="text-xs text-slate-400">
              Sorted by most recently updated incident
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {disasters.map((disaster) => (
              <DisasterCard key={disaster.id} disaster={disaster} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-50">Capacity overview</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs text-slate-400">
              Response readiness across critical services. Higher fill indicates higher utilization.
            </p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Medical capacity', value: 74, color: 'bg-sky-400' },
                { label: 'Shelter capacity', value: 62, color: 'bg-emerald-400' },
                { label: 'Logistics & supply chain', value: 48, color: 'bg-amber-400' },
                { label: 'Search & rescue teams', value: 81, color: 'bg-rose-400' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


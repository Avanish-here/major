import type { Alert } from '../services/mockData'

const severityStyles: Record<
  Alert['severity'],
  { badge: string; dot: string; ring: string }
> = {
  Critical: {
    badge: 'bg-rose-500/15 text-rose-200',
    dot: 'bg-rose-400',
    ring: 'ring-rose-500/40',
  },
  Severe: {
    badge: 'bg-red-500/15 text-red-200',
    dot: 'bg-red-400',
    ring: 'ring-red-500/40',
  },
  High: {
    badge: 'bg-orange-500/15 text-orange-200',
    dot: 'bg-orange-400',
    ring: 'ring-orange-500/30',
  },
  Moderate: {
    badge: 'bg-yellow-500/10 text-yellow-200',
    dot: 'bg-yellow-400',
    ring: 'ring-yellow-500/20',
  },
  Low: {
    badge: 'bg-emerald-500/10 text-emerald-200',
    dot: 'bg-emerald-400',
    ring: 'ring-emerald-500/20',
  },
}

type Props = {
  alert: Alert
}

export function AlertCard({ alert }: Props) {
  const styles = severityStyles[alert.severity]

  return (
    <article
      className={`relative flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/40 ring-1 ring-inset ${styles.ring}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-50">{alert.title}</h3>
          <p className="mt-1 text-xs text-slate-400">{alert.description}</p>
        </div>
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${styles.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
          {alert.severity}
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>{alert.location}</span>
        <div className="flex items-center gap-3">
          <span>{alert.timeIssued}</span>
          {alert.url && (
            <a
              href={alert.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-800 px-2 py-1 text-[10px] font-semibold text-primary-200 hover:bg-slate-700"
            >
              View report
            </a>
          )}
        </div>
      </div>
    </article>
  )
}


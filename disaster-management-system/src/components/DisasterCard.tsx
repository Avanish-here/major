import {
  PiWavesBold,
  PiHouseLineBold,
  PiFireSimpleBold,
  PiWindBold,
  PiMapPinBold,
  PiWarningBold,
} from 'react-icons/pi'

type DisasterType = 'flood' | 'earthquake' | 'fire' | 'cyclone' | 'landslide' | 'other'

export type Disaster = {
  id: string
  type: DisasterType
  location: string
  severity: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Critical'
  dateTime: string
  sheltersAvailable: number
  latitude?: number
  longitude?: number
}

const typeConfig: Record<
  DisasterType,
  { label: string; icon: JSX.Element; bg: string; text: string }
> = {
  flood: {
    label: 'Flood',
    icon: <PiWavesBold className="h-5 w-5" />,
    bg: 'bg-sky-500/10',
    text: 'text-sky-300',
  },
  earthquake: {
    label: 'Earthquake',
    icon: <PiHouseLineBold className="h-5 w-5" />,
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
  },
  fire: {
    label: 'Fire',
    icon: <PiFireSimpleBold className="h-5 w-5" />,
    bg: 'bg-red-500/10',
    text: 'text-red-300',
  },
  cyclone: {
    label: 'Cyclone',
    icon: <PiWindBold className="h-5 w-5" />,
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
  },
  landslide: {
    label: 'Landslide',
    icon: <PiWarningBold className="h-5 w-5" />,
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-300',
  },
  other: {
    label: 'Other',
    icon: <PiWarningBold className="h-5 w-5" />,
    bg: 'bg-slate-500/10',
    text: 'text-slate-300',
  },
}

const severityConfig: Record<
  Disaster['severity'],
  { label: string; bg: string; dot: string }
> = {
  Low: { label: 'Low', bg: 'bg-emerald-500/15 text-emerald-300', dot: 'bg-emerald-400' },
  Moderate: {
    label: 'Moderate',
    bg: 'bg-yellow-500/15 text-yellow-300',
    dot: 'bg-yellow-400',
  },
  High: { label: 'High', bg: 'bg-orange-500/15 text-orange-300', dot: 'bg-orange-400' },
  Severe: { label: 'Severe', bg: 'bg-red-500/15 text-red-300', dot: 'bg-red-400' },
  Critical: {
    label: 'Critical',
    bg: 'bg-rose-500/15 text-rose-300',
    dot: 'bg-rose-400',
  },
}

type Props = {
  disaster: Disaster
}

export function DisasterCard({ disaster }: Props) {
  const type = typeConfig[disaster.type]
  const severity = severityConfig[disaster.severity]

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40 transition hover:border-primary-500/70 hover:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${type.bg} ${type.text}`}
          >
            {type.icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-50">{type.label}</h3>
            <p className="flex items-center gap-1.5 text-xs text-slate-400">
              <PiMapPinBold className="h-3.5 w-3.5 text-slate-500" />
              {disaster.location}
            </p>
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${severity.bg}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${severity.dot}`} />
          {severity.label}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Date &amp; time</p>
          <p className="mt-0.5">{disaster.dateTime}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Available shelters
          </p>
          <p className="mt-0.5 text-sm font-semibold text-primary-300">
            {disaster.sheltersAvailable}
          </p>
        </div>
      </div>
    </article>
  )
}


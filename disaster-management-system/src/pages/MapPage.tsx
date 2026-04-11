import { useState } from 'react'
import { useData } from '../context/DataContext'
import { MapComponent } from '../components/MapComponent'
import { MapErrorBoundary } from '../components/MapErrorBoundary'

export function MapPage() {
  const [query, setQuery] = useState('')

  const { shelters } = useData()

  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">
          Map &amp; Shelters Navigation
        </h1>
        <p className="text-sm text-slate-400">
          Locate active disaster zones, nearest shelters, and recommended evacuation routes in
          real-time.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
        <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Navigation tools
            </p>
            <input
              type="search"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Search a city or shelter..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Nearby shelters
            </p>
            <div className="space-y-2">
              {filteredShelters.map((shelter) => {
                const occupancy = Math.round((shelter.occupied / shelter.capacity) * 100)
                return (
                  <button
                    key={shelter.id}
                    type="button"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-left hover:border-primary-500/70 hover:bg-slate-900"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-50">{shelter.name}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{shelter.location}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-primary-300">
                        {shelter.distanceKm.toFixed(1)} km
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>
                          {shelter.occupied}/{shelter.capacity} occupants
                        </span>
                        <span>{occupancy}% full</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            occupancy > 85
                              ? 'bg-rose-400'
                              : occupancy > 65
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{ width: `${occupancy}%` }}
                        />
                      </div>
                    </div>
                  </button>
                )
              })}
              {filteredShelters.length === 0 && (
                <p className="text-xs text-slate-500">
                  No shelters match your search. Try a different name.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Suggested route
            </p>
            <ol className="space-y-1 text-xs text-slate-300">
              <li>1. Move towards higher ground away from water bodies.</li>
              <li>2. Follow marked evacuation corridors on the map.</li>
              <li>3. Head to the nearest shelter with capacity &gt; 20%.</li>
            </ol>
          </div>
        </aside>

        <div className="space-y-3">
          <MapErrorBoundary>
            <MapComponent />
          </MapErrorBoundary>
          <p className="text-[11px] text-slate-500">
            Disaster markers use live data from NASA EONET and USGS, and shelter markers are
            approximated around Mumbai. Map tiles are from OpenStreetMap and do not require any
            API key.
          </p>
        </div>
      </div>
    </section>
  )
}


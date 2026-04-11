import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { shelters as initialShelters } from '../services/mockData'
import { fetchRegionalEvents } from '../services/api'
import type { Disaster } from '../components/DisasterCard'
import type { Alert, Shelter } from '../services/mockData'

type DataContextValue = {
  disasters: Disaster[]
  alerts: Alert[]
  shelters: Shelter[]
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [disasters, setDisasters] = useState<Disaster[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [shelters] = useState<Shelter[]>(initialShelters)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const { disasters: remoteDisasters, alerts: remoteAlerts } = await fetchRegionalEvents()
        if (cancelled) return
        if (remoteDisasters.length > 0) {
          setDisasters(remoteDisasters)
        }
        if (remoteAlerts.length > 0) {
          setAlerts(remoteAlerts)
        }
      } catch {
        // If remote fetch fails, keep whatever live data we already had (or empty)
      }
    }

    void load()
    const intervalId = window.setInterval(load, 60000)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <DataContext.Provider
      value={{
        disasters,
        alerts,
        shelters,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}


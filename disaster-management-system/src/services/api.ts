import type { Disaster } from '../components/DisasterCard'
import type { Alert } from './mockData'

const EONET_EVENTS_URL = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=50'

function formatDateTime(value: number | string | undefined): string {
  if (value == null) return 'Time not available'
  const date = typeof value === 'number' ? new Date(value) : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  try {
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return date.toISOString()
  }
}

function mapMagnitudeToSeverity(mag: number | undefined): Disaster['severity'] {
  if (mag == null) return 'Moderate'
  if (mag >= 6.5) return 'Critical'
  if (mag >= 5.5) return 'Severe'
  if (mag >= 4.5) return 'High'
  return 'Moderate'
}

async function fetchNasaEvents(): Promise<{ disasters: Disaster[]; alerts: Alert[] }> {
  const res = await fetch(EONET_EVENTS_URL)
  if (!res.ok) {
    throw new Error('Failed to fetch NASA events')
  }

  const data = (await res.json()) as {
    events: Array<{
      id: string
      title: string
      description?: string
      link: string
      categories: Array<{ id: number; title: string }>
      geometry: Array<{
        date: string
        coordinates: [number, number]
      }>
    }>
  }

  const disasters: Disaster[] = []
  const alerts: Alert[] = []

  for (const event of data.events) {
    const lastGeometry = event.geometry[event.geometry.length - 1]
    const [lon, lat] = lastGeometry.coordinates

    // Rough bounding box around India + neighbours
    if (lat < 0 || lat > 45 || lon < 40 || lon > 110) continue

    const category = event.categories[0]?.title ?? 'Natural event'

    const type: Disaster['type'] =
      category.toLowerCase().includes('fire') || category.toLowerCase().includes('wildfire')
        ? 'fire'
        : category.toLowerCase().includes('storm') ||
          category.toLowerCase().includes('cyclone') ||
          category.toLowerCase().includes('hurricane')
        ? 'cyclone'
        : category.toLowerCase().includes('flood')
        ? 'flood'
        : 'other'

    const severity: Disaster['severity'] = 'Moderate'

    disasters.push({
      id: `nasa-${event.id}`,
      type,
      location: `${category} (NASA EONET)`,
      severity,
      dateTime: formatDateTime(lastGeometry.date),
      sheltersAvailable: 0,
      latitude: lat,
      longitude: lon,
    })

    alerts.push({
      id: `nasa-alert-${event.id}`,
      title: event.title,
      description: event.description ?? `NASA EONET event in category ${category}.`,
      location: `${category} • NASA EONET`,
      timeIssued: formatDateTime(lastGeometry.date),
      severity,
      url: event.link,
    })
  }

  return { disasters, alerts }
}

async function fetchEarthquakeEvents(): Promise<{ disasters: Disaster[]; alerts: Alert[] }> {
  const now = new Date()
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const startDate = start.toISOString().split('T')[0]
  const endDate = now.toISOString().split('T')[0]

  const params = new URLSearchParams({
    format: 'geojson',
    starttime: startDate,
    endtime: endDate,
    minmagnitude: '4.0',
    minlatitude: '0',
    maxlatitude: '45',
    minlongitude: '40',
    maxlongitude: '110',
  })

  const res = await fetch(
    `https://earthquake.usgs.gov/fdsnws/event/1/query?${params.toString()}`,
  )
  if (!res.ok) {
    throw new Error('Failed to fetch earthquake data')
  }

  const data = (await res.json()) as {
    features: Array<{
      id: string
      properties: {
        mag: number
        place: string
        time: number
        url: string
      }
      geometry: {
        coordinates: [number, number, number]
      }
    }>
  }

  const disasters: Disaster[] = []
  const alerts: Alert[] = []

  for (const feature of data.features) {
    const {
      id,
      properties: { mag, place, time, url },
      geometry: { coordinates },
    } = feature
    const [lon, lat] = coordinates

    const severity = mapMagnitudeToSeverity(mag)

    disasters.push({
      id: `usgs-${id}`,
      type: 'earthquake',
      location: place || 'Earthquake',
      severity,
      dateTime: formatDateTime(time),
      sheltersAvailable: 0,
      latitude: lat,
      longitude: lon,
    })

    alerts.push({
      id: `usgs-alert-${id}`,
      title: `M${mag.toFixed(1)} earthquake`,
      description: place || 'Earthquake event reported by USGS.',
      location: place || 'Earthquake',
      timeIssued: formatDateTime(time),
      severity,
      url,
    })
  }

  return { disasters, alerts }
}

export async function fetchRegionalEvents(): Promise<{
  disasters: Disaster[]
  alerts: Alert[]
}> {
  const [nasa, usgs] = await Promise.allSettled([
    fetchNasaEvents(),
    fetchEarthquakeEvents(),
  ])

  const disasters: Disaster[] = []
  const alerts: Alert[] = []

  if (nasa.status === 'fulfilled') {
    disasters.push(...nasa.value.disasters)
    alerts.push(...nasa.value.alerts)
  }
  if (usgs.status === 'fulfilled') {
    disasters.push(...usgs.value.disasters)
    alerts.push(...usgs.value.alerts)
  }

  return { disasters, alerts }
}


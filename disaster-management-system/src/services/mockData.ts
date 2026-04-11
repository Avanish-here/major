export type Shelter = {
  id: string
  name: string
  location: string
  capacity: number
  occupied: number
  distanceKm: number
}

export type Alert = {
  id: string
  title: string
  description: string
  location: string
  timeIssued: string
  severity: 'Critical' | 'Severe' | 'High' | 'Moderate' | 'Low'
  url?: string
}

export const shelters: Shelter[] = [
  {
    id: 's1',
    name: 'Central High School Shelter',
    location: 'Mumbai • 1.2 km',
    capacity: 1200,
    occupied: 840,
    distanceKm: 1.2,
  },
  {
    id: 's2',
    name: 'City Sports Complex',
    location: 'Mumbai • 3.8 km',
    capacity: 2000,
    occupied: 1120,
    distanceKm: 3.8,
  },
  {
    id: 's3',
    name: 'Community Hall Shelter',
    location: 'Mumbai • 5.4 km',
    capacity: 800,
    occupied: 460,
    distanceKm: 5.4,
  },
]

// Only shelters remain mocked; disasters and alerts are live from external APIs.

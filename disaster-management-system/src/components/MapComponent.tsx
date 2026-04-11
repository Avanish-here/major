import { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useData } from '../context/DataContext'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export function MapComponent() {
  const { disasters, shelters } = useData()

  const center: LatLngExpression = useMemo(() => {
    const withCoords = disasters.filter((d) => d.latitude != null && d.longitude != null)
    if (withCoords.length > 0) {
      const lat =
        withCoords.reduce((sum, d) => sum + (d.latitude ?? 0), 0) / withCoords.length
      const lng =
        withCoords.reduce((sum, d) => sum + (d.longitude ?? 0), 0) / withCoords.length
      return [lat, lng] as LatLngExpression
    }
    return [20.5937, 78.9629] as LatLngExpression
  }, [disasters])

  const zoom = disasters.length > 0 ? 4 : 5

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60"
      style={{ height: 360 }}
    >
      <div className="pointer-events-none absolute left-2 top-2 z-10 rounded-lg bg-black/60 px-2 py-1 text-[10px] text-slate-200">
        <div className="flex items-center gap-2">
          <span className="font-medium">Map debug:</span>
          <span>{disasters.length} disasters</span>
          <span>{shelters.length} shelters</span>
        </div>
        <div className="mt-0.5 text-xs text-slate-300">
          Center: {Array.isArray(center) ? `${center[0].toFixed(3)}, ${center[1].toFixed(3)}` : 'n/a'}
        </div>
      </div>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {disasters
          .filter((d) => d.latitude != null && d.longitude != null)
          .map((d) => (
            <Marker key={d.id} position={[d.latitude as number, d.longitude as number]}>
              <Popup>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{d.location}</p>
                  <p className="text-xs">
                    Type: <span className="font-medium capitalize">{d.type}</span>
                  </p>
                  <p className="text-xs">Severity: {d.severity}</p>
                  <p className="text-[11px] text-slate-600">{d.dateTime}</p>
                </div>
              </Popup>
            </Marker>
          ))}

        {shelters.map((shelter) => (
          <Marker
            key={shelter.id}
            position={[19.076 + shelter.distanceKm * 0.02, 72.8777 + shelter.distanceKm * 0.01]}
          >
            <Popup>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{shelter.name}</p>
                <p className="text-xs text-slate-600">Capacity: {shelter.capacity}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}


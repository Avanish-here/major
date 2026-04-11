import { Route, Routes, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { DashboardPage } from './pages/DashboardPage'
import { MapPage } from './pages/MapPage'
import { AlertsPage } from './pages/AlertsPage'
import { DownloadPage } from './pages/DownloadPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { EmergencyContactsSection } from './components/EmergencyContactsSection'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1 pt-20 pb-10 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-8">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <EmergencyContactsSection />
      </main>
      <Footer />
    </div>
  )
}


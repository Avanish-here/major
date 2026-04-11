export function DownloadPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">
          Disaster Management Mobile App
        </h1>
        <p className="text-sm text-slate-400">
          Carry real-time alerts, offline-ready maps, and one-tap SOS actions right in your pocket.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-5 shadow-xl shadow-slate-950/60">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-300">
            Mobile app features
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>• Real-time alerts with severity-based notifications.</li>
            <li>• Offline maps with pre-downloaded evacuation routes.</li>
            <li>• One-tap SOS sharing your live location with responders.</li>
            <li>• Family safety check-in and status broadcasts.</li>
          </ul>
          <p className="pt-1 text-xs text-slate-400">
            The mobile app is designed to keep working even when connectivity is weak or
            intermittent by caching critical data on device.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Download for your device
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/40 hover:bg-white"
            >
              <span className="text-xl">🤖</span>
              <span>Download for Android</span>
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-50 shadow-lg shadow-slate-950/40 hover:border-slate-400"
            >
              <span className="text-xl"></span>
              <span>Download for iOS</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500">
            Coming soon to official app stores. For demo purposes, these buttons can be wired to
            APK / TestFlight links when available.
          </p>
        </div>
      </div>
    </section>
  )
}


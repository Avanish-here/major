export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-400 md:flex-row md:px-8 lg:px-12">
        <p>© {new Date().getFullYear()} Disaster Management System. All rights reserved.</p>
        <p className="flex flex-wrap items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Operational status: Stable</span>
        </p>
      </div>
    </footer>
  )
}


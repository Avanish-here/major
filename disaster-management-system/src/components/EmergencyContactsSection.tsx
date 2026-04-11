const contacts = [
  {
    label: 'National Emergency Helpline',
    number: '112',
    description: 'Police, fire, ambulance and disaster response',
  },
  {
    label: 'Disaster Management Control Room',
    number: '108',
    description: '24x7 multi-hazard emergency coordination',
  },
  {
    label: 'Local Relief Coordination',
    number: '1910',
    description: 'Shelter availability and relief material support',
  },
]

export function EmergencyContactsSection() {
  return (
    <section className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-emerald-100 shadow-lg shadow-emerald-900/40 md:flex md:items-center md:justify-between md:gap-4">
      <div className="mb-3 md:mb-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
          Emergency contacts
        </p>
        <p className="mt-1 max-w-md text-xs text-emerald-100/80">
          In case of immediate danger, contact local emergency services first. Use the numbers below
          for verified support channels.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {contacts.map((contact) => (
          <button
            key={contact.number}
            type="button"
            className="group flex flex-col rounded-xl border border-emerald-700/60 bg-emerald-900/60 px-3 py-2 text-left hover:border-emerald-400 hover:bg-emerald-900"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
              {contact.label}
            </span>
            <span className="mt-1 text-sm font-semibold text-emerald-100 group-hover:text-white">
              {contact.number}
            </span>
            <span className="mt-0.5 text-[11px] text-emerald-200/80">{contact.description}</span>
          </button>
        ))}
      </div>
    </section>
  )
}


export function AboutPage() {
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-label-primary">
          Info
        </h1>
        <p className="mt-2 text-base text-label-secondary">
          Details zur Anwendung
        </p>
      </header>

      <div className="card divide-y divide-slate-200">
        <div className="p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-label-tertiary">
            Beschreibung
          </h2>
          <p className="mt-3 text-base leading-relaxed text-label-primary">
            Eine minimalistische Shopping-App mit modernem Design.
            Verwalte deine Einkaeufe einfach und effizient.
          </p>
        </div>

        <div className="p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-label-tertiary">
            Technologien
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Express', 'MongoDB', 'Tailwind CSS'].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-surface-muted px-3 py-1.5 text-sm font-medium text-label-secondary"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-label-tertiary">
            Features
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              'Produkte hinzufuegen und verwalten',
              'Mengenangabe mit Steuerung',
              'Als gekauft markieren',
              'Loeschen mit Bestaetigung',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-base text-label-primary">
                <svg
                  className="h-5 w-5 shrink-0 text-success"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

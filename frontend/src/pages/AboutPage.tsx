const manualSteps = [
  {
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
    title: 'Produkt hinzufügen',
    text: 'Namen eintippen, optional Menge mit −/+ oder direkt eintippen anpassen, dann „Hinzufügen" klicken oder Enter drücken.',
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: 'Als erledigt markieren',
    text: 'Auf die Checkbox links neben dem Produkt tippen. Der Haken wird gezeichnet, danach wandert das Produkt in „Erledigt“.',
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    ),
    title: 'Menge verringern / erhöhen',
    text: 'Mit den Buttons − und + oder mit Pfeiltasten (oben/unten) im Mengenfeld. Oder auf die Zahl in der Liste tippen – es öffnet sich ein Fenster.',
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    title: 'Produkt löschen',
    text: 'Auf den Papierkorb rechts tippen. Es erscheint eine Abfrage – mit „Entfernen" bestätigen.',
  },
];

const quickTips = [
  {
    title: 'Desktop – schnellster Workflow',
    text: 'Produktname tippen → Enter (springt ins Mengenfeld) → Pfeil hoch/unten für Menge → Enter zum Hinzufügen. So fügst du ein Produkt ohne Maus hinzu.',
  },
  {
    title: 'Desktop – Menge direkt ändern',
    text: 'Im Mengenfeld wird die Zahl bei Fokus automatisch markiert. Du kannst eine neue Zahl eintippen, sie ersetzt die alte sofort.',
  },
  {
    title: 'Mobil – ohne Tastatur für die Menge',
    text: '−/+ nutzen statt die Bildschirmtastatur zu öffnen. Nur beim Produktnamen muss getippt werden.',
  },
];

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

      <div className="card p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-label-tertiary">
            Bedienungsanleitung
          </h2>
          <p className="mt-2 text-sm text-label-secondary">
            So bedienst du die App – alle Aktionen im Überblick:
          </p>
          <ul className="mt-4 space-y-5">
            {manualSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-label-secondary">
                  {step.icon}
                </span>
                <div>
                  <h3 className="font-medium text-label-primary">{step.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-label-secondary">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
      </div>

      <div className="card mt-6 p-6">
        <h2 className="text-sm font-medium uppercase tracking-wider text-label-tertiary">
          Am schnellsten & effektivsten
        </h2>
        <p className="mt-2 text-sm text-label-secondary">
          So nutzt du die App am effektivsten:
        </p>
        <ul className="mt-4 space-y-4">
          {quickTips.map((tip, i) => (
            <li key={i} className="rounded-lg bg-accent-subtle/50 px-4 py-3">
              <h3 className="font-medium text-label-primary">{tip.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-label-secondary">
                {tip.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

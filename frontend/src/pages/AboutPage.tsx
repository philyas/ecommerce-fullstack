export function AboutPage() {
  return (
    <section className="rounded-apple-lg bg-surface-elevated p-8 shadow-card sm:p-10">
      <h1 className="text-[28px] font-semibold tracking-tight text-label-primary sm:text-[34px]">
        Über diese App
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-label-secondary">
        Eine einfache Einkaufsliste-App mit React, TypeScript, Express und
        MongoDB. Du kannst Produkte hinzufügen, als gekauft markieren und
        wieder löschen.
      </p>
      <p className="mt-6 text-[15px] text-label-tertiary">
        Nutze die Navigation oben, um zur Liste zurückzukehren.
      </p>
    </section>
  );
}

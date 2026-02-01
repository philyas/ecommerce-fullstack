import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
      isActive
        ? 'bg-success text-white'
        : 'text-label-secondary hover:bg-success-light hover:text-label-primary'
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <nav className="shrink-0 border-b border-slate-200 bg-surface-elevated/80 backdrop-blur-lg">
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex h-16 items-center justify-between">
            <NavLink
              to="/"
              className="transition-opacity hover:opacity-80"
              aria-label="Listify"
            >
              <img
                src="/assets/listify.png"
                alt="Listify"
                className="h-28 w-auto object-contain sm:h-32"
              />
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 sm:flex">
              <NavLink to="/" className={navLinkClass}>
                Liste
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                Info
              </NavLink>
            </div>

            {/* Mobile Burger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-label-primary hover:bg-surface-muted sm:hidden"
              aria-label="Menü öffnen"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Nav - von rechts nach links */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-label-primary/20 backdrop-blur-sm sm:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <aside
            className="fixed right-0 top-0 z-50 flex h-full w-64 flex-col gap-2 border-l border-slate-200 bg-white p-6 shadow-xl animate-slide-in-right sm:hidden"
            role="dialog"
            aria-label="Navigation"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-label-secondary hover:bg-surface-muted"
                aria-label="Menü schließen"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Liste
              </NavLink>
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Info
              </NavLink>
            </nav>
          </aside>
        </>
      )}

      <main className="mx-auto flex min-h-0 max-w-2xl flex-1 flex-col overflow-hidden px-6 py-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}

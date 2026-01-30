import { Outlet, NavLink } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <nav className="sticky top-0 z-10 bg-surface-elevated/80 backdrop-blur-xl shadow-nav">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <NavLink
              to="/"
              className="text-[17px] font-semibold text-label-primary hover:opacity-80"
            >
              Einkaufsliste
            </NavLink>
            <div className="flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded-apple px-4 py-2 text-[15px] font-medium ${
                    isActive
                      ? 'bg-black/5 text-label-primary'
                      : 'text-label-secondary hover:bg-black/[0.04] hover:text-label-primary'
                  }`
                }
              >
                Liste
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-apple px-4 py-2 text-[15px] font-medium ${
                    isActive
                      ? 'bg-black/5 text-label-primary'
                      : 'text-label-secondary hover:bg-black/[0.04] hover:text-label-primary'
                  }`
                }
              >
                Über uns
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}

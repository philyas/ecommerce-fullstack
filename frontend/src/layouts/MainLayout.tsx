import { Outlet, NavLink } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <nav className="sticky top-0 z-10 border-b border-zinc-200 bg-surface-elevated/80 backdrop-blur-lg">
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex h-16 items-center justify-between">
            <NavLink
              to="/"
              className="text-lg font-semibold tracking-tight text-label-primary transition-opacity hover:opacity-70"
            >
              ListUp
            </NavLink>
            <div className="flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-label-secondary hover:bg-surface-muted hover:text-label-primary'
                  }`
                }
              >
                Liste
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-label-secondary hover:bg-surface-muted hover:text-label-primary'
                  }`
                }
              >
                Info
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

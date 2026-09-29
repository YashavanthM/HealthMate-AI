import { useEffect, useState } from "react";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "M4 5a1 1 0 0 1 1-1h5v7H4V5Zm10-1h5a1 1 0 0 1 1 1v3h-6V4ZM4 13h6v7H5a1 1 0 0 1-1-1v-6Zm10-3h6v9a1 1 0 0 1-1 1h-5V10Z",
  },
  {
    id: "analysis",
    label: "Analysis",
    icon: "M12 21s-7-4.35-7-10.2C5 7.46 7.54 5 10.55 5c1.56 0 2.73.73 3.45 1.67C14.72 5.73 15.89 5 17.45 5 20.46 5 23 7.46 23 10.8 23 16.65 16 21 16 21h-4Zm-1-7h2l1-3 2 6 1-3h3",
  },
  {
    id: "exercise",
    label: "Exercise",
    icon: "M8 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8.5 2.25 2.85-2.85-1.4-1.4-2.2 2.2L13 6.1 9.3 10H5v2h5.15l2-2.1 1.35 1.35L10 18.5l1.8.9 2.4-4.8 2.55 2.55 3.1-3.1-1.4-1.4-1.95 1.95-2.4-2.4 2.4-2.95Z",
  },
  {
    id: "history",
    label: "History",
    icon: "M12 8v5l3 1.8 1-1.65-2-1.15V8h-2Zm0-6a10 10 0 1 0 10 10h-2a8 8 0 1 1-2.34-5.66L15 9h7V2l-2.92 2.92A9.96 9.96 0 0 0 12 2Z",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65-2-3.46-2.49 1a7.3 7.3 0 0 0-1.69-.98L15 3.25h-4l-.36 2.68c-.6.23-1.16.56-1.69.98l-2.49-1-2 3.46 2.11 1.65c-.04.32-.07.65-.07.98s.02.66.07.98l-2.11 1.65 2 3.46 2.49-1c.52.4 1.08.73 1.69.98L11 20.75h4l.36-2.68c.6-.23 1.16-.56 1.69-.98l2.49 1 2-3.46-2.11-1.65ZM13 15.5A3.5 3.5 0 1 1 13 8a3.5 3.5 0 0 1 0 7.5Z",
  },
];

function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  useEffect(() => {
    const handleScroll = () => {
      const currentItem = navItems.findLast((item) => {
        const section = document.getElementById(item.id);
        return section ? section.getBoundingClientRect().top <= 160 : false;
      });

      if (currentItem) {
        setActiveItem(currentItem.id);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-3 top-3 z-50 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/85 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 font-black text-white shadow-[0_0_28px_rgba(37,99,235,0.35)]">
            H
          </span>
          <div>
            <strong className="block text-sm font-black text-white">HealthMate AI</strong>
            <small className="text-xs text-slate-400">AI Health OS</small>
          </div>
        </div>
        <nav className="flex max-w-[52vw] gap-2 overflow-x-auto" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-300"
              href={`#${item.id}`}
              key={`mobile-${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-gradient-to-b from-slate-950 via-[#0B1220] to-slate-900/95 p-4 shadow-2xl shadow-black/30 lg:flex">
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-xl font-black text-white shadow-[0_0_32px_rgba(37,99,235,0.45)]">
          H
        </span>
        <div>
          <strong className="mt-4 block text-lg font-bold tracking-tight text-white">HealthMate AI</strong>
          <small className="mt-1 block text-sm text-slate-400">AI Health OS</small>
        </div>
      </div>

      <nav className="grid gap-2" aria-label="Dashboard navigation">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <a
              aria-current={isActive ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-blue-400/30 bg-blue-500/20 text-blue-100 shadow-[0_0_28px_rgba(37,99,235,0.28)]"
                  : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
              }`}
              href={`#${item.id}`}
              key={item.id}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl border transition ${
                  isActive
                    ? "border-blue-300/30 bg-blue-400/20 text-cyan-100"
                    : "border-white/10 bg-white/[0.03] text-slate-500 group-hover:text-slate-200"
                }`}
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.icon} />
                </svg>
              </span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-300 text-sm font-black text-white">
            YK
          </div>
          <div className="min-w-0">
            <strong className="block truncate text-sm font-bold text-white">Yashu K.</strong>
            <small className="block truncate text-xs text-slate-400">Patient workspace</small>
          </div>
        </div>
      </div>
      </aside>
    </>
  );
}

export default Sidebar;

import { Link } from "@tanstack/react-router";

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/analyze", label: "Analyze" },
  { to: "/rulings/001", label: "Sample Ruling" },
  { to: "/methodology", label: "Methodology" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-parchment">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-serif text-2xl tracking-tight text-ink">Tribunal</span>
          <span className="institutional-mark hidden md:inline">
            Media Accuracy Verifier
          </span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              className="text-sm text-ink-soft transition-colors hover:text-ink data-[status=active]:text-ink data-[status=active]:font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

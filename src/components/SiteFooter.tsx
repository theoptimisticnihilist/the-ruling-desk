export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-parchment">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-ink-soft md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-lg text-ink">Tribunal</span>
          <span className="institutional-mark">Prototype</span>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <span>An independent prototype for media accuracy review.</span>
          <span className="text-xs">© {new Date().getFullYear()} Tribunal. All rulings are illustrative.</span>
        </div>
      </div>
    </footer>
  );
}

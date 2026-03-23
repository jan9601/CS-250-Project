function Stat({icon, title, value, color}) {
  const colorMap = {
    green: "bg-brand-light/30 text-brand-dark",
    blue: "bg-action-light/20 text-action-hover",
    yellow: "bg-accent-light/30 text-accent-harvest",
  };

  return (
    <div className="flex items-center gap-5 rounded-lg border border-border bg-surface px-7 py-5 shadow-xs">
      <div
        className={`aspect-square h-12 w-12 flex shrink-0 items-center justify-center rounded-full ${colorMap[color]}`}
      >
        <div className="text-3xl">{icon}</div>
      </div>

      <div>
        <p className="mb-1.5 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          {title}
        </p>

        <p className="text-xl font-medium leading-none text-text-primary">
          {value}
        </p>
      </div>
    </div>
  );
}

export default Stat;

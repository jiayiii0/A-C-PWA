export function SectionCard({
  title,
  eyebrow,
  action,
  children
}: {
  title: string;
  eyebrow?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-card p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan">{eyebrow}</p> : null}
          <h2 className="mt-1 text-lg font-bold text-ink">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

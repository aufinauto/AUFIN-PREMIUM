export default function Index({ n }: { n: number }) {
  return (
    <span className="inline-flex items-baseline gap-3 font-display text-sm font-normal italic text-accent">
      {String(n).padStart(2, "0")}
      <span className="hairline h-px w-8 bg-accent-soft" />
    </span>
  );
}

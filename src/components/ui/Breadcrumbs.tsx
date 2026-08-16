import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Drobečková navigace" className="flex flex-wrap items-center gap-2 font-sans text-xs text-graphite-faint">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 ? <span aria-hidden>/</span> : null}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-graphite">
              {item.label}
            </Link>
          ) : (
            <span className="text-graphite-soft">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

import Reveal from "./Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow ? (
        <Reveal>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl font-normal leading-[1.1] text-graphite balance sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="mt-5 text-balance text-[17px] leading-relaxed text-graphite-soft">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

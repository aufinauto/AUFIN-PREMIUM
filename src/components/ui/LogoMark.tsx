interface LogoMarkProps {
  className?: string;
  variant?: "dark" | "light";
}

export default function LogoMark({ className = "h-8 w-8", variant = "dark" }: LogoMarkProps) {
  const ink = variant === "light" ? "#ffffff" : "#17181A";
  const accent = "#B4915C";

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="28.5" stroke={ink} strokeWidth="1.3" opacity="0.85" />
      <path d="M32 17 L16 47" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M32 17 L48 47" stroke={ink} strokeWidth="5.2" strokeLinecap="round" />
      <path d="M21.3 37 L40.5 33" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="17" r="2.4" fill={accent} />
    </svg>
  );
}

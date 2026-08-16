import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans tracking-wide transition-all duration-300 ease-[var(--ease-premium)] disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-graphite text-white hover:bg-accent focus-visible:bg-accent",
  secondary:
    "border border-graphite/25 text-graphite hover:border-graphite hover:bg-graphite hover:text-white",
  ghost: "text-graphite hover:text-accent underline-reveal",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[15px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

interface ButtonAsLink extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children, className = "" } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, children: _c, className: _cl, href: _h, ...rest } =
    props as ButtonAsButton;
  void _v;
  void _s;
  void _c;
  void _cl;
  void _h;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

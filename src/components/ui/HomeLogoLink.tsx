"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function HomeLogoLink({
  className,
  onNavigate,
  children,
}: {
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={() => {
        onNavigate?.();
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={className}
    >
      {children}
    </Link>
  );
}

import Image from "next/image";

interface PhotoImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Skip Next.js image optimization — needed for transparent PNGs, since the
   * optimizer's palette output currently drops the alpha channel. */
  unoptimized?: boolean;
}

export default function PhotoImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  unoptimized = false,
}: PhotoImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className="object-cover"
      />
    </div>
  );
}

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
  /** CSS object-position for the cropped image, e.g. "center 75%". */
  objectPosition?: string;
}

export default function PhotoImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  unoptimized = true,
  objectPosition = "50% 50%",
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
        style={{ objectPosition }}
      />
    </div>
  );
}

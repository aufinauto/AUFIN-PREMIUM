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
  /** Fixed small thumbnail mode (e.g. admin previews): switches away from
   * `fill` + `sizes` to explicit dimensions, so Next.js only ever requests
   * a 1x/2x pair near this size instead of possibly the largest configured
   * device width (which `sizes` without a `vw` unit can trigger). */
  width?: number;
  height?: number;
}

export default function PhotoImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  unoptimized = true,
  objectPosition = "50% 50%",
  width,
  height,
}: PhotoImageProps) {
  if (width && height) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          unoptimized={unoptimized}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }

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

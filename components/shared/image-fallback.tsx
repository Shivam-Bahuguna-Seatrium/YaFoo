"use client";

import Image from "next/image";
import { Utensils } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils/cn";

export function ImageFallback({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-[#e9e5dc]", className)}>
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#e9e5dc] text-[#8b8478]">
          <Utensils className="size-7" />
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em]">Freshly imagined</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

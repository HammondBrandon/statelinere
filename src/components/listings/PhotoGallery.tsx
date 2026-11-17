"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Grid2x2, X } from "lucide-react";
import { unsplash } from "@/lib/site";

export default function PhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const count = photos.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, go]);

  if (!count) return null;
  const side = photos.slice(1, 5);

  return (
    <>
      <div className="relative grid gap-2 overflow-hidden rounded-3xl md:grid-cols-4 md:grid-rows-2 md:h-[560px]">
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="relative aspect-[4/3] md:aspect-auto md:col-span-2 md:row-span-2 overflow-hidden"
          aria-label="Open photo 1"
        >
          <Image src={unsplash(photos[0], 1600)} alt={alt} fill preload sizes="(min-width:768px) 50vw, 100vw" className="object-cover hover:scale-[1.02] transition-transform duration-700" />
        </button>
        {side.map((p, i) => (
          <button
            key={p + i}
            type="button"
            onClick={() => setIndex(i + 1)}
            className="relative hidden md:block overflow-hidden"
            aria-label={`Open photo ${i + 2}`}
          >
            <Image src={unsplash(p, 800)} alt="" fill sizes="25vw" className="object-cover hover:scale-[1.03] transition-transform duration-700" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink shadow-lift"
        >
          <Grid2x2 className="h-4 w-4" aria-hidden /> {count} photos
        </button>
      </div>

      {index !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92">
          <button type="button" onClick={() => setIndex(null)} className="absolute right-4 top-4 p-2 text-white" aria-label="Close">
            <X className="h-8 w-8" />
          </button>
          <button type="button" onClick={() => go(-1)} className="absolute left-2 sm:left-6 p-3 text-white" aria-label="Previous photo">
            <ChevronLeft className="h-9 w-9" />
          </button>
          <div className="relative h-[80vh] w-[92vw] max-w-6xl">
            <Image src={unsplash(photos[index], 2000)} alt={`${alt} — photo ${index + 1}`} fill sizes="92vw" className="object-contain" />
          </div>
          <button type="button" onClick={() => go(1)} className="absolute right-2 sm:right-6 p-3 text-white" aria-label="Next photo">
            <ChevronRight className="h-9 w-9" />
          </button>
          <p className="absolute bottom-5 text-sm text-white/80">{index + 1} / {count}</p>
        </div>
      )}
    </>
  );
}

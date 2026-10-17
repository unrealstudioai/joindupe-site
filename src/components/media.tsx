import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export const media = (name: string) => `/media/${name}`;

/** Muted looping clip that only plays while on screen; a still for reduced-motion visitors. */
export function AutoVideo({ src, poster, className, label }: { src: string; poster: string; className?: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (reduce) {
    return <img src={poster} alt={label ?? ''} className={cn('h-full w-full object-cover', className)} loading="lazy" decoding="async" />;
  }
  return (
    <video
      ref={ref}
      className={cn('h-full w-full object-cover', className)}
      poster={poster}
      src={near ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      disablePictureInPicture
    />
  );
}

export function Img({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <img src={src} alt={alt} className={cn('h-full w-full object-cover', className)} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />;
}

export function Wordmark({ className, invert }: { className?: string; invert?: boolean }) {
  return <img src="/brand/dupe-wordmark.svg" alt="dupe" width={92} height={41} className={cn('block h-[30px] w-auto', invert && 'invert', className)} />;
}

/** Title-case a preset file name: "amalfi-lemon-terrace" -> "Amalfi Lemon Terrace". */
const UPPER = new Set(['suv']);
export const titleFromSlug = (slug: string) =>
  slug
    .split('-')
    .map((w) => (UPPER.has(w) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(' ');

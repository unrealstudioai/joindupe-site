import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { AutoVideo, Img, media } from '@/components/media';
import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHead } from './chrome';
import { cn } from '@/lib/utils';

const TABS = ['Photos', 'Carousels', 'Videos'] as const;
type Tab = (typeof TABS)[number];

const blurbs: Record<Tab, string> = {
  Photos: 'Single shots that look like they came off your own phone.',
  Carousels: 'A whole swipeable post from one idea: different angles, same day, same you.',
  Videos: 'Short clips with real movement, for Reels and TikTok.',
};

function Photos() {
  const items = [
    { src: 'p-ibiza-beach-club-sunset.webp', alt: 'Ibiza beach club at sunset', cls: 'col-span-2 row-span-2' },
    { src: 'p-sunlit-terrace-coffee.webp', alt: 'Coffee on a sunlit terrace', cls: '' },
    { src: 'p-kerbside-sports-car.webp', alt: 'Leaning on a sports car at the kerb', cls: '' },
    { src: 'p-poolside-steps.webp', alt: 'Poolside steps', cls: '' },
    { src: 'p-restaurant-table-turn.webp', alt: 'Turning round at a restaurant table', cls: '' },
  ];
  return (
    <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.src} className={cn('overflow-hidden rounded-[22px] bg-line', it.cls)}>
          <Img src={media(it.src)} alt={it.alt} className="transition-transform duration-700 hover:scale-[1.03]" />
        </div>
      ))}
    </div>
  );
}

function Carousel() {
  const [i, setI] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const slides = Array.from({ length: 8 }, (_, k) => k + 1);
  const go = (n: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, n));
    const child = el.children[next] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };
  return (
    <div className="mx-auto max-w-[460px]">
      <div className="overflow-hidden rounded-[26px] border border-line bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2.5 px-4 py-3">
          <img src="/favicon.png" alt="" className="h-8 w-8 rounded-full" />
          <div className="text-[13px] leading-tight">
            <p className="font-semibold">Dubai weekend</p>
            <p className="text-mute">Carousel · 8 slides</p>
          </div>
          <span className="ml-auto rounded-full bg-[#f2f2f1] px-2.5 py-1 text-[12px] font-semibold tabular-nums">
            {i + 1}/{slides.length}
          </span>
        </div>
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            setI(Math.round(el.scrollLeft / el.clientWidth));
          }}
          tabIndex={0}
          aria-label="Carousel of 8 slides"
        >
          {slides.map((n) => (
            <div key={n} className="aspect-[4/5] w-full shrink-0 snap-center">
              <Img src={media(`carousel-${n}.webp`)} alt={`Dubai carousel, slide ${n} of 8`} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <button type="button" onClick={() => go(i - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-line disabled:opacity-30" disabled={i === 0} aria-label="Previous slide">
            ←
          </button>
          <div className="flex gap-1.5" aria-hidden>
            {slides.map((n, k) => (
              <span key={n} className={cn('h-1.5 rounded-full bg-ink transition-all duration-300', k === i ? 'w-5' : 'w-1.5 opacity-25')} />
            ))}
          </div>
          <button type="button" onClick={() => go(i + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-line disabled:opacity-30" disabled={i === slides.length - 1} aria-label="Next slide">
            →
          </button>
        </div>
      </div>
    </div>
  );
}

function Videos() {
  const vids = [
    { slug: 'festival-crowd', label: 'Festival crowd' },
    { slug: 'gilded-mirror-selfie', label: 'Gilded mirror selfie' },
    { slug: 'black-suv-shoreline', label: 'Black SUV on the shoreline' },
    { slug: 'gym-mirror-bench', label: 'Gym mirror bench' },
  ];
  return (
    <div className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
      {vids.map((v) => (
        <div key={v.slug} className="w-[62%] shrink-0 snap-center sm:w-auto">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-line">
            <AutoVideo src={media(`v-${v.slug}.mp4`)} poster={media(`v-${v.slug}.webp`)} label={v.label} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PhotoDump() {
  const [tab, setTab] = useState<Tab>('Photos');
  const reduce = useReducedMotion();
  return (
    <section className="bg-paper py-24 sm:py-32" aria-labelledby="dump-title">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <BlurFade>
            <SectionHead title={<span id="dump-title">Your next photo dump starts here.</span>} sub={blurbs[tab]} />
          </BlurFade>
          <div role="tablist" aria-label="Content type" className="inline-flex self-start rounded-full bg-white p-1.5 shadow-[0_0_0_1px_var(--color-line)] lg:self-end">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn('relative h-11 rounded-full px-5 text-[15px] font-semibold transition-colors', tab === t ? 'text-white' : 'text-mute hover:text-ink')}
              >
                {tab === t && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12" role="tabpanel" aria-label={tab}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {tab === 'Photos' && <Photos />}
              {tab === 'Carousels' && <Carousel />}
              {tab === 'Videos' && <Videos />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

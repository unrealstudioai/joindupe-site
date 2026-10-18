import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { AutoVideo, Img, media } from '@/components/media';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const tiles = [
  { name: 'Amalfi Lemon Terrace', img: 'p-amalfi-lemon-terrace.webp' },
  { name: 'Gilded Mirror Selfie', img: 'v-gilded-mirror-selfie.webp', video: 'v-gilded-mirror-selfie.mp4' },
  { name: 'Ibiza Beach Club', img: 'p-ibiza-beach-club-sunset.webp' },
  { name: 'Kerbside Sports Car', img: 'p-kerbside-sports-car.webp' },
];

function Phone() {
  return (
    <div className="relative w-[262px] rounded-[46px] bg-ink p-[9px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)_inset] sm:w-[292px]">
      <div className="relative overflow-hidden rounded-[38px] bg-white">
        <div className="absolute top-2.5 left-1/2 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-ink" />
        <div className="flex items-center justify-between px-6 pt-3.5 pb-1 text-[12px] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-1" aria-hidden>
            <span className="h-2.5 w-4 rounded-[3px] border border-ink/80 p-px"><span className="block h-full w-3/4 rounded-[1px] bg-ink" /></span>
          </span>
        </div>
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold tracking-[-0.03em]">Presets</p>
            <img src="/favicon.png" alt="" className="h-7 w-7 rounded-full" />
          </div>
          <div className="mt-3 flex h-9 items-center gap-2 rounded-full bg-[#f0f0ef] px-3 text-[12px] text-mute">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            Search presets
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 pb-4">
            {tiles.map((t) => (
              <div key={t.name}>
                <div className="aspect-[4/5] overflow-hidden rounded-[14px] bg-line">
                  {t.video ? <AutoVideo src={media(t.video)} poster={media(t.img)} label={t.name} /> : <Img src={media(t.img)} alt={t.name} eager />}
                </div>
                <p className="mt-1.5 truncate text-[10.5px] font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-3 mb-3 flex h-12 items-center justify-between rounded-full bg-[#f4f4f3] px-1.5 pl-4 text-[11px] text-mute">
          <span>Describe your idea…</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24, filter: 'blur(8px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 0.7, delay, ease } };

  return (
    <section ref={ref} className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Black brand-pattern band, cut on the diagonal like the brand board */}
      <div
        aria-hidden
        className="pattern-dark animate-drift absolute inset-0 [clip-path:polygon(0_78%,100%_44%,100%_100%,0_100%)] lg:[clip-path:polygon(38%_100%,100%_6%,100%_100%)]"
      />
      <div className="wrap relative grid items-center gap-12 pt-14 pb-24 lg:min-h-[calc(100svh-64px)] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-10 lg:pb-16">
        <div className="relative z-10">
          <motion.p {...enter(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            AI photos, carousels &amp; videos of you
          </motion.p>
          <motion.h1 {...enter(0.08)} id="hero-title" className="text-[60px] leading-[0.96] font-bold sm:leading-[0.94] tracking-[-0.055em] text-balance sm:text-[88px] xl:text-[112px]">
            Every trend, starring you.
          </motion.h1>
          <motion.p {...enter(0.18)} className="mt-6 max-w-md text-[20px] leading-snug font-medium text-ink sm:text-[23px]">
            Scroll-stopping content, ready to post.
          </motion.p>
          <motion.p {...enter(0.24)} className="mt-2 max-w-md text-[17px] leading-relaxed text-ink/75">
            Dupe is an iPhone app that turns a few selfies of yourself into social-media-style photos, carousels and short videos of you, in trending scenes and styles. Only of you, or someone who has said yes, and never nudity or intimate content.{' '}
            <a href="#safety" className="font-semibold text-ink underline decoration-1 underline-offset-4 hover:decoration-2">
              Safe by design
            </a>
          </motion.p>
          <motion.div {...enter(0.32)} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
            <ShimmerButton as="div" className="h-14 px-7 text-[16px] font-semibold" aria-label="Coming soon to the App Store">
              Coming soon to the App Store
            </ShimmerButton>
            <a href="#how" className="group inline-flex items-center gap-1.5 text-[15px] font-semibold">
              See how it works
              <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>↓</span>
            </a>
          </motion.div>
          <motion.p {...enter(0.4)} className="mt-5 text-[13px] text-mute">
            iPhone first · For adults 18+
          </motion.p>
        </div>

        <div className="relative mx-auto h-[600px] w-full max-w-[520px] sm:h-[640px]">
          <motion.div
            style={{ y: yA }}
            initial={reduce ? false : { opacity: 0, rotate: -14, x: -30 }}
            animate={{ opacity: 1, rotate: -9, x: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="absolute top-[150px] left-0 z-20 w-[150px] sm:left-[-10px] sm:w-[180px]"
          >
            <div className="animate-float-slow overflow-hidden rounded-[22px] border-[5px] border-white bg-white shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)]">
              <div className="aspect-[4/5]">
                <Img src={media('camila-como-boat-jetty.webp')} alt="Camila on a lake jetty, made with Dupe" eager />
              </div>
            </div>
          </motion.div>
          <motion.div style={{ y: yPhone }} className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
            >
              <div className="animate-float">
                <Phone />
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            style={{ y: yB }}
            initial={reduce ? false : { opacity: 0, rotate: 14, x: 30 }}
            animate={{ opacity: 1, rotate: 7, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="absolute right-0 bottom-[40px] z-20 w-[140px] sm:right-[-10px] sm:w-[170px]"
          >
            <div className="animate-float overflow-hidden rounded-[22px] border-[5px] border-white bg-white shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)] [animation-delay:-3s]">
              <div className="aspect-[9/16]">
                <AutoVideo src={media('camila-airport-window-walk.mp4')} poster={media('camila-airport-window-walk.webp')} label="Camila walking past an airport window, a Dupe video" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

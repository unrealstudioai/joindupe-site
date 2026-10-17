import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Img, media, titleFromSlug } from '@/components/media';
import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHead } from './chrome';
import { cn } from '@/lib/utils';

// The four sample characters from the app's onboarding demo (file key "niamh" is shown as Jess in the app).
const PEOPLE = [
  { key: 'camila', name: 'Camila', look: 'amalfi-lemon-terrace' },
  { key: 'andre', name: 'Andre', look: 'como-boat-jetty' },
  { key: 'niamh', name: 'Jess', look: 'cinque-terre-harbour-wall' },
  { key: 'leo', name: 'Leo', look: 'night-showroom-lean' },
] as const;

const STEPS = [
  { n: '01', title: 'Add your photos', body: 'Three clear selfies. Dupe checks them and builds your character.' },
  { n: '02', title: 'Pick your look', body: 'Choose a preset from hundreds of trends, or type your own idea.' },
  { n: '03', title: 'Make it yours', body: 'Get a photo, carousel or video starring you. Add a caption, save it, post it.' },
];

export function HowItWorks() {
  const [who, setWho] = useState(0);
  const reduce = useReducedMotion();
  const p = PEOPLE[who];
  const cards = [
    { src: `char-${p.key}.webp`, alt: `${p.name}'s starting selfie`, tag: 'Your selfie', tilt: -5 },
    { src: `look-${p.look}.webp`, alt: `${titleFromSlug(p.look)} preset`, tag: titleFromSlug(p.look), tilt: 3 },
    { src: `${p.key}-${p.look}.webp`, alt: `${p.name} in the ${titleFromSlug(p.look)} preset, made with Dupe`, tag: `${p.name}, made with Dupe`, tilt: -2 },
  ];

  return (
    <section id="how" className="scroll-mt-16 bg-white py-24 sm:py-32" aria-labelledby="how-title">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <BlurFade>
            <SectionHead eyebrow="How it works" title={<span id="how-title">Three photos. Endless possibilities.</span>} />
          </BlurFade>
          <div className="flex flex-col gap-2 lg:items-end">
            <p className="text-[13px] font-medium text-mute">Try it with a sample character</p>
            <div className="flex flex-wrap gap-2 lg:flex-nowrap" role="radiogroup" aria-label="Sample character">
              {PEOPLE.map((person, k) => (
                <button
                  key={person.key}
                  role="radio"
                  aria-checked={who === k}
                  onClick={() => setWho(k)}
                  className={cn(
                    'flex h-11 items-center gap-2 rounded-full border pr-4 pl-1 text-[14px] font-semibold transition-colors',
                    who === k ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink/40',
                  )}
                >
                  <img src={media(`char-${person.key}.webp`)} alt="" className="h-9 w-9 rounded-full object-cover" />
                  {person.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, k) => (
            <li key={s.n}>
              <BlurFade delay={k * 0.1}>
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] [perspective:1000px]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={cards[k].src}
                      initial={reduce ? false : { opacity: 0, rotate: cards[k].tilt + 6, y: 30, scale: 0.96 }}
                      animate={{ opacity: 1, rotate: cards[k].tilt, y: 0, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, rotate: cards[k].tilt - 6, y: -20, scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 26, delay: reduce ? 0 : k * 0.07 }}
                      whileHover={reduce ? undefined : { rotate: 0, scale: 1.02 }}
                      className="absolute inset-0 overflow-hidden rounded-[26px] border-[6px] border-white bg-line shadow-[0_30px_60px_-28px_rgba(0,0,0,0.45),0_0_0_1px_var(--color-line)]"
                    >
                      <Img src={media(cards[k].src)} alt={cards[k].alt} />
                      <span className="absolute bottom-3 left-3 max-w-[85%] truncate rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold backdrop-blur">{cards[k].tag}</span>
                    </motion.div>
                  </AnimatePresence>
                  {k < 2 && (
                    <span aria-hidden className="absolute top-1/2 -right-6 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ink text-[20px] font-bold text-white shadow-lg md:grid">
                      {k === 0 ? '+' : '='}
                    </span>
                  )}
                </div>
                <div className="mx-auto mt-8 max-w-[340px]">
                  <p className="text-[13px] font-semibold tabular-nums text-mute">{s.n}</p>
                  <h3 className="mt-1 text-[24px] font-bold tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-mute">{s.body}</p>
                </div>
              </BlurFade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

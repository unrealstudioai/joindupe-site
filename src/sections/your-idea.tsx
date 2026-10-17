import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import BackgroundPaths from '@/components/kokonut/background-paths';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AutoVideo, Img, media } from '@/components/media';
import { SectionHead } from './chrome';

const IDEAS = [
  'me on a rooftop in Lisbon at golden hour',
  'mirror selfie in a hotel lift, flash on',
  'courtside at a night game, phone photo',
  'walking out of a bakery in Paris, morning',
];

function TypedPrompt() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(reduce ? IDEAS[0].length : 0);
  const [phase, setPhase] = useState<'type' | 'hold' | 'erase'>('type');

  useEffect(() => {
    if (reduce) return;
    const text = IDEAS[idx];
    let t: number;
    if (phase === 'type') {
      t = window.setTimeout(() => (len < text.length ? setLen(len + 1) : setPhase('hold')), 45 + Math.random() * 40);
    } else if (phase === 'hold') {
      t = window.setTimeout(() => setPhase('erase'), 1800);
    } else {
      t = window.setTimeout(() => {
        if (len > 0) setLen(len - 1);
        else {
          setIdx((idx + 1) % IDEAS.length);
          setPhase('type');
        }
      }, 18);
    }
    return () => window.clearTimeout(t);
  }, [len, phase, idx, reduce]);

  return (
    <div className="flex h-16 w-full items-center gap-3 rounded-full bg-white pr-2 pl-6 text-ink shadow-[0_30px_80px_-20px_rgba(255,255,255,0.25)] sm:h-[72px]">
      <span className="min-w-0 flex-1 truncate text-[16px] sm:text-[18px]" aria-live="off">
        {IDEAS[idx].slice(0, len)}
        <span className="animate-caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-ink" aria-hidden />
      </span>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white sm:h-14 sm:w-14" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    </div>
  );
}

const FEATURES: { title: string; body: string; img?: string; video?: string; caption?: string }[] = [
  { title: 'Recreate', body: 'Upload a photo you love. Dupe makes a new version of the scene with you in it.', img: 'p-grand-portico-crossing.webp' },
  { title: 'Edit with words', body: 'Describe the change, like a different jacket or a sunset sky, and keep the rest.', img: 'andre-yacht-wake-cruise.webp' },
  { title: 'Your outfit, your product', body: 'Add an outfit or product photo and it shows up in the shot.', img: 'p-loft-office-desk.webp' },
  { title: 'Captions built in', body: 'Add text right on the post before you save it.', img: 'camila-gilded-mirror-selfie.webp', caption: 'acting like i live here' },
];

export function YourIdea() {
  return (
    <section className="relative overflow-hidden bg-ink text-white" aria-labelledby="idea-title">
      <BackgroundPaths className="absolute inset-0 text-white" count={36} angle={-10} speed={0.6} interactive>
        {null}
      </BackgroundPaths>
      <div className="wrap relative py-24 sm:py-32">
        <BlurFade>
          <SectionHead
            dark
            center
            eyebrow="Or start from scratch"
            title={<span id="idea-title">Your idea, your way.</span>}
            sub="Type what you picture. Dupe writes the shot and puts you in it."
          />
        </BlurFade>
        <BlurFade delay={0.1} className="mx-auto mt-10 max-w-2xl">
          <TypedPrompt />
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {['Photo', 'Carousel', 'Video', 'Recreate', 'Edit'].map((m) => (
              <span key={m} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[14px] font-semibold text-white/85 backdrop-blur">
                {m}
              </span>
            ))}
          </div>
        </BlurFade>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, k) => (
            <BlurFade key={f.title} delay={k * 0.08}>
              <article className="group h-full overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {f.video ? (
                    <AutoVideo src={media(`${f.video}.mp4`)} poster={media(`${f.video}.webp`)} label={f.title} className="transition-transform duration-700 group-hover:scale-[1.04]" />
                  ) : (
                    <Img src={media(f.img!)} alt="" className="transition-transform duration-700 group-hover:scale-[1.04]" />
                  )}
                  {f.caption && (
                    <span className="absolute inset-x-0 bottom-[14%] -rotate-3 text-center text-[22px] font-bold tracking-[-0.01em] text-white [-webkit-text-stroke:1px_#000] [paint-order:stroke_fill] [text-shadow:0_2px_0_#000]">
                      {f.caption}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-[20px] font-bold tracking-[-0.02em]">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">{f.body}</p>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

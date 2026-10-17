import { AutoVideo, Img, media, titleFromSlug } from '@/components/media';
import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHead } from './chrome';

type Item = { slug: string; video?: string };

// All of these are the same sample character (Camila) from the app's onboarding demo.
const ITEMS: Item[] = [
  { slug: 'amalfi-lemon-terrace' },
  { slug: 'airport-window-walk', video: '0:05' },
  { slug: 'scorpios-pool-daybed' },
  { slug: 'night-showroom-lean' },
  { slug: 'ski-lift-chair' },
  { slug: 'gilded-mirror-selfie' },
  { slug: 'black-suv-shoreline', video: '0:05' },
  { slug: 'cinque-terre-harbour-wall' },
  { slug: 'jet-cabin-recline' },
  { slug: 'yacht-wake-cruise' },
  { slug: 'bedroom-mirror-selfie', video: '0:05' },
  { slug: 'clifftop-terrace-railing' },
];

export function CameraRoll() {
  return (
    <section className="bg-paper py-24 sm:py-32" aria-labelledby="roll-title">
      <div className="wrap">
        <BlurFade>
          <SectionHead
            center
            title={<span id="roll-title">One character. A whole camera roll.</span>}
            sub="Every shot below is Camila, one of the sample characters in the app. Same face, a different trend each time."
          />
        </BlurFade>
        <BlurFade delay={0.1} className="mx-auto mt-14 max-w-[980px]">
          <div className="overflow-hidden rounded-[28px] bg-white p-[3px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between px-4 pt-3 pb-3 sm:px-5">
              <p className="text-[17px] font-bold tracking-[-0.02em]">Recents</p>
              <p className="text-[13px] font-medium text-mute">12 items</p>
            </div>
            <div className="grid grid-cols-3 gap-[3px] overflow-hidden rounded-[24px] sm:grid-cols-4">
              {ITEMS.map((it) => {
                const name = titleFromSlug(it.slug);
                return (
                  <div key={it.slug} className="group relative aspect-square overflow-hidden bg-line">
                    {it.video ? (
                      <AutoVideo src={media(`camila-${it.slug}.mp4`)} poster={media(`camila-${it.slug}.webp`)} label={`Camila, ${name}, video`} />
                    ) : (
                      <Img src={media(`camila-${it.slug}.webp`)} alt={`Camila, ${name}`} className="transition-transform duration-700 group-hover:scale-[1.05]" />
                    )}
                    {it.video && (
                      <span className="absolute right-2 bottom-1.5 text-[12px] font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">{it.video}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

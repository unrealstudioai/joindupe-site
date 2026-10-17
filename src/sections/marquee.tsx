import { Marquee } from '@/components/magicui/marquee';
import { AutoVideo, Img, media, titleFromSlug } from '@/components/media';
import { SectionHead } from './chrome';
import { BlurFade } from '@/components/magicui/blur-fade';

type Tile = { slug: string; video?: boolean };

const rowA: Tile[] = [
  { slug: 'amalfi-lemon-terrace' }, { slug: 'festival-crowd', video: true }, { slug: 'plane-window-shade' }, { slug: 'night-fuel-stop-supercar' },
  { slug: 'sagrada-familia-steps' }, { slug: 'bedroom-mirror-selfie', video: true }, { slug: 'tulum-beach-laptop' }, { slug: 'paddock-fence-cowgirl' },
  { slug: 'sunset-marina-table' }, { slug: 'gym-mirror-bench', video: true }, { slug: 'temple-roof-terrace' }, { slug: 'hotel-valet-arrival' },
];
const rowB: Tile[] = [
  { slug: 'yacht-bow-sit' }, { slug: 'nashville-honky-tonk' }, { slug: 'black-suv-shoreline', video: true }, { slug: 'farmers-market-flowers' },
  { slug: 'loft-office-desk' }, { slug: 'castle-at-dusk' }, { slug: 'beach-carnival-stall', video: true }, { slug: 'train-carriage-mirror' },
  { slug: 'driving-range-night' }, { slug: 'villa-hallway-mirror' }, { slug: 'dumbbell-rack-mirror', video: true }, { slug: 'jungle-deck-lounger' },
];

function PresetCard({ t }: { t: Tile }) {
  const name = titleFromSlug(t.slug);
  return (
    <figure className="w-[168px] shrink-0 sm:w-[208px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-line">
        {t.video ? (
          <>
            <AutoVideo src={media(`v-${t.slug}.mp4`)} poster={media(`v-${t.slug}.webp`)} label={`${name} video preset`} />
            <span className="absolute top-2.5 left-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">Video</span>
          </>
        ) : (
          <Img src={media(`p-${t.slug}.webp`)} alt={`${name} preset`} />
        )}
      </div>
      <figcaption className="mt-2 truncate px-1 text-[13px] font-semibold">{name}</figcaption>
    </figure>
  );
}

export function PresetMarquee() {
  return (
    <section id="presets" className="relative bg-white py-24 sm:py-32" aria-labelledby="presets-title">
      <div className="wrap">
        <BlurFade>
          <SectionHead
            eyebrow="Presets"
            title={<span id="presets-title">Hundreds of looks. One tap each.</span>}
            sub="Airport selfies, golden-hour terraces, gym mirrors, nights out. Pick a preset and Dupe puts you in it."
          />
        </BlurFade>
      </div>
      <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <Marquee pauseOnHover repeat={2} className="[--duration:70s] [--gap:14px]">
          {rowA.map((t) => (
            <PresetCard key={t.slug} t={t} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse repeat={2} className="mt-2 [--duration:80s] [--gap:14px]">
          {rowB.map((t) => (
            <PresetCard key={t.slug} t={t} />
          ))}
        </Marquee>
      </div>
      <p className="wrap mt-8 text-[13px] text-mute">Every preview is a real Dupe preset.</p>
    </section>
  );
}

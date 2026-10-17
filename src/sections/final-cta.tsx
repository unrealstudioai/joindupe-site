import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { BlurFade } from '@/components/magicui/blur-fade';

export function FinalCta() {
  return (
    <section className="bg-paper px-3 pb-3 sm:px-5 sm:pb-5" aria-labelledby="cta-title">
      <div className="pattern-dark animate-drift relative overflow-hidden rounded-[32px] sm:rounded-[44px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_62%_at_50%_50%,rgba(10,10,10,0.97)_35%,rgba(10,10,10,0.7)_75%,rgba(10,10,10,0.3))]" aria-hidden />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center sm:py-40">
          <BlurFade>
            <img src="/brand/dupe-wordmark.svg" alt="" className="mx-auto h-12 w-auto invert sm:h-14" />
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 id="cta-title" className="mt-8 text-[44px] leading-[0.95] font-bold tracking-[-0.045em] text-balance text-white sm:text-[72px]">
              Your next moment starts here.
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mx-auto mt-5 max-w-md text-[18px] leading-relaxed text-white/70">Scroll-stopping content, ready to post. Coming soon to the App Store.</p>
          </BlurFade>
          <BlurFade delay={0.24}>
            <ShimmerButton
              as="div"
              background="#ffffff"
              shimmerColor="#0a0a0a"
              className="mt-9 h-14 border-black/10 px-8 text-[16px] font-semibold !text-ink"
              aria-label="Coming soon to the App Store"
            >
              Coming soon · iPhone first
            </ShimmerButton>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

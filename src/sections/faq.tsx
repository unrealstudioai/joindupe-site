import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHead } from './chrome';

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: 'When can I get Dupe?',
    a: 'Dupe is coming soon to the App Store, on iPhone first. An Android version is planned.',
  },
  {
    q: 'How much does it cost?',
    a: 'There are three plans: Weekly, Pro and Max. Each gives you credits every period, and you spend credits on photos, carousels and videos. The price in your country is shown in the app before you buy. There is no free trial.',
  },
  {
    q: 'Do my photos train AI?',
    a: (
      <>
        No. We do not train AI models on your photos, prompts or results. To make your content, your photos are sent to the AI companies that run the models for us. The{' '}
        <a href="/privacy/" className="underline underline-offset-4">
          Privacy Policy
        </a>{' '}
        names every one of them.
      </>
    ),
  },
  {
    q: 'Can I make photos of someone else?',
    a: 'Only of another adult who has clearly given you permission, and you confirm this every time you upload photos. Never of anyone under 18, a celebrity or anyone who has not agreed. Nude, sexual or intimate content of anyone is never allowed, and requests for it are refused.',
  },
  {
    q: 'Who is Dupe for?',
    a: 'Adults only. You must be 18 or over to use it.',
  },
  {
    q: 'Can I use what I make on my socials or for my business?',
    a: (
      <>
        Yes. Your results are yours to use, including commercially, as long as you follow our{' '}
        <a href="/terms/" className="underline underline-offset-4">
          Terms
        </a>
        . Label AI-made content where a platform or the law asks you to.
      </>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-paper py-24 sm:py-32" aria-labelledby="faq-title">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <BlurFade>
          <SectionHead
            title={<span id="faq-title">Questions, answered.</span>}
            sub={
              <>
                Anything else? See{' '}
                <a href="/support/" className="font-semibold text-ink underline underline-offset-4">
                  Support
                </a>{' '}
                or email{' '}
                <a href="mailto:support@joindupe.com" className="font-semibold text-ink underline underline-offset-4">
                  support@joindupe.com
                </a>
                .
              </>
            }
          />
        </BlurFade>
        <BlurFade delay={0.1}>
          <div className="divide-y divide-line overflow-hidden rounded-[26px] bg-white">
            {QA.map((item) => (
              <details key={item.q} className="group px-6 sm:px-8 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[18px] font-semibold tracking-[-0.01em]">
                  {item.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="-mt-1 pb-6 text-[16px] leading-relaxed text-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

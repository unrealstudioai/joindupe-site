import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHead } from './chrome';

const POINTS = [
  {
    title: 'Your photos never train AI.',
    body: 'We do not use your photos, prompts or results to train AI models, and we never sell your data.',
    icon: <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />,
  },
  {
    title: 'Only you see your results.',
    body: 'There is no public feed. Your gallery is private to your account.',
    icon: (
      <>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      </>
    ),
  },
  {
    title: 'Delete anything, any time.',
    body: 'Remove a result, a character or your whole account from inside the app.',
    icon: (
      <>
        <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 12.5h9L17.5 7" />
      </>
    ),
  },
];

export function Private() {
  return (
    <section id="private" className="scroll-mt-16 bg-white py-24 sm:py-32" aria-labelledby="private-title">
      <div className="wrap">
        <BlurFade>
          <SectionHead
            eyebrow="Private by default"
            title={<span id="private-title">Your face. Your call.</span>}
            sub={
              <>
                Nothing is uploaded until you say yes, and you can change your mind in the app.{' '}
                <a href="/privacy/" className="font-semibold text-ink underline decoration-1 underline-offset-4 hover:decoration-2">
                  Read the Privacy Policy
                </a>
              </>
            }
          />
        </BlurFade>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {POINTS.map((p, k) => (
            <BlurFade key={p.title} delay={k * 0.08}>
              <div className="h-full rounded-[26px] bg-paper p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {p.icon}
                  </svg>
                </span>
                <h3 className="mt-8 text-[22px] leading-tight font-bold tracking-[-0.025em]">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-mute">{p.body}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

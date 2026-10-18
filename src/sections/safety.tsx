import { BlurFade } from '@/components/magicui/blur-fade';
import { SectionHead } from './chrome';

// Written for app-store and Google OAuth reviewers as much as for users: what Dupe is for, and
// what it refuses. Every claim here is backed by the app's code or the Terms (section 5 and 6).
const POINTS = [
  {
    title: 'Only you, or someone who said yes.',
    body: 'You can only make content of yourself, or of another adult who has clearly given you permission. You confirm this, and that you are 18 or over, every time you upload photos.',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.6 3.6-6 7-6s6.2 2.4 7 6" />
      </>
    ),
  },
  {
    title: 'No nudity. No sexual content.',
    body: 'Dupe does not allow nudity, sexual or intimate content of anyone. The AI models we use also run their own safety filters.',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="m6.5 6.5 11 11" />
      </>
    ),
  },
  {
    title: 'Never anyone under 18.',
    body: 'Photos of anyone under 18 are never allowed, even with a parent’s permission. A prompt asking for sexual content involving a minor suspends the account immediately.',
    icon: (
      <>
        <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
        <path d="M9 12h6" />
      </>
    ),
  },
  {
    title: 'Checked before anything is made.',
    body: 'Photos are checked automatically for nudity and other unsafe content before they can be used, and photos that fail are rejected and deleted. Typed prompts are checked before any credits are spent.',
    icon: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  },
  {
    title: 'No NCII. No deepfakes.',
    body: 'Dupe is not for making non-consensual intimate imagery (NCII) or deepfakes of other people. Requests like that are refused, and accounts that try can be suspended or closed.',
    icon: <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />,
  },
  {
    title: 'Report anything.',
    body: 'Every result has a report button in the app. Reports come straight to our team and are reviewed by a person.',
    icon: <path d="M6 21V4.5h10.5l-1.5 4 1.5 4H6" />,
  },
];

export function Safety() {
  return (
    <section id="safety" className="scroll-mt-16 bg-ink py-24 text-white sm:py-32" aria-labelledby="safety-title">
      <div className="wrap">
        <BlurFade>
          <SectionHead
            dark
            eyebrow="Safety"
            title={<span id="safety-title">Safe by design.</span>}
            sub="Dupe is for making content of yourself. It is not for making intimate images or deepfakes of anyone else, and it is built to refuse them."
          />
        </BlurFade>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, k) => (
            <BlurFade key={p.title} delay={(k % 3) * 0.08}>
              <div className="h-full rounded-[26px] bg-white/[0.06] p-8 ring-1 ring-white/10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {p.icon}
                  </svg>
                </span>
                <h3 className="mt-8 text-[22px] leading-tight font-bold tracking-[-0.025em]">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-white/65">{p.body}</p>
              </div>
            </BlurFade>
          ))}
        </div>
        <BlurFade delay={0.1}>
          <div className="mt-4 rounded-[26px] bg-white p-8 text-ink sm:p-10">
            <h3 className="text-[22px] leading-tight font-bold tracking-[-0.025em]">How Dupe uses Google</h3>
            <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-mute">
              Google services are used only for Sign in with Google and for Gemini, which checks photos and prompts for safety and helps write the instructions for each shot. Google services do not make the images or videos in Dupe, and are never used to create intimate imagery.{' '}
              <a href="/terms/" className="font-semibold text-ink underline decoration-1 underline-offset-4 hover:decoration-2">
                Read the Terms
              </a>{' '}
              ·{' '}
              <a href="/privacy/" className="font-semibold text-ink underline decoration-1 underline-offset-4 hover:decoration-2">
                Privacy Policy
              </a>
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

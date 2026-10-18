import { Wordmark } from '@/components/media';

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a href="/" className="brand" aria-label="Dupe home">
          <Wordmark />
        </a>
        <nav className="header-nav" aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#presets">Presets</a>
          <a href="#safety">Safety</a>
          <a href="#private">Privacy</a>
          <a href="#faq">FAQ</a>
        </nav>
        <span className="pill-soon">Coming soon</span>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <a href="/" aria-label="Dupe home">
            <Wordmark invert className="h-10" />
          </a>
          <p className="footer-tag">Every trend, starring you.</p>
        </div>
        <nav className="footer-links" aria-label="Legal">
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
          <a href="/support/">Support</a>
          <a href="mailto:support@joindupe.com">support@joindupe.com</a>
        </nav>
      </div>
      <div className="wrap footer-legal">
        <p>© 2026 David-Christian Green trading as Unreal Studio · Apartment 55, 2 Langley Walk, Birmingham, B15 2EN, United Kingdom</p>
      </div>
    </footer>
  );
}

export function SectionHead({ eyebrow, title, sub, center, dark }: { eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className={`mb-4 text-[13px] font-semibold tracking-[0.14em] uppercase ${dark ? 'text-white/55' : 'text-mute'}`}>{eyebrow}</p>}
      <h2 className={`text-[40px] leading-[0.98] font-bold tracking-[-0.04em] text-balance sm:text-[56px] lg:text-[68px] ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {sub && <p className={`mt-5 text-[18px] leading-relaxed text-pretty sm:text-[20px] ${dark ? 'text-white/65' : 'text-mute'} ${center ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>{sub}</p>}
    </div>
  );
}

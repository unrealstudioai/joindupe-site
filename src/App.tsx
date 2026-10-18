import { Header, Footer } from './sections/chrome';
import { Hero } from './sections/hero';
import { PresetMarquee } from './sections/marquee';
import { PhotoDump } from './sections/photo-dump';
import { HowItWorks } from './sections/how-it-works';
import { CameraRoll } from './sections/camera-roll';
import { YourIdea } from './sections/your-idea';
import { Private } from './sections/private';
import { Safety } from './sections/safety';
import { Faq } from './sections/faq';
import { FinalCta } from './sections/final-cta';

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Safety />
        <PresetMarquee />
        <PhotoDump />
        <HowItWorks />
        <CameraRoll />
        <YourIdea />
        <Private />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

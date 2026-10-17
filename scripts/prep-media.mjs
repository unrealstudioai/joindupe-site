// Copies and compresses the real app media used by the site into public/media.
// Needs ffmpeg on PATH. Sources are read-only: the app repo and the BRANDING DESIGN / Banners folders.
// Run: npm run media
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const app = join(root, '..', 'AI-Camera-Roll', 'assets');
const banners = join(root, '..', 'Banners');
const brand = join(root, '..', 'BRANDING DESIGN');
const out = join(root, 'public', 'media');
mkdirSync(out, { recursive: true });
mkdirSync(join(root, 'public', 'brand'), { recursive: true });

const ff = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
const webp = (src, dest, width = 600, q = 74) => {
  if (!existsSync(src)) throw new Error('missing ' + src);
  ff(['-i', src, '-vf', `scale='min(${width},iw)':-2`, '-c:v', 'libwebp', '-quality', String(q), '-compression_level', '6', join(out, dest)]);
};
const mp4 = (src, dest, width = 432) => {
  ff(['-i', src, '-an', '-vf', `scale='min(${width},iw)':-2,fps=24`, '-c:v', 'libx264', '-profile:v', 'main', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-t', '6', join(out, dest)]);
};

// Preset previews (bundled in the app's paywall)
const paywallPhotos = [
  'alpine-pass-pull-in', 'amalfi-lemon-terrace', 'balcony-lounger-recline', 'beach-console-night', 'bedroom-wall-selfie',
  'castle-at-dusk', 'driving-range-night', 'empty-street-morning', 'farmers-market-flowers', 'grand-portico-crossing',
  'hotel-valet-arrival', 'ibiza-beach-club-sunset', 'jungle-deck-lounger', 'kerbside-sports-car', 'locker-room-mirror',
  'loft-office-desk', 'nashville-honky-tonk', 'night-fuel-stop-supercar', 'paddock-fence-cowgirl', 'pale-stone-corner',
  'palm-path-run', 'plane-window-shade', 'poolside-steps', 'restaurant-table-turn', 'sagrada-familia-steps',
  'sunlit-terrace-coffee', 'sunset-marina-table', 'temple-roof-terrace', 'train-carriage-mirror', 'tulum-beach-laptop',
  'villa-hallway-mirror', 'yacht-bow-sit',
];
for (const n of paywallPhotos) webp(join(app, 'paywall', `${n}.jpg`), `p-${n}.webp`, 480);
const paywallVideos = ['beach-carnival-stall', 'bedroom-mirror-selfie', 'black-suv-shoreline', 'dumbbell-rack-mirror', 'festival-crowd', 'gilded-mirror-selfie', 'gym-mirror-bench'];
for (const n of paywallVideos) {
  const posterName = n === 'dumbbell-rack-mirror' ? 'dumbbell-rack-mirror-poster' : `${n}-poster`;
  webp(join(app, 'paywall', `${posterName}.jpg`), `v-${n}.webp`, 432);
  mp4(join(app, 'paywall', `${n}.mp4`), `v-${n}.mp4`);
}

// The four sample characters, their looks and their results (onboarding demo)
const demo = join(app, 'onboarding', 'demo', 'v2');
const people = ['camila', 'andre', 'leo', 'niamh'];
const stepLooks = { camila: 'amalfi-lemon-terrace', andre: 'como-boat-jetty', leo: 'night-showroom-lean', niamh: 'cinque-terre-harbour-wall' };
for (const p of people) {
  webp(join(demo, `char-${p}.jpg`), `char-${p}.webp`, 540);
  webp(join(demo, `look-${stepLooks[p]}.jpg`), `look-${stepLooks[p]}.webp`, 600);
  webp(join(demo, `${p}-${stepLooks[p]}.jpg`), `${p}-${stepLooks[p]}.webp`, 600);
}
const camilaPhotos = ['amalfi-lemon-terrace', 'cinque-terre-harbour-wall', 'clifftop-terrace-railing', 'como-boat-jetty', 'gilded-mirror-selfie', 'jet-cabin-recline', 'night-showroom-lean', 'pavement-coffee-table', 'scorpios-pool-daybed', 'ski-lift-chair', 'yacht-wake-cruise', 'airport-selfie-coffee'];
for (const n of camilaPhotos) webp(join(demo, `camila-${n}.jpg`), `camila-${n}.webp`, 600);
for (const n of ['airport-window-walk', 'black-suv-shoreline', 'bedroom-mirror-selfie']) {
  webp(join(demo, `camila-${n}.jpg`), `camila-${n}.webp`, 600);
  mp4(join(demo, `camila-${n}.mp4`), `camila-${n}.mp4`);
}
for (const p of ['andre', 'leo', 'niamh']) {
  for (const n of ['ski-lift-chair', 'yacht-wake-cruise', 'scorpios-pool-daybed']) webp(join(demo, `${p}-${n}.jpg`), `${p}-${n}.webp`, 600);
}

// A real carousel (owner's Create-menu banner): 8 slides
for (let i = 1; i <= 8; i++) webp(join(banners, 'carousel', `slide-${i}.jpg`), `carousel-${i}.webp`, 600);

// Brand pattern (white on black), a square crop, tiled as a background
ff(['-i', join(brand, 'Graphic Assets', 'Pattern - White on Black - 9x16.png'), '-vf', 'crop=2160:2160:0:840,scale=1100:-2', '-c:v', 'libwebp', '-quality', '80', join(root, 'public', 'brand', 'pattern-dark.webp')]);
ff(['-i', join(app, 'brand', 'pattern-fade-top-right.png'), '-c:v', 'libwebp', '-quality', '82', join(root, 'public', 'brand', 'pattern-light.webp')]);
copyFileSync(join(app, 'brand', 'dupe-wordmark.png'), join(root, 'public', 'brand', 'dupe-wordmark.png'));
copyFileSync(join(brand, 'Dupe - Wordmark.svg'), join(root, 'public', 'brand', 'dupe-wordmark.svg'));
copyFileSync(join(app, 'brand', 'dupe-icon.png'), join(root, 'public', 'favicon.png'));
ff(['-i', join(app, 'brand', 'app-icon-1024.png'), '-vf', 'scale=180:180', join(root, 'public', 'apple-touch-icon.png')]);
ff(['-i', join(app, 'brand', 'app-icon-1024.png'), '-vf', 'scale=512:512', join(root, 'public', 'brand', 'dupe-icon-512.png')]);
console.log('media ready');

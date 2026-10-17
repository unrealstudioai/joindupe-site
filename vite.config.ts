import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { marked } from 'marked';

const root = __dirname;
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

// Turns the legal Markdown into static HTML at build time, so /privacy, /terms and /support
// are plain pages that work without JavaScript. Shared header + footer come from partials/.
function legalPages(): Plugin {
  const docs: Record<string, string> = {
    privacy: 'content/privacy-policy.md',
    terms: 'content/terms-of-use.md',
    support: 'content/support.md',
  };
  const render = (key: string) => {
    let md = read(docs[key]).replace(/<!--[\s\S]*?-->/g, '');
    // The page header already shows the title; keep the first H1 as the page heading.
    let html = marked.parse(md, { async: false, gfm: true, breaks: false }) as string;
    // Wide tables scroll inside their own box on phones.
    html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
    // Internal links stay on this site.
    html = html.replace(/href="https:\/\/joindupe\.com\/(privacy|terms|support)"/g, 'href="/$1/"');
    html = html.replace(/href="https:\/\/joindupe\.com"/g, 'href="/"');
    // Headings get anchors.
    html = html.replace(/<h([23])>(.*?)<\/h\1>/g, (_m, level, text) => {
      const id = String(text).replace(/<[^>]+>/g, '').toLowerCase().replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h${level} id="${id}">${text}</h${level}>`;
    });
    return html;
  };
  return {
    name: 'dupe-legal-pages',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        let out = html
          .replace('<!--HEADER-->', read('partials/header.html'))
          .replace('<!--FOOTER-->', read('partials/footer.html'));
        const m = out.match(/<!--LEGAL:(\w+)-->/);
        if (m) out = out.replace(m[0], render(m[1]));
        void ctx;
        return out;
      },
    },
  };
}

export default defineConfig({
  plugins: [legalPages(), react(), tailwindcss()],
  resolve: { alias: { '@': resolve(root, 'src') } },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        privacy: resolve(root, 'privacy/index.html'),
        terms: resolve(root, 'terms/index.html'),
        support: resolve(root, 'support/index.html'),
        notfound: resolve(root, '404.html'),
      },
    },
  },
});

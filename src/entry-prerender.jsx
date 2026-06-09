import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App.jsx';

/**
 * Render a route to a complete HTML string at build time.
 * Uses react-dom/static's prerender, which waits for Suspense
 * (our lazy-loaded pages) to resolve instead of emitting fallbacks.
 */
export async function renderPage(url) {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}

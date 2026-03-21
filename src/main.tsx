import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Cursor glow que segue o mouse (desktop only)
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.getElementById('cursor-glow');
  let raf: number;

  document.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    });
  });

  document.addEventListener('mouseleave', () => {
    if (glow) glow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (glow) glow.style.opacity = '1';
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

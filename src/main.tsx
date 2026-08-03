import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SITE_CONFIG } from './content';

// הגדרת משתני CSS גלובליים לפי ההגדרות בקובץ site-config.ts
const theme = (SITE_CONFIG && SITE_CONFIG.theme) ? SITE_CONFIG.theme : {} as any;
const root = document.documentElement;
try {
  if (typeof theme.primaryColor === 'string') root.style.setProperty('--primary-color', theme.primaryColor);
  if (typeof theme.accentColor === 'string') root.style.setProperty('--accent-color', theme.accentColor);
  if (typeof theme.buttonTextColor === 'string') root.style.setProperty('--button-text-color', theme.buttonTextColor);
  if (typeof theme.pageBackground === 'string') root.style.setProperty('--page-background', theme.pageBackground);
  if (typeof theme.fontFamily === 'string') root.style.setProperty('--font-family', theme.fontFamily);

  // Helper: convert hex to r,g,b for rgba usage
  function hexToRgb(hex?: string) {
    if (!hex || typeof hex !== 'string') return '0,0,0';
    const h = hex.replace('#', '');
    const normalized = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return '0,0,0';
    const bigint = parseInt(normalized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  if (typeof theme.accentColor === 'string') root.style.setProperty('--accent-rgb', hexToRgb(theme.accentColor));
  if (typeof theme.primaryColor === 'string') root.style.setProperty('--primary-rgb', hexToRgb(theme.primaryColor));
  if (typeof theme.secondaryAccent === 'string') root.style.setProperty('--secondary-color', theme.secondaryAccent);
  if (typeof theme.secondaryAccent === 'string') root.style.setProperty('--secondary-rgb', hexToRgb(theme.secondaryAccent));

  // Fallback: set body background directly in case CSS var usage is ignored by the environment or cached CSS
  try {
    if (typeof theme.pageBackground === 'string' && theme.pageBackground.trim().length > 0) {
      document.body.style.background = theme.pageBackground;
    }
  } catch (e) {
    // ignore
  }

  // Debug info for easier verification in browser console
  try {
    console.info('Applied SITE_CONFIG.theme:', {
      primary: theme.primaryColor,
      accent: theme.accentColor,
      secondary: theme.secondaryAccent,
      pageBackground: theme.pageBackground
    });
  } catch (e) {}
} catch (e) {
  // אם משהו נכשל בהגדרת התמה — אל תעצור את ההרצה של האפליקציה
  console.warn('נכשל ההגדרת תמה אוטומטית:', e);
}

// Add a small debug banner to make current build/version visible on the page (temporary)
(function addDebugBanner(){
  try {
    const buildTag = 'commit: c4261ac';
    const banner = document.createElement('div');
    banner.id = 'debug-build-banner';
    banner.style.position = 'fixed';
    banner.style.zIndex = '9999';
    banner.style.right = '12px';
    banner.style.top = '12px';
    banner.style.background = 'linear-gradient(90deg, rgba(11,122,68,0.95), rgba(5,183,216,0.95))';
    banner.style.color = '#fff';
    banner.style.padding = '6px 10px';
    banner.style.borderRadius = '999px';
    banner.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)';
    banner.style.fontSize = '12px';
    banner.style.fontWeight = '700';
    banner.style.fontFamily = 'inherit';
    banner.style.pointerEvents = 'none';
    banner.textContent = buildTag + ' — theme:' + (window.getComputedStyle(document.documentElement).getPropertyValue('--page-background') || SITE_CONFIG.theme.pageBackground ? 'applied' : 'missing');
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(banner);
    });
  } catch (e) {
    // ignore
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

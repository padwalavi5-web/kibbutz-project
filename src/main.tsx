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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

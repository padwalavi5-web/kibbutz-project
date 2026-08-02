import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SITE_CONFIG } from './content';

// הגדרת משתני CSS גלובליים לפי ההגדרות בקובץ site-config.ts
const theme = SITE_CONFIG.theme || {} as any;
const root = document.documentElement;
if (theme.primaryColor) root.style.setProperty('--primary-color', theme.primaryColor);
if (theme.accentColor) root.style.setProperty('--accent-color', theme.accentColor);
if (theme.buttonTextColor) root.style.setProperty('--button-text-color', theme.buttonTextColor);
if (theme.pageBackground) root.style.setProperty('--page-background', theme.pageBackground);
if (theme.fontFamily) root.style.setProperty('--font-family', theme.fontFamily);

// Helper: convert hex to r,g,b for rgba usage
function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}
if (theme.accentColor) root.style.setProperty('--accent-rgb', hexToRgb(theme.accentColor));
if (theme.primaryColor) root.style.setProperty('--primary-rgb', hexToRgb(theme.primaryColor));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

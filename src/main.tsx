import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SITE_CONFIG } from './content';

const theme = (SITE_CONFIG && SITE_CONFIG.theme) ? SITE_CONFIG.theme : {} as any;
const root = document.documentElement;

try {
  const primaryColor = '#2c7a66';
  const accentColor = '#63c7a9';
  const secondaryColor = '#5fb7e8';
  const buttonTextColor = '#ffffff';
  const pageBackground = 'linear-gradient(180deg, #eaf8ff 0%, #e4f4ff 34%, #eefaf4 70%, #f8fcff 100%)';
  const fontFamily = "'Noto Sans Hebrew', 'Inter', sans-serif";

  const hexToRgb = (hex?: string) => {
    if (!hex || typeof hex !== 'string') return '0,0,0';
    const h = hex.replace('#', '');
    const normalized = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return '0,0,0';
    const bigint = parseInt(normalized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  root.style.setProperty('--primary-color', primaryColor);
  root.style.setProperty('--accent-color', accentColor);
  root.style.setProperty('--secondary-color', secondaryColor);
  root.style.setProperty('--button-text-color', buttonTextColor);
  root.style.setProperty('--page-background', pageBackground);
  root.style.setProperty('--font-family', fontFamily);
  root.style.setProperty('--primary-rgb', hexToRgb(primaryColor));
  root.style.setProperty('--accent-rgb', hexToRgb(accentColor));
  root.style.setProperty('--secondary-rgb', hexToRgb(secondaryColor));

  document.body.style.background = pageBackground;
  document.body.style.fontFamily = fontFamily;

  try {
    console.info('Applied SITE_CONFIG.theme:', {
      primary: theme.primaryColor,
      accent: theme.accentColor,
      secondary: theme.secondaryAccent,
      pageBackground: theme.pageBackground
    });
  } catch (e) {}
} catch (e) {
  console.warn('Failed to apply theme:', e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

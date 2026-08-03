const { chromium, devices } = require('playwright');
const fs = require('fs');

(async () => {
  const url = process.argv[2] || 'http://127.0.0.1:5000';
  const outDir = './.screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Opening', url);
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  // Mobile (iPhone 12)
  const iphone = devices['iPhone 12'];
  const contextMobile = await browser.newContext({ ...iphone });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto(url, { waitUntil: 'networkidle' });
  // Try to click the start button to go to gallery (if present)
  try {
    await pageMobile.locator('button:has-text("מעבר לדירוג התמונות")').click({ timeout: 2000 });
    await pageMobile.waitForLoadState('networkidle');
  } catch (e) {
    // ignore if not found
  }
  await pageMobile.screenshot({ path: `${outDir}/mobile.png`, fullPage: true });
  console.log('Saved', `${outDir}/mobile.png`);
  await contextMobile.close();

  // Desktop
  const contextDesktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const pageDesktop = await contextDesktop.newPage();
  await pageDesktop.goto(url, { waitUntil: 'networkidle' });
  try {
    await pageDesktop.locator('button:has-text("מעבר לדירוג התמונות")').click({ timeout: 2000 });
    await pageDesktop.waitForLoadState('networkidle');
  } catch (e) {}
  await pageDesktop.screenshot({ path: `${outDir}/desktop.png`, fullPage: true });
  console.log('Saved', `${outDir}/desktop.png`);
  await contextDesktop.close();

  await browser.close();
  console.log('Done.');
})();
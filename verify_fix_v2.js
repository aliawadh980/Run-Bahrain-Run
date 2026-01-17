const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to match game resolution
  await page.setViewportSize({ width: 1024, height: 768 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    console.log('Navigating to game...');
    await page.goto('http://localhost:8000');

    // Wait for the game to load and the menu to appear
    console.log('Waiting for #start-game button...');
    await page.waitForSelector('#start-game', { timeout: 10000 });

    // Take a screenshot of the menu
    await page.screenshot({ path: '/home/jules/verification/menu_fixed.png' });
    console.log('Screenshot saved to menu_fixed.png');

    const domContainer = await page.$('.phaser-dom-element');
    console.log('DOM Container found:', !!domContainer);

    // Try to click start game
    console.log('Clicking Start Game...');
    await page.click('#start-game');

    // Wait for level select scene
    console.log('Waiting for #level-select...');
    await page.waitForSelector('.glass-card', { timeout: 5000 });
    await page.screenshot({ path: '/home/jules/verification/level_select.png' });
    console.log('Screenshot saved to level_select.png');

  } catch (err) {
    console.error('Error during verification:', err);
    await page.screenshot({ path: '/home/jules/verification/error.png' });
  } finally {
    await browser.close();
  }
})();

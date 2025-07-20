const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=68',
  'https://sanand0.github.io/tdsdata/js_table/?seed=69',
  'https://sanand0.github.io/tdsdata/js_table/?seed=70',
  'https://sanand0.github.io/tdsdata/js_table/?seed=71',
  'https://sanand0.github.io/tdsdata/js_table/?seed=72',
  'https://sanand0.github.io/tdsdata/js_table/?seed=73',
  'https://sanand0.github.io/tdsdata/js_table/?seed=74',
  'https://sanand0.github.io/tdsdata/js_table/?seed=75',
  'https://sanand0.github.io/tdsdata/js_table/?seed=76',
  'https://sanand0.github.io/tdsdata/js_table/?seed=77',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let overallTotal = 0;
  for (const url of urls) {
    await page.goto(url);
    // Wait for tables to render (if needed)
    await page.waitForSelector('table', { timeout: 5000 });
    const tableValues = await page.$$eval('table', tables => {
      let numbers = [];
      for (const table of tables) {
        for (const row of table.rows) {
          for (const cell of row.cells) {
            // Remove commas, parse float if looks like number
            const n = parseFloat(cell.textContent.replace(/,/g, ''));
            if (!isNaN(n)) numbers.push(n);
          }
        }
      }
      return numbers;
    });
    overallTotal += tableValues.reduce((a, b) => a + b, 0);
  }
  await browser.close();
  console.log('Total sum across all tables:', overallTotal);
})();


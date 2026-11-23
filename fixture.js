const base = require('@playwright/test');

exports.test = base.test.extend({
  page: async ({ page }, use) => {
    await page.route('**/*', (route) => {
      const url = route.request().url();
      const blocked = [
        'googlesyndication',
        'doubleclick',
        'googleadservices',
        'google-analytics',
        'adservice',
        'pagead',
        'adsbygoogle',
      ];
      if (blocked.some((b) => url.includes(b))) return route.abort();
      return route.continue();
    });
    await use(page);
  },
});

exports.expect = base.expect;
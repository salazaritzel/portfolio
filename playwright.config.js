const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'file:///Users/itzelsd/Projects/portfolio',
    trace: 'retain-on-failure'
  },
  reporter: 'list'
});

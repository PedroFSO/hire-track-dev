const collect = {
  startServerCommand: 'npm run preview -- --port 4173',
  startServerReadyPattern: '4173',
  url: ['http://localhost:4173/login?redirect=/dashboard'],
  numberOfRuns: 1,
  settings: {
    preset: 'desktop',
    chromeFlags: '--no-sandbox --disable-dev-shm-usage',
  },
};

if (!process.env.CI) {
  collect.chromePath = require('playwright').chromium.executablePath();
}

module.exports = {
  ci: {
    collect,
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};

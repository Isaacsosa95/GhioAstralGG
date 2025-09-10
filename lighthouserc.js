module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --headless'
      }
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance assertions
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],
        
        // SEO assertions  
        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        
        // Best practices
        'uses-https': 'error',
        'is-on-https': 'error',
        'uses-http2': 'warn',
        
        // PWA assertions
        'installable-manifest': 'warn',
        'service-worker': 'warn',
        
        // Accessibility
        'color-contrast': 'warn',
        'image-alt': 'error',
        'aria-roles': 'error'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};

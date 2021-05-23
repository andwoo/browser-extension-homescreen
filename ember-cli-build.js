'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { join } = require('path');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    SRI: {
      enabled: false,
    },
    fingerprint: {
      enabled: false,
    },

    postcssOptions: {
      compile: {
        plugins: [
          { module: require('postcss-import') },
          require('tailwindcss')('./app/tailwind.config.js'),
          require('@fullhuman/postcss-purgecss')({
            content: [
              join(__dirname, 'app', 'index.html'),
              join(__dirname, 'app', 'templates', '**', '*.hbs'),
              join(__dirname, 'app', 'components', '**', '*.hbs'),
            ],
            defaultExtractor: (content) =>
              content.match(/[A-Za-z0-9-_:/]+/g) || [],
          }),
        ],
      },
    },
  });

  return app.toTree();
};

/* eslint-disable node/no-unpublished-require */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const crawl = require('prember-crawler');
const isProduction = EmberApp.env() === 'production';

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      // add extra paths here for components/controllers which include tailwind classes
      './app/index.html',
      './app/templates/**/*.hbs'
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        extension: 'scss',
        enabled: true,
        parser: require('postcss-scss'),
        plugins: [
          {
            module: require('@csstools/postcss-sass'),
            options: {
              includePaths: [
                // To pull up the styles from TailwindCSS and other tp packages
                'node_modules'
              ]
            }
          },
          require('postcss-import'),
          require('tailwindcss')('./config/tailwind.config.js'),
          ...isProduction ? [purgeCSS] : []
        ]
      }
    },
    prember: {
      urls: crawl
    },
    'asset-cache': {
      include: [
        'assets/**/*',
        'manifest.webmanifest'
      ]
    },
    'ember-service-worker': {
      registrationStrategy: 'inline',
      versionStrategy: 'project-revision'
    },
    'esw-cache-fallback': {
      patterns: [
        '/(.*)',
        'https://chennaiemberjs.in/(.*)'
      ],
    }
  });
  return app.toTree();
};

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true,
  objectNotation: true,
  useCookie: false,
  updateFiles: true,
  indent: '  ',
});

/* eslint-disable no-underscore-dangle, no-param-reassign */
module.exports = (app) => {
  app.use((req, res, next) => {
    res.locals.__ = () =>
      function (...args) {
        return i18n.__.apply(req, args);
      };
    next();
  });
};

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('./../logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('getconfig');
const Replay = require('replay');
const i18n = require('./middleware/i18n');

const indexController = require('./controllers/index-controller');
const GliderRiderController = require('./controllers/glider-rider-controller');
const ExportController = require('./controllers/export-controller');

Replay.mode = process.env.REPLAY || config.REPLAY;

const app = express();
i18n(app);

// view engine setup
const cons = require('consolidate');

app.engine('mustache', cons.hogan);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// run the whole application in a directory
const basePath = app.locals.basePath = process.env.BASE_PATH || config.BASE_PATH;
const assetPath = `${basePath}/`;
const googleTagManagerId = process.env.GOOGLE_TAG_MANAGER_ID || config.GOOGLE_TAG_MANAGER_ID;
const backgroundStyle = process.env.BACKGROUND || config.BACKGROUND;
const displayServerDetails = process.env.DISPLAY_SERVERNAME || config.DISPLAY_SERVERNAME;
const banner = process.env.BANNER || config.BANNER;

app.locals.mcServerPath = process.env.MC_SERVER_PATH || config.MC_SERVER_PATH;
app.locals.exportPath = process.env.EXPORT_PATH || config.EXPORT_PATH;

// Middleware to set default layouts.
// This must be done per request (and not via app.locals) as the Consolidate.js
// renderer mutates locals.partials :(
app.use((req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  Object.assign(res.locals, {
    assetPath,
    basePath,
    googleTagManagerId,
    backgroundStyle,
    displayServerDetails,
    banner,
    partials: {
      layout: 'layouts/main',
      googleTagManager: 'partials/google-tag-manager',
      advancementTable: 'partials/advancement-table',
      gliderRiderDetail: 'partials/glider-rider-detail',
    },
  });
  next();
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'assets', 'images', 'favicon.ico')));

// Configure logging
app.use(logger.init(app.get('env')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(assetPath, express.static(path.join(__dirname, '..', 'dist', 'public')));

app.use(`${basePath}/`, indexController);
app.use(`${basePath}/leaderboard`, indexController);
app.use(`${basePath}/glider-rider`, GliderRiderController);
app.use(`${basePath}/export`, ExportController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;

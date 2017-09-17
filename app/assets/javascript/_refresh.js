const $ = require('jquery');

function reload() {
  $('#stats').load(`${location.href}stats`, ''); // eslint-disable-line
  $('#flight-track-detail').load(`${location.href}?refresh=true`, ''); // eslint-disable-line
}

setInterval(reload, 5000);

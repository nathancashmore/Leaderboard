const $ = require('jquery');

function reload() {
  $('#stats').load(`${location.href}stats`, ''); // eslint-disable-line
  $('#glider-rider-detail').load(`${location.href}?refresh=true`, ''); // eslint-disable-line
}

setInterval(reload, 5000);

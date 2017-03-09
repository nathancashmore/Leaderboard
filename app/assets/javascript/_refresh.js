const $ = require('jquery');

function reload() {
  $('#stats').load(`${location.href}stats`, ''); // eslint-disable-line
}

setInterval(reload, 5000);

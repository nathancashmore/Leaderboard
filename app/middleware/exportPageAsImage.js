/* eslint-disable */
const system = require('system');

console.log('Url: ' + system.args[1]);
console.log('Output: ' + system.args[2]);

const page = require('webpage').create();
page.viewportSize = { width: 128 * 10, height: 128 * 10 };

page.open(system.args[1], function() {
  page.render(system.args[2]);
  phantom.exit();
});

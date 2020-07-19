/* eslint-disable */
const system = require('system');

console.log('Script: ' + system.args[0]);
console.log('Url: ' + system.args[1]);
console.log('Output: ' + system.args[2]);

const page = require('webpage').create();

page.open(system.args[1], function() {
  page.render(system.args[2]);
  phantom.exit();
});

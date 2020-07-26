/* eslint-disable */
const system = require('system');

console.log('Url: ' + system.args[1]);
console.log('Output: ' + system.args[2]);

const width = 128 * 10;
const height = 128 * 15;

const page = require('webpage').create();
page.viewportSize = { width: width, height: height };

page.open(system.args[1], function() {
  page.evaluate(function(w, h) {
    document.body.style.width = w + "px";
    document.body.style.height = h + "px";
  }, width, height);

  page.clipRect = {top: 0, left: 0, width: width, height: height};
  page.render(system.args[2]);
  phantom.exit();
});

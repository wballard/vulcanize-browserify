/*
 * Browserify processing, simple detection based on filename, resulting in
 * fully processed javascript ready to inline.
 */
"use strict";

var path = require('path');
var browserify = require('browserify');

module.exports = function(filename, content, callback) {
  var extensions = ['.js', '.coffee', '.litcoffee'];
  var skip = ['platform.js', 'polymer.js'];
  if (skip.indexOf(path.basename(filename)) > -1) {
    callback(undefined, filename, content);
  } else if (extensions.indexOf(path.extname(filename)) > -1) {
    var b = browserify();
    b.add(filename);
    b.transform('coffeeify', {debug: true});
    b.bundle({}, function(e, src){
      if (e) {
        callback(e, filename, content);
      } else {
        callback(undefined, filename, src);
      }
    });
  } else {
    callback(undefined, filename, content);
  }
}

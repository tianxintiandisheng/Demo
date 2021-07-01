'use strict';

var foo = 'hello rollup !';

var version = "1.0.0";

// src/main.js
function main () {
  console.log('foo:'+foo);
  console.log('version:'+version);
}

module.exports = main;

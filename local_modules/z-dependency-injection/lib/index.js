'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cached = require('./cached');

Object.defineProperty(exports, 'cached', {
  enumerable: true,
  get: function get() {
    return _cached.cached;
  }
});

var _inject = require('./inject');

Object.defineProperty(exports, 'inject', {
  enumerable: true,
  get: function get() {
    return _inject.inject;
  }
});
Object.defineProperty(exports, '_', {
  enumerable: true,
  get: function get() {
    return _inject._;
  }
});
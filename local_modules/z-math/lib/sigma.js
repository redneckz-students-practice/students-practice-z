"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sigma = exports.sigma = function sigma(x) {
  return x > 0 ? x : 0;
};

sigma.neg = function (x) {
  return x < 0 ? x : 0;
};
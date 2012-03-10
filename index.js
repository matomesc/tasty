var _ = require('underscore');
var request = require('request');

//
// public api
//
exports.test = function (host) {
  return new Suite({ host: host });
}

//
// suite constructor.
// a suite handles testing a given host.
//
function Suite(options) {
  this.queue = [];
  this.host = options.host || 'localhost';
}

// extend suite proto with testing functions
var verbs = ['get', 'post', 'put', 'delete', 'head'];
verbs.forEach(function (v) {
  Suite.prototype[v] = function (resource) {
    var self = this;
    // return an object with expect bound to `self.expect`
    return { expect: self.expect.bind(self) };
  }
});

_.extend(Suite.prototype, {
  expect: function () {
    return this;
  }
});
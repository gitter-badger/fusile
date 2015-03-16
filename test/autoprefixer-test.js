'use strict';

var fusile = require('../lib/');
var unmount = require('../lib/unmount');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var async = require('async');
var expect = require('unexpected');

var src = 'fixtures/source';
var compiled = 'fixtures/compiled';
var mnt = 'test/AUTOPREFIXER';

describe('Autoprefixer', function () {
  before(function (done) {
    unmount(mnt, function () {
      mkdirp(mnt, function (err) {
        if (err) {
          console.error(err);
          process.exit(-1);
        }

        fusile(src, mnt, {
          browsers: ['last 500 versions']
        });

        setTimeout(done, 300);
      });
    });
  });

  after(function (done) {
    setTimeout(function () {
      unmount(mnt, function () {
        rimraf(mnt, done);
      });
    }, 500);
  });

  it('should prefix autoprefixer/unprefixed.css', function (done) {
    var actual = path.join(mnt, 'autoprefixer/unprefixed.css');
    var expected = path.join(compiled, 'autoprefixer/unprefixed.css');

    async.parallel([
      fs.readFile.bind(undefined, actual, 'utf-8'),
      fs.readFile.bind(undefined, expected, 'utf-8')
    ], function (err, results) {
      expect(err, 'to be undefined');
      expect(results[0], 'to be', results[1]);

      done();
    });
  });

  it('should prefix autoprefixer/unprefixed-scss.scss', function (done) {
    var actual = path.join(mnt, 'autoprefixer/unprefixed-scss.css');
    var expected = path.join(compiled, 'autoprefixer/unprefixed-scss.css');

    async.parallel([
      fs.readFile.bind(undefined, actual, 'utf-8'),
      fs.readFile.bind(undefined, expected, 'utf-8')
    ], function (err, results) {
      expect(err, 'to be undefined');
      expect(results[0], 'to be', results[1]);

      done();
    });
  });

  it('should prefix autoprefixer/unprefixed-less.less', function (done) {
    var actual = path.join(mnt, 'autoprefixer/unprefixed-less.css');
    var expected = path.join(compiled, 'autoprefixer/unprefixed-less.css');

    async.parallel([
      fs.readFile.bind(undefined, actual, 'utf-8'),
      fs.readFile.bind(undefined, expected, 'utf-8')
    ], function (err, results) {
      expect(err, 'to be undefined');
      expect(results[0], 'to be', results[1]);

      done();
    });
  });

  it('should prefix autoprefixer/unprefixed.myth', function (done) {
    var actual = path.join(mnt, 'autoprefixer/unprefixed-myth.css');
    var expected = path.join(compiled, 'autoprefixer/unprefixed-myth.css');

    async.parallel([
      fs.readFile.bind(undefined, actual, 'utf-8'),
      fs.readFile.bind(undefined, expected, 'utf-8')
    ], function (err, results) {
      expect(err, 'to be undefined');
      expect(results[0], 'to be', results[1].replace(/\n$/, ''));

      done();
    });
  });

  it('should prefix autoprefixer/unprefixed.styl', function (done) {
    var actual = path.join(mnt, 'autoprefixer/unprefixed-styl.css');
    var expected = path.join(compiled, 'autoprefixer/unprefixed-styl.css');

    async.parallel([
      fs.readFile.bind(undefined, actual, 'utf-8'),
      fs.readFile.bind(undefined, expected, 'utf-8')
    ], function (err, results) {
      expect(err, 'to be undefined');
      expect(results[0], 'to be', results[1]);

      done();
    });
  });
});

// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Wed, 01 Feb 2017 14:56:33 GMT
'use strict';
var path = require('path');
var expect = require('expect');
var Promise = require('bluebird');
var queue = require('../lib/queue');
var fs = require('fs');
var fsStat = Promise.promisify(require('fs').stat);
var f1 = function(ended,callback) {
    // Loose time in same way
    fs.stat(path.join(__dirname, 'dummy.txt')
    , function() {
        ended.f1 = true;
        callback();
    });
};
var f2 = function(ended,callback) {
    var f1ended = ended.f1;
    ended.f2 = true;
    callback(f1ended);
};
describe("enqueuing two async functions, f1 and f2 using queue", function() {
    var q = new queue();
    it("should execute f2 after f1 even if f1 waits for a file system access", function(done) {
        var ended = {
            f1: false
        };
        q.add(f1, undefined, function() {
            done();
        }, ended);
        q.add(f2, undefined, function(f1ended) {
            expect(f1ended).toBe(true);
        }, ended);
    });
});
describe("enqueuing two async functions, f1 and f2 without using queue", function() {
    it("without using queue f1 starts before f2 finishes", function(done) {
        var ended = {
            f1: false
        };
        f1(ended, function() {
            done();
        });
        f2(ended, function(f1ended) {
            expect(f1ended).toBe(false);
        });
    });
});

/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\tests\util\glob.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var glob = require('../../lib/glob');
var vfile = require('../../lib/fs/vfile');
var file = vfile();

describe("glob", function() {
    it("should glob a folder", function(done) {
        file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_1.ittf'), 'globbed 1');
        file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_2.ittf'), 'globbed 2');
        file.write(path.join(__dirname, 'ittf', 'globs2', 'one', 'globbed_2_one.ittf'), 'globbed 2 one');
        glob(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), file, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be(3);
            done();
        });
    });
    it("should sync glob a folder", function() {
        var result = glob(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), file, {
            sync: true
        });
        expect(result).to.be.an('array');
        expect(result.length).to.be(3);
    });
});

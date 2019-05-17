/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\tests\ittftree\asisloader.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var asIsLoader = require('../../lib/ittfTree/asIsLoader');

describe("asIsLoader", function() {
    it("should load an ittf tree as is", function(done) {
        asIsLoader(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {}, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log? result
            expect(result).to.be.an('object');
            done();
        });
    });
});

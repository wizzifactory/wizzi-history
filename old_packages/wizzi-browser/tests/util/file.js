/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\tests\util\file.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var file = require('../../lib/fs/file');

describe("file", function() {
    it("should split a text into lines", function() {
        var text = 'alfa\nbeta\n\ngamma\n\rtheta\r\nyota\r\rsigma';
        var lines = file.splitLines(text);
        expect(lines[0]).to.be.a('string');
        expect(lines[0]).to.be('alfa');
        expect(lines[1]).to.be.a('string');
        expect(lines[1]).to.be('beta');
        expect(lines[3]).to.be.a('string');
        expect(lines[3]).to.be('gamma');
        expect(lines[4]).to.be.a('string');
        expect(lines[4]).to.be('theta');
        expect(lines[5]).to.be.a('string');
        expect(lines[5]).to.be('yota');
        expect(lines[7]).to.be.a('string');
        expect(lines[7]).to.be('sigma');
    });
    it("should split a text into lines", function() {
        var lines = file.readLines(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        console.log('file lines', lines);
        expect(lines[0]).to.be.a('string');
        expect(lines[0]).to.be('first one');
        expect(lines[1]).to.be.a('string');
        expect(lines[1]).to.be('second one');
    });
});

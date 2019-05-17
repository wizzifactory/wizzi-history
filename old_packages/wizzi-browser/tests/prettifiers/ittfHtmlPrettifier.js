/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\tests\prettifiers\ittfhtmlprettifier.js.ittf
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
var ittfMTreeEx = require('../../lib/ittfTree/ittfMTreeEx');
var ittfHtmlPrettifier = require('../../lib/prettifiers/ittfHtmlPrettifier');

describe("asIsLoader", function() {
    it("should load an ittf tree as is and prettify it", function(done) {
        ittfMTreeEx.createFrom(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {}, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log? result
            expect(result).to.be.an('object');
            var html_lines = ittfHtmlPrettifier(result, {});
            // log 'html_lines', html_lines
            expect(html_lines).to.be.an('object');
            expect(html_lines.prettyLines).to.be.an('array');
            expect(html_lines.prettyLines.length).to.be(1);
            file.write(path.join(__dirname, 'outputs', 'basic.tests.pretty.html'), html_lines.prettyLines.join('\n'));
            done();
        });
    });
    it("should load an ittf tree (by filepath ) as is and prettify it", function(done) {
        var html_lines = ittfHtmlPrettifier(path.join(__dirname, 'ittf', 'basic.tests.ittf'), {});
        // log 'html_lines', html_lines
        expect(html_lines).to.be.an('object');
        expect(html_lines.prettyLines).to.be.an('array');
        expect(html_lines.prettyLines.length).to.be(1);
        file.write(path.join(__dirname, 'outputs', 'basic.tests.prettybyfile.html'), html_lines.prettyLines.join('\n'));
        done();
    });
});

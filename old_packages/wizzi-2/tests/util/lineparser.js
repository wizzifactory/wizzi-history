/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\util\lineparser.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var expect = require('expect.js');
var lineParser = require('../../lib/util/lineparser');
var parsed;
describe("lineParser", function() {
    it("should extract name and value", function() {
        parsed = lineParser.parseNameValueRaw('name value');
        expect(parsed.name()).to.be('name');
        expect(parsed.value()).to.be('value');
        parsed = lineParser.parseNameValueRaw('name my value is great');
        expect(parsed.name()).to.be('name');
        expect(parsed.value()).to.be('my value is great');
        parsed = lineParser.parseNameValueRaw('  name   my value is great');
        expect(parsed.name()).to.be('name');
        expect(parsed.value()).to.be('  my value is great');
    });
    it("should extract category name and value", function() {
        parsed = lineParser.parseCategoryNameValue('category name value');
        expect(parsed.category()).to.be('category');
        expect(parsed.name()).to.be('name');
        expect(parsed.value()).to.be('value');
        parsed = lineParser.parseCategoryNameValue('category name my value is great');
        expect(parsed.category()).to.be('category');
        expect(parsed.name()).to.be('name');
        expect(parsed.value()).to.be('my value is great');
        parsed = lineParser.parseCategoryNameValue('  category  name   "my value is great"');
        expect(parsed.category()).to.be('category');
        expect(parsed.name()).to.be('name');
        expect(parsed.value()).to.be('  "my value is great"');
    });
});

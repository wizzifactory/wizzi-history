/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\lexer.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var lexer = require('../../lib/ittf/lexer');
var file = require('../../lib/util/file');
describe("the lexer loads the text content into lines", function() {
    it("lines should have : an indent, row and col number, name and value", function() {
        var lines = lexer(file.read(path.join(__dirname, 'repo', 'data', 'lexer_1.tests.ittf')
        )
        , {
            sourceKey: 'f1'
        })
        ;
        console.log('lexer lines', lines);
        expect(lines).to.be.an('array');
        expect(lines.length).to.be(7);
        expect(lines[0].indent).to.be.a('number');
        expect(lines[0].indent).to.be(0);
        expect(lines[0].row).to.be.a('number');
        expect(lines[0].row).to.be(1);
        expect(lines[0].col).to.be.a('number');
        expect(lines[0].col).to.be(1);
        expect(lines[0].sourceKey).to.be.a('string');
        expect(lines[0].sourceKey).to.be('f1');
        expect(lines[0].name).to.be.a('string');
        expect(lines[0].name).to.be('alpha');
        expect(lines[0].value).to.be(undefined);
        expect(lines[1].indent).to.be.a('number');
        expect(lines[1].indent).to.be(1);
        expect(lines[1].row).to.be.a('number');
        expect(lines[1].row).to.be(2);
        expect(lines[1].col).to.be.a('number');
        expect(lines[1].col).to.be(18);
        expect(lines[1].sourceKey).to.be.a('string');
        expect(lines[1].sourceKey).to.be('f1');
        expect(lines[1].name).to.be.a('string');
        expect(lines[1].name).to.be('beta');
        expect(lines[1].value).to.be.a('string');
        expect(lines[1].value).to.be('1');
        expect(lines[2].indent).to.be.a('number');
        expect(lines[2].indent).to.be(1);
        expect(lines[2].row).to.be.a('number');
        expect(lines[2].row).to.be(3);
        expect(lines[2].col).to.be.a('number');
        expect(lines[2].col).to.be(5);
        expect(lines[2].sourceKey).to.be.a('string');
        expect(lines[2].sourceKey).to.be('f1');
        expect(lines[2].name).to.be.a('string');
        expect(lines[2].name).to.be('beta');
        expect(lines[2].value).to.be.a('string');
        expect(lines[2].value).to.be('2');
        expect(lines[4].indent).to.be.a('number');
        expect(lines[4].indent).to.be(1);
        expect(lines[4].row).to.be.a('number');
        expect(lines[4].row).to.be(10);
        expect(lines[4].col).to.be.a('number');
        expect(lines[4].col).to.be(5);
        expect(lines[4].sourceKey).to.be.a('string');
        expect(lines[4].sourceKey).to.be('f1');
        expect(lines[4].name).to.be.a('string');
        expect(lines[4].name).to.be('<');
        expect(lines[4].value).to.be.a('string');
        expect(lines[4].value).to.be('body');
    });
});

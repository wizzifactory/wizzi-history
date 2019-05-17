/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\parser.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var lexer = require('../../lib/ittf/lexer');
var parser = require('../../lib/ittf/parser');
var IttfModel = require('../../lib/ittf/ittfModel').IttfModel;
var LoadContext = require('../../lib/ittf/loadContext').loadContext;
var file = require('../../lib/util/file');
var loadContext = new LoadContext();
describe("parses source lines into nodes matching the tree structure of the ittf source.", function() {
    it("nodes should have : row and col number, name and value", function() {
        var uri = path.join(__dirname, 'repo', 'data', 'lexer_1.tests.ittf')
        ;
        var ittfModel = new IttfModel(uri, loadContext);
        var lines = lexer(file.read(uri)
        , {
            sourceKey: 'f1'
        })
        ;
        var nodes = parser(lines, ittfModel);
        console.log('parser nodes', nodes);
        expect(nodes).to.be.an('array');
        expect(nodes.length).to.be(1);
        expect(nodes[0].childs).to.be.an('array');
        expect(nodes[0].childs.length).to.be(3);
        expect(nodes[0].childs[1].childs).to.be.an('array');
        expect(nodes[0].childs[1].childs.length).to.be(1);
        expect(nodes[0].row).to.be.a('number');
        expect(nodes[0].row).to.be(1);
        expect(nodes[0].col).to.be.a('number');
        expect(nodes[0].col).to.be(1);
        expect(nodes[0].sourceKey).to.be.a('string');
        expect(nodes[0].sourceKey).to.be('f1');
        expect(nodes[0].name).to.be.a('string');
        expect(nodes[0].name).to.be('alpha');
        expect(nodes[0].value).to.be(undefined);
        expect(nodes[0].childs[0].row).to.be.a('number');
        expect(nodes[0].childs[0].row).to.be(2);
        expect(nodes[0].childs[0].col).to.be.a('number');
        expect(nodes[0].childs[0].col).to.be(18);
        expect(nodes[0].childs[0].sourceKey).to.be.a('string');
        expect(nodes[0].childs[0].sourceKey).to.be('f1');
        expect(nodes[0].childs[0].name).to.be.a('string');
        expect(nodes[0].childs[0].name).to.be('beta');
        expect(nodes[0].childs[0].value).to.be.a('string');
        expect(nodes[0].childs[0].value).to.be('1');
        expect(nodes[0].childs[1].row).to.be.a('number');
        expect(nodes[0].childs[1].row).to.be(3);
        expect(nodes[0].childs[1].col).to.be.a('number');
        expect(nodes[0].childs[1].col).to.be(5);
        expect(nodes[0].childs[1].sourceKey).to.be.a('string');
        expect(nodes[0].childs[1].sourceKey).to.be('f1');
        expect(nodes[0].childs[1].name).to.be.a('string');
        expect(nodes[0].childs[1].name).to.be('beta');
        expect(nodes[0].childs[1].value).to.be.a('string');
        expect(nodes[0].childs[1].value).to.be('2');
        expect(nodes[0].childs[1].childs[0].row).to.be.a('number');
        expect(nodes[0].childs[1].childs[0].row).to.be(4);
        expect(nodes[0].childs[1].childs[0].col).to.be.a('number');
        expect(nodes[0].childs[1].childs[0].col).to.be(9);
        expect(nodes[0].childs[1].childs[0].sourceKey).to.be.a('string');
        expect(nodes[0].childs[1].childs[0].sourceKey).to.be('f1');
        expect(nodes[0].childs[1].childs[0].name).to.be.a('string');
        expect(nodes[0].childs[1].childs[0].name).to.be('gamma');
        expect(nodes[0].childs[1].childs[0].value).to.be.a('string');
        expect(nodes[0].childs[1].childs[0].value).to.be('2.1');
        expect(nodes[0].childs[2].childs[0].row).to.be.a('number');
        expect(nodes[0].childs[2].childs[0].row).to.be(11);
        expect(nodes[0].childs[2].childs[0].col).to.be.a('number');
        expect(nodes[0].childs[2].childs[0].col).to.be(9);
        expect(nodes[0].childs[2].childs[0].sourceKey).to.be.a('string');
        expect(nodes[0].childs[2].childs[0].sourceKey).to.be('f1');
        expect(nodes[0].childs[2].childs[0].name).to.be.a('string');
        expect(nodes[0].childs[2].childs[0].name).to.be('margin');
        expect(nodes[0].childs[2].childs[0].value).to.be.a('string');
        expect(nodes[0].childs[2].childs[0].value).to.be('0');
    });
});

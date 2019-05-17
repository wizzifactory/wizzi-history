/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\nodifier.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var liner = require('../../lib/loader/liner');
var nodifier = require('../../lib/loader/nodifier');
var MTreeBrick = require('../../lib/loader/mTreeBrick').MTreeBrick;
var LoadHistory = require('../../lib/loader/loadHistory').LoadHistory;
var file = require('wizzi-utils').file;

describe("nodifier", function() {
    var loadHistory = new LoadHistory();
    it("nodes should have : row and col number, name and value", function() {
        var uri = path.join(__dirname, 'repo', 'data', 'liner_1.tests.ittf');
        var mTree = new MTreeBrick(uri, loadHistory);
        var lines = liner(file.read(uri), {
            sourceKey: 'f1'
        });
        var nodes = nodifier(lines, mTree);
        // log 'nodifier nodes', nodes
        expect(nodes).to.be.an('array');
        expect(nodes.length).to.be(1);
        expect(nodes[0].children).to.be.an('array');
        expect(nodes[0].children.length).to.be(3);
        expect(nodes[0].children[1].children).to.be.an('array');
        expect(nodes[0].children[1].children.length).to.be(1);
        expect(nodes[0].row).to.be.a('number');
        expect(nodes[0].row).to.be(1);
        expect(nodes[0].col).to.be.a('number');
        expect(nodes[0].col).to.be(1);
        expect(nodes[0].sourceKey).to.be.a('string');
        expect(nodes[0].sourceKey).to.be('f1');
        expect(nodes[0].name).to.be.a('string');
        expect(nodes[0].name).to.be('alpha');
        expect(nodes[0].value).to.be(undefined);
        expect(nodes[0].children[0].row).to.be.a('number');
        expect(nodes[0].children[0].row).to.be(2);
        expect(nodes[0].children[0].col).to.be.a('number');
        expect(nodes[0].children[0].col).to.be(18);
        expect(nodes[0].children[0].sourceKey).to.be.a('string');
        expect(nodes[0].children[0].sourceKey).to.be('f1');
        expect(nodes[0].children[0].name).to.be.a('string');
        expect(nodes[0].children[0].name).to.be('beta');
        expect(nodes[0].children[0].value).to.be.a('string');
        expect(nodes[0].children[0].value).to.be('1');
        expect(nodes[0].children[1].row).to.be.a('number');
        expect(nodes[0].children[1].row).to.be(3);
        expect(nodes[0].children[1].col).to.be.a('number');
        expect(nodes[0].children[1].col).to.be(5);
        expect(nodes[0].children[1].sourceKey).to.be.a('string');
        expect(nodes[0].children[1].sourceKey).to.be('f1');
        expect(nodes[0].children[1].name).to.be.a('string');
        expect(nodes[0].children[1].name).to.be('beta');
        expect(nodes[0].children[1].value).to.be.a('string');
        expect(nodes[0].children[1].value).to.be('2');
        expect(nodes[0].children[1].children[0].row).to.be.a('number');
        expect(nodes[0].children[1].children[0].row).to.be(4);
        expect(nodes[0].children[1].children[0].col).to.be.a('number');
        expect(nodes[0].children[1].children[0].col).to.be(9);
        expect(nodes[0].children[1].children[0].sourceKey).to.be.a('string');
        expect(nodes[0].children[1].children[0].sourceKey).to.be('f1');
        expect(nodes[0].children[1].children[0].name).to.be.a('string');
        expect(nodes[0].children[1].children[0].name).to.be('gamma');
        expect(nodes[0].children[1].children[0].value).to.be.a('string');
        expect(nodes[0].children[1].children[0].value).to.be('2.1');
        expect(nodes[0].children[2].children[0].row).to.be.a('number');
        expect(nodes[0].children[2].children[0].row).to.be(11);
        expect(nodes[0].children[2].children[0].col).to.be.a('number');
        expect(nodes[0].children[2].children[0].col).to.be(9);
        expect(nodes[0].children[2].children[0].sourceKey).to.be.a('string');
        expect(nodes[0].children[2].children[0].sourceKey).to.be('f1');
        expect(nodes[0].children[2].children[0].name).to.be.a('string');
        expect(nodes[0].children[2].children[0].name).to.be('margin');
        expect(nodes[0].children[2].children[0].value).to.be.a('string');
        expect(nodes[0].children[2].children[0].value).to.be('0');
    });
});

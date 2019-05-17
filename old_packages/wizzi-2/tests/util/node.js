/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\util\node.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var path = require('path');
var expect = require('expect.js');
var node = require('../../lib/util/node');
function createRoot(name,value) {
    return {
            name: name, 
            value: value, 
            parent: null, 
            childs: []
        };
}

function addNode(parent,name,value) {
    var node = {
        name: name, 
        value: value, 
        parent: parent, 
        childs: []
    };
    parent.childs.push(node);
    return node;
}

var nodeRoot = createRoot('root', 'root value');
var n1 = addNode(nodeRoot, 'n1', 'n1 value');
var n1a = addNode(n1, 'n1a', 'n1a value');
var n1a1 = addNode(n1a, 'n1a1', 'n1a1 value');
var n1a2 = addNode(n1a, 'n1a2', 'n1a2 value');
var n1a3 = addNode(n1a, 'n1a3', 'n1a3 value');
var n1b = addNode(n1, 'n1b', 'n1b value');
var n1b1 = addNode(n1b, 'n1b1', 'n1b1 value');
var n1b2 = addNode(n1b, 'n1b2', 'n1b2 value');
var n1b3 = addNode(n1b, 'n1b3', 'n1b3 value');
var n1c = addNode(n1, 'n1c', 'n1c value');
var n1c1 = addNode(n1c, 'n1c1', 'n1c1 value');
var n1c2 = addNode(n1c, 'n1c2', 'n1c2 value');
var n1c3 = addNode(n1c, 'n1c3', 'n1c3 value');
var n2 = addNode(nodeRoot, 'n2', 'n2 value');
var n2a = addNode(n2, 'n2a', 'n2a value');
var n2a1 = addNode(n2a, 'n2a1', 'n2a1 value');
var n2a2 = addNode(n2a, 'n2a2', 'n2a2 value');
var n2a3 = addNode(n2a, 'n2a3', 'n2a3 value');
var n2b = addNode(n2, 'n2b', 'n2b value');
var n2c = addNode(n2, 'n2c', 'n2c value');
var n2c1 = addNode(n2c, 'n2c1', 'n2c1 value');
var n2c2 = addNode(n2c, 'n2c2', 'n2c2 value');
var n2c3 = addNode(n2c, 'n2c3', 'n2c3 value');
var n3 = addNode(nodeRoot, 'n3', 'n3 value');
var n3a = addNode(n3, 'n3a', 'n3a value');
var n3b = addNode(n3, 'n3b', 'n3b value');
var n3c = addNode(n3, 'n3c', 'n3c value');
describe("node find utility", function() {
    it("should find an findIttfCommand", function() {
        addNode(n1a, '$kaki', 'hello');
        var item = node.findIttfCommand(nodeRoot, 'hello', 'kaki')
        ;
        expect(item).to.be.an('object');
        expect(item.name).to.be.a('string');
        expect(item.name).to.be('$kaki');
        expect(item.parent).to.be.an('object');
        expect(item.parent.name).to.be.a('string');
        expect(item.parent.name).to.be('n1a');
    });
    it("should find a $hook command", function() {
        addNode(n2, '$hook', 'bye');
        var item = node.findHookExt(n2a3, 'bye')
        ;
        expect(item).to.be.an('object');
        expect(item.name).to.be.a('string');
        expect(item.name).to.be('$hook');
        expect(item.parent).to.be.an('object');
        expect(item.parent.name).to.be.a('string');
        expect(item.parent.name).to.be('n2');
    });
    it("should find a $virtual command", function() {
        addNode(n1c, '$virtual', 'bye');
        var item = node.findVirtual(n1c3, 'bye')
        ;
        expect(item).to.be.an('object');
        expect(item.name).to.be.a('string');
        expect(item.name).to.be('$virtual');
        expect(item.parent).to.be.an('object');
        expect(item.parent.name).to.be.a('string');
        expect(item.parent.name).to.be('n1c');
    });
    it("should say if it has a parent of name ...", function() {
        var test = node.isParentOfName(n1c3, 'n1')
        ;
        expect(test).to.be(true);
        test = node.isParentOfName(n2c3, 'n1')
        ;
        expect(test).to.be(false);
    });
    it("should replace a node", function() {
        var r1 = createRoot('repl1', 'repl1 value');
        var r2 = createRoot('repl2', 'repl2 value');
        var replacers = [r1, r2];
        expect(n3.childs).to.be.an('array');
        expect(n3.childs.length).to.be(3);
        node.replace(n3c, replacers);
        // log 'n3', n3
        expect(n3.childs).to.be.an('array');
        expect(n3.childs.length).to.be(4);
        expect(n3.childs[0].name).to.be.a('string');
        expect(n3.childs[0].name).to.be('n3a');
        expect(n3.childs[1].name).to.be.a('string');
        expect(n3.childs[1].name).to.be('n3b');
        expect(n3.childs[2].name).to.be.a('string');
        expect(n3.childs[2].name).to.be('repl1');
        expect(n3.childs[3].name).to.be.a('string');
        expect(n3.childs[3].name).to.be('repl2');
    });
    it("should remove a node", function() {
        expect(n3.childs).to.be.an('array');
        expect(n3.childs.length).to.be(4);
        node.remove(n3b);
        expect(n3.childs).to.be.an('array');
        expect(n3.childs.length).to.be(3);
        expect(n3.childs[0].name).to.be.a('string');
        expect(n3.childs[0].name).to.be('n3a');
        expect(n3.childs[1].name).to.be.a('string');
        expect(n3.childs[1].name).to.be('repl1');
        expect(n3.childs[2].name).to.be.a('string');
        expect(n3.childs[2].name).to.be('repl2');
    });
});

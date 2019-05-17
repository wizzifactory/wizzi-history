/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\tests\scanner\ittfFsNode.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var ittfTemp = require('../../lib/util/ittfTemp');
var ittfFsNode = require('../../lib/scanners/ittfFsNode');
var root;

describe("the ittfFsNode class", function() {
    
    it("should add a document", function() {
        root = new ittfFsNode('root', null, true);
        console.log('root', root);
        var added = root.addDocument('root/readme.md.ittf');
        console.log('root', root);
        expect(added).to.be(true);
        expect(root.folders).to.be.an('array');
        expect(root.folders.length).to.be(0);
        expect(root.documents).to.be.an('array');
        expect(root.documents.length).to.be(1);
        expect(root.documents[0].schema).to.be.a('string');
        expect(root.documents[0].schema).to.be('md');
        expect(root.documents[0].basename).to.be.a('string');
        expect(root.documents[0].basename).to.be('readme.md.ittf');
    });
    it("should add a document fragment", function() {
        var added = root.addDocument('root/t/title.md.ittf');
        console.log('root', root);
        expect(added).to.be(true);
        expect(root.folders).to.be.an('array');
        expect(root.folders.length).to.be(1);
        expect(root.documents).to.be.an('array');
        expect(root.documents.length).to.be(1);
        expect(root.folders[0].isTFolder).to.be(true);
        expect(root.folders[0].basename).to.be.a('string');
        expect(root.folders[0].basename).to.be('t');
        expect(root.folders[0].documents).to.be.an('array');
        expect(root.folders[0].documents.length).to.be(1);
        expect(root.folders[0].documents[0].basename).to.be.a('string');
        expect(root.folders[0].documents[0].basename).to.be('title.md.ittf');
        expect(root.folders[0].documents[0].schema).to.be.a('string');
        expect(root.folders[0].documents[0].schema).to.be('md');
        expect(root.folders[0].documents[0].isFragment).to.be(true);
    });
    it("should chhck infos", function() {
        root.setInfo();
        console.log('root', root);
        expect(root.info.schemas).to.be.an('object');
        expect(Object.keys(root.info.schemas).length).to.be(1);
        expect(root.info.schemas['md'].name).to.be.a('string');
        expect(root.info.schemas['md'].name).to.be('md');
        expect(root.info.documents).to.be.an('array');
        expect(root.info.documents.length).to.be(1);
    });
    it("should write an ittf", function(done) {
        var ittf = new ittfTemp('wzFs');
        root.toIttf(ittf);
        ittf.writeFile(path.join(__dirname, 'outputs', 'test.wzfs.ittf'), function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            done();
        });
    });
});

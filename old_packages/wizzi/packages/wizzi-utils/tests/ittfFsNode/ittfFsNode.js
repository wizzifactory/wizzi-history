/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\tests\ittffsnode\ittffsnode.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var ittfMTreeEx = require('../../lib/ittfTree/ittfMTreeEx');
var ittfFsNode = require('../../lib/scanners/ittfFsNode');

var root;

describe("ittFsNode", function() {
    
    it("should add a document", function() {
        root = new ittfFsNode('root', null, true);
        // log 'root', root
        var added = root.addDocument('root/readme.md.ittf');
        // log 'root', root
        expect(added).to.be(true);
        expect(root.folders).to.be.an('array');
        expect(root.folders.length).to.be(0);
        expect(root.documents).to.be.an('array');
        expect(root.documents.length).to.be(1);
        expect(root.documents[0].schema).to.be.a('string');
        expect(root.documents[0].schema).to.be('md');
        expect(root.documents[0].isFragment).to.be(false);
        expect(root.documents[0].path).to.be.a('string');
        expect(root.documents[0].path).to.be('root/readme.md.ittf');
        expect(root.documents[0].dirname).to.be.a('string');
        expect(root.documents[0].dirname).to.be('root');
        expect(root.documents[0].basename).to.be.a('string');
        expect(root.documents[0].basename).to.be('readme.md.ittf');
    });
    it("should add a document fragment", function() {
        var added = root.addDocument('root/t/title.md.ittf');
        // log 'root', root
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
        expect(root.folders[0].documents[0].dirname).to.be.a('string');
        expect(root.folders[0].documents[0].dirname).to.be('root/t');
        expect(root.folders[0].documents[0].schema).to.be.a('string');
        expect(root.folders[0].documents[0].schema).to.be('md');
        expect(root.folders[0].documents[0].isFragment).to.be(true);
    });
    it("should check infos", function() {
        root.setInfo();
        // log 'root', root
        expect(root.info.schemas).to.be.an('object');
        expect(Object.keys(root.info.schemas).length).to.be(1);
        expect(root.info.schemas['md'].name).to.be.a('string');
        expect(root.info.schemas['md'].name).to.be('md');
        expect(root.info.lib.documents).to.be.an('array');
        expect(root.info.lib.documents.length).to.be(1);
    });
    it("should write an ittf", function(done) {
        var ittf = new ittfMTreeEx('wzpackage');
        root.toIttf(ittf);
        ittf.writeFile(path.join(__dirname, 'outputs', 'test.wzpackage.ittf'), function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            done();
        });
    });
});

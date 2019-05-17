/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\util\file.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var path = require('path');
var expect = require('expect.js');
var del = require('del');
var file = require('../../lib/util/file');
var basepath = path.join(__dirname, 'util_file')
;
describe("file utility", function() {
    before(function() {
        del([
            path.join(basepath, '/**/.*')
            
        ]);
    });
    it("should not find unexistants", function() {
        var item = path.join(basepath, 'items', 'item.js.ittf')
        ;
        expect(file.exists(item)).to.be(false);
        expect(file.isDirectory(item)).to.be(false);
        expect(file.isFile(item)).to.be(false);
    });
    it("should create a new folder", function() {
        var folder = path.join(basepath, 'folders', 'folderOne')
        ;
        file.mkdir(folder);
        expect(file.exists(folder)).to.be(true);
        expect(file.isDirectory(folder)).to.be(true);
        expect(file.isFile(folder)).to.be(false);
    });
    it("should write a new file", function() {
        var filepath = path.join(basepath, 'folders', 'folderTwo', 'item.js.ittf')
        ;
        file.write(filepath, 'Hello world');
        expect(file.exists(filepath)).to.be(true);
        expect(file.isDirectory(filepath)).to.be(false);
        expect(file.isFile(filepath)).to.be(true);
        var content = file.read(filepath);
        expect(content).to.be('Hello world');
    });
    it("should copy a file", function() {
        var source = path.join(basepath, 'folders', 'folderTwo', 'item.js.ittf')
        ;
        var dest = path.join(basepath, 'folders', 'folderThree', 'itemcopied.js.ittf')
        ;
        file.copy(source, dest);
        expect(file.exists(dest)).to.be(true);
        expect(file.isDirectory(dest)).to.be(false);
        expect(file.isFile(dest)).to.be(true);
        var content = file.read(dest);
        expect(content).to.be('Hello world');
        expect(file.exists(source)).to.be(true);
        expect(file.isDirectory(source)).to.be(false);
        expect(file.isFile(source)).to.be(true);
        var content = file.read(source);
        expect(content).to.be('Hello world');
    });
    it("should create a complex project folder", function() {
        var projectFolder = path.join(basepath, 'folders', 'projectOne')
        ;
        file.write(path.join(projectFolder, 't', 'fragment_1.js.ittf')
        , 'Fragment 1');
        file.write(path.join(projectFolder, 'src', 'index.js.ittf')
        , 'Fragment 1_b');
        file.write(path.join(projectFolder, 't', 'src', 't', 'fragment_1_b.js.ittf')
        , 'Fragment 1_b');
        file.write(path.join(projectFolder, 't', 'src', 't', 'deep', 't', 'fragment_1_b_1.js.ittf')
        , 'Fragment 1_b');
        var result = file.getFolders(path.join(projectFolder, 't', 'src')
        , {
            deep: true, 
            tFoldersOnly: true, 
            documentNames: true
        })
        ;
        console.log('file.getFolders() result', result);
        expect(result).to.be.an('array');
        expect(result.length).to.be(1);
        expect(result[0].documents).to.be.an('array');
        expect(result[0].documents.length).to.be(2);
    });
});

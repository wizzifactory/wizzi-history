/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\tests\util\vfile.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var vfile = require('../../lib/fs/vfile');
var file = vfile();
var glob = require('../../lib/glob');

describe("vfile", function() {
    before(function() {
        del.sync([
            path.join(__dirname, 'ittf')
        ], {
            force: true
        });
    });
    it("should create the first file in the ittf folder", function() {
        file.write(path.join(__dirname, 'ittf', 'gc_one.ittf'), 'first one\nsecond one');
        file.write(path.join(__dirname, 'ittf', 'folder_one', 'gc_two.ittf'), 'first one\nsecond one');
    });
    it("should check existence of file", function() {
        var exists = file.exists(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        expect(exists).to.be(true);
        exists = file.exists(path.join(__dirname, 'ittf', 'astrumb.ittf'));
        expect(exists).to.be(false);
        var isFile = file.isFile(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        expect(isFile).to.be(true);
        isFile = file.isFile(path.join(__dirname, 'ittf', 'astrumb.ittf'));
        expect(isFile).to.be(false);
        isFile = file.isFile(path.join(__dirname, 'ittf', 'folder_one'));
        expect(isFile).to.be(false);
        var isDirectory = file.isDirectory(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        expect(isDirectory).to.be(false);
    });
    it("should check existence of folder", function() {
        var exists = file.exists(path.join(__dirname, 'ittf', 'folder_one'));
        expect(exists).to.be(true);
        exists = file.exists(path.join(__dirname, 'ittf', 'folder_astrumb'));
        expect(exists).to.be(false);
        var isDirectory = file.isDirectory(path.join(__dirname, 'ittf', 'folder_one'));
        expect(isDirectory).to.be(true);
        isDirectory = file.isDirectory(path.join(__dirname, 'ittf', 'astrumb.ittf'));
        expect(isDirectory).to.be(false);
        var isFile = file.isFile(path.join(__dirname, 'ittf', 'folder_one'));
        expect(isFile).to.be(false);
    });
    it("should create folder", function() {
        file.mkdir(path.join(__dirname, 'ittf', 'folder_created_one'));
        var isDirectory = file.isDirectory(path.join(__dirname, 'ittf', 'folder_created_one'));
        expect(isDirectory).to.be(true);
        file.mkdir(path.join(__dirname, 'ittf', 'folder_created_one', 'alfa', 'beta'));
        var isDirectory = file.isDirectory(path.join(__dirname, 'ittf', 'folder_created_one', 'alfa', 'beta'));
        expect(isDirectory).to.be(true);
    });
    it("should write/read a file", function() {
        file.write(path.join(__dirname, 'ittf', 'gc_one.ittf'), 'first one\nsecond one');
        var contents = file.read(path.join(__dirname, 'ittf', 'gc_one.ittf'));
        expect(contents).to.be.a('string');
        expect(contents).to.be('first one\nsecond one');
    });
    it("should write/read a file on a new folder", function() {
        file.write(path.join(__dirname, 'ittf', 'alca', 'traz', 'gc_one.ittf'), 'first one\nsecond one');
        var contents = file.read(path.join(__dirname, 'ittf', 'alca', 'traz', 'gc_one.ittf'));
        expect(contents).to.be.a('string');
        expect(contents).to.be('first one\nsecond one');
    });
    it("should write/read a json file", function() {
        var obj = {
            name: 'stefi', 
            friends: [
                {
                    name: 'arth'
                }, 
                {
                    name: 'marilu'
                }
            ]
        };
        file.writeJSON(path.join(__dirname, 'ittf', 'abrac.json'), obj);
        var obj_read = file.readJSON(path.join(__dirname, 'ittf', 'abrac.json'));
        // loose equality works for objects
        expect(obj).to.eql(obj_read);
    });
    it("should get files in a basefolder", function() {
        file.write(path.join(__dirname, 'ittf', 'globs', 'globbed_1.ittf'), 'globbed 1');
        file.write(path.join(__dirname, 'ittf', 'globs', 'globbed_2.ittf'), 'globbed 2');
        var files = file.getFiles(path.join(__dirname, 'ittf', 'globs'), {
            deep: false, 
            extension: null, 
            documentContent: false
        });
        console.log('should get files in a basefolder - files', files);
        expect(files).to.be.an('array');
        expect(files.length).to.be(2);
    });
    it("should get files with content in a basefolder", function() {
        var files = file.getFiles(path.join(__dirname, 'ittf', 'globs'), {
            deep: false, 
            extension: null, 
            documentContent: true
        });
        expect(files).to.be.an('array');
        expect(files.length).to.be(2);
        expect(files[0].content).to.be.a('string');
        expect(files[0].content).to.be('globbed 1');
        expect(files[0].relPath).to.be.a('string');
        expect(files[0].relPath).to.be('globbed_1.ittf');
        expect(files[1].content).to.be.a('string');
        expect(files[1].content).to.be('globbed 2');
        expect(files[1].relPath).to.be.a('string');
        expect(files[1].relPath).to.be('globbed_2.ittf');
    });
    it("should get folders in a basefolder", function() {
        file.write(path.join(__dirname, 'ittf', 'globs', 'one', 'globbed_1.ittf'), 'globbed 1');
        file.write(path.join(__dirname, 'ittf', 'globs', 'two', 'globbed_2.ittf'), 'globbed 2');
        var folders = file.getFolders(path.join(__dirname, 'ittf', 'globs'), {
            deep: false, 
            tFoldersOnly: false, 
            documentNames: false, 
            documentContents: false
        });
        console.log('folders', folders);
        expect(folders).to.be.an('array');
        expect(folders.length).to.be(2);
    });
    it("should get folders in a basefolder deep", function() {
        file.write(path.join(__dirname, 'ittf', 'globs', 'one', 'deep', 'globbed_1deep.ittf'), 'globbed 1 deep');
        file.write(path.join(__dirname, 'ittf', 'globs', 'two', 'deep', 'globbed_2deep.ittf'), 'globbed 2 deep');
        var folders = file.getFolders(path.join(__dirname, 'ittf', 'globs'), {
            deep: true, 
            tFoldersOnly: false, 
            documentNames: false
        });
        console.log('folders', folders);
        expect(folders).to.be.an('array');
        expect(folders.length).to.be(4);
        expect(folders[0].relPath).to.be.a('string');
        expect(folders[0].relPath).to.be('one');
        expect(folders[1].relPath).to.be.a('string');
        expect(folders[1].relPath).to.be('one/deep');
        expect(folders[2].relPath).to.be.a('string');
        expect(folders[2].relPath).to.be('two');
        expect(folders[3].relPath).to.be.a('string');
        expect(folders[3].relPath).to.be('two/deep');
    });
    it("should get folders in a basefolder deep with document names", function() {
        file.write(path.join(__dirname, 'ittf', 'globs', 'one', 'deep', 'globbed_1deep.ittf'), 'globbed 1 deep');
        file.write(path.join(__dirname, 'ittf', 'globs', 'two', 'deep', 'globbed_2deep.ittf'), 'globbed 2 deep');
        var folders = file.getFolders(path.join(__dirname, 'ittf', 'globs'), {
            deep: true, 
            tFoldersOnly: false, 
            documentNames: true, 
            documentContents: false
        });
        console.log('folders', folders);
        expect(folders).to.be.an('array');
        expect(folders.length).to.be(4);
        expect(folders[0].documents).to.be.an('array');
        expect(folders[0].documents.length).to.be(1);
        expect(folders[1].documents).to.be.an('array');
        expect(folders[1].documents.length).to.be(1);
        expect(folders[2].documents).to.be.an('array');
        expect(folders[2].documents.length).to.be(1);
        expect(folders[3].documents).to.be.an('array');
        expect(folders[3].documents.length).to.be(1);
    });
    it("should get folders in a basefolder deep with document names", function() {
        var folders = file.getFolders(path.join(__dirname, 'ittf', 'globs'), {
            deep: true, 
            tFoldersOnly: false, 
            documentNames: true
        });
        console.log('folders', folders);
        expect(folders).to.be.an('array');
        expect(folders.length).to.be(4);
        expect(folders[0].documents[0].relPath).to.be.a('string');
        expect(folders[0].documents[0].relPath).to.be('globbed_1.ittf');
        expect(folders[1].documents[0].relPath).to.be.a('string');
        expect(folders[1].documents[0].relPath).to.be('globbed_1deep.ittf');
        expect(folders[2].documents[0].relPath).to.be.a('string');
        expect(folders[2].documents[0].relPath).to.be('globbed_2.ittf');
        expect(folders[3].documents[0].relPath).to.be.a('string');
        expect(folders[3].documents[0].relPath).to.be('globbed_2deep.ittf');
    });
    it("should sync glob a folder", function() {
        file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_1.ittf'), 'globbed 1');
        file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_2.ittf'), 'globbed 2');
        file.write(path.join(__dirname, 'ittf', 'globs2', 'one', 'globbed_2_one.ittf'), 'globbed 2 one');
        var result = file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), file);
        expect(result).to.be.an('array');
        expect(result.length).to.be(3);
        var result = file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), {
            removeRoot: path.join(__dirname, 'ittf')
        });
        expect(result).to.be.an('array');
        expect(result.length).to.be(3);
        expect(result[0]).to.be.a('string');
        expect(result[0]).to.be('/globs2/globbed_1.ittf');
    });
});

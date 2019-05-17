/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\tests\json\fsimpl.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var JsonFsImpl = require('../../lib/json/jsonFsimpl'),
    FsJson = require('../../lib/json/fs/fsjson'),
    Document = require('../../lib/json/fs/document'),
    fsJson,
    doc;

describe("json.fsimpl", function() {
    
    var fsimpl = new JsonFsImpl(null);
    before(function(done) {
        fsJson = new FsJson();
        doc = new Document(fsJson);
        done();
    });
    before(function(done) {
        fsimpl.open(function(err, notUsed) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            done();
        });
    });
    describe("fs write a file", function() {
        it("should write an hello file", function(done) {
            fsimpl.writeFile('c:/folder1/hello.js.ittf', 'Hello wizzi factory', function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('tests.mongodb.fsimpl.writeFile, result:', result);
                expect(result.code).to.be.a('string');
                expect(result.code).to.be('DOCUMENT_WRITTEN');
                expect(result.item.content).to.be.a('string');
                expect(result.item.content).to.be('Hello wizzi factory');
                done();
            });
        });
        it("should read an hello file", function(done) {
            fsimpl.readFile('c:/folder1/hello.js.ittf', function(err, content) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('tests.mongodb.fsimpl.readFile, content:', content);
                expect(content).to.be.a('string');
                expect(content).to.be('Hello wizzi factory');
                done();
            });
        });
        it("hello.js.ittf should be a file not a directory", function(done) {
            fsimpl.stat('c:/folder1/hello.js.ittf', function(err, stat) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('tests.mongodb.fsimpl.stat, stat:', stat);
                expect(stat.isFile()).to.be(true);
                expect(stat.isDirectory()).to.be(false);
                done();
            });
        });
        it("c: should be a directory not a file", function(done) {
            fsimpl.stat('c:', function(err, stat) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('tests.mongodb.fsimpl.stat, stat:', stat);
                expect(stat.isFile()).to.be(false);
                expect(stat.isDirectory()).to.be(true);
                done();
            });
        });
    });
    after(function(done) {
        fsimpl.close();
        done();
    });
    after(function(done) {
        if (typeof(fsimpl) != 'undefined') {
            fsimpl.toJson(function(err, json) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log(JSON.stringify(json, null, 2));
                done();
            });
        }
        else {
            fsJson.toJson(function(err, json) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log(JSON.stringify(json, null, 2));
                done();
            });
        }
    });
});

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\tests\file.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:07 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');

var MongoClient = require('mongodb').MongoClient
,
    co = require('co'),
    assert = require('assert'),
    FsDb = require('../lib/fs/fsdb'),
    Document = require('../lib/fs/document');
var FSITEMS = 'fsitems';
var DOCUMENTS = 'documents';
var fsdb, doc;
describe("mongoFS document methods", function() {
    before(function(done) {
        MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
            fsdb = new FsDb(db);
            doc = new Document(fsdb);
            db.collection(FSITEMS).drop(function(err, result) {
                if (err) {
                    console.log('FSITEMS.drop failed');
                }
                else {
                    console.log('FSITEMS.drop result', result);
                }
                db.collection(DOCUMENTS).drop(function(err, result) {
                    if (err) {
                        console.log('DOCUMENTS.drop failed');
                    }
                    else {
                        console.log('DOCUMENTS.drop result', result);
                    }
                    done();
                });
            });
        });
    });
    var oldFolder = "c:/my/starters/darvin/test/rename/old";
    var file_1 = oldFolder + "/f1.txt";
    var file_1renamed = oldFolder + "/fr.txt";
    var content = "Hello rename file ";
    describe("rename a file", function() {
        before(function(done) {
            doc.writeFile(file_1, content + 'file 1', function(err, r) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                done();
            });
        });
        it("should rename a file", function(done) {
            doc.renameFile(file_1, file_1renamed, function(err, r) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('doc.renameFile', r);
                doc.readFile(file_1renamed, function(err, read) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    console.log('doc.renameFile read', read);
                    done();
                });
            });
        });
    });
});

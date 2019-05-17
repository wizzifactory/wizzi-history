/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\tests\fsdb.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:07 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');

var MongoClient = require('mongodb').MongoClient
,
    FsDb = require('../lib/fs/fsdb'),
    Document = require('../lib/fs/document');
var FSITEMS = 'fsitems';
var DOCUMENTS = 'documents';
var fsdb, doc;
describe("mongoFS folder methods", function() {
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
});

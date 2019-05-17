/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\examples\destroy.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:05 GMT
*/
'use strict';
var FSITEMS = 'fsitems';
var DOCUMENTS = 'documents';
var MongoClient = require('mongodb').MongoClient
,
    co = require('co'),
    assert = require('assert'),
    FsDb = require('./lib/fs/fsdb'),
    Document = require('./lib/fs/document');
co(function*() {
    var db = yield MongoClient.connect('mongodb://localhost:27017/darvin');
    var destroyFSITEMS = yield db.collection(FSITEMS).drop();
    console.log('destroyFSITEMS', destroyFSITEMS);
    var destroyDOCUMENTS = yield db.collection(DOCUMENTS).drop();
    console.log('destroyDOCUMENTS', destroyDOCUMENTS);
    db.close();
    return ;
}).catch(function(err) {
    console.log('catched in darvin.destroy.co', err.message, err.stack);
    throw err;
})
;

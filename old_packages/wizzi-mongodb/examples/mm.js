/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\examples\mm.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:05 GMT
*/
'use strict';
var MongoClient = require('mongodb').MongoClient
,
    FsDb = require('./lib/fs/fsdb'),
    Document = require('./lib/fs/document'),
    mm = require('minimatch'),
    upload_db,
    fsdb,
    doc;
function test_mm() {
    doc.getFiles();
}

MongoClient.connect('mongodb://localhost:27017/darvin', function(err, db) {
    if (err) {
        return callback(err)
        ;
    }
    console.log("Connected correctly to server");
    upload_db = db;
    fsdb = new FsDb(db);
    doc = new Document(fsdb);
    test_mm(function(err, notUsed) {
        console.log('finish');
        upload_db.close();
    });
});
co(function*() {
    var db = yield MongoClient.connect('mongodb://localhost:27017/darvin');
    var fsdb = new FsDb(db);
    var doc = new Document(fsdb);
    var f = yield doc.createFolder('c:/my/starters/darvin');
    console.log('createFolder.f', f);
    f = yield doc.getFolder('c:/my/starters/darvin');
    console.log('getFolder.f', f);
    f = yield doc.getFolder('c:/my/starters');
    console.log('getFolder.f', f);
    f = yield doc.getFolder('c:/my');
    console.log('getFolder.f', f);
    var d = yield doc.writeDocument('c:/my/starters/index.js.ittf', 'Hello world')
    ;
    console.log('writeDocument.d', d);
    var items = yield doc.getFiles('c:/my/starters')
    ;
    console.log('getFiles.items', items);
    f = yield doc.getFolder('c:/my/starters/index.js.ittf');
    console.log('getFolder.f', f);
    db.close();
    return ;
}).catch(function(err) {
    console.log('catched in darvin.test.co', err.message, err.stack);
    db.close();
    throw err;
})
;

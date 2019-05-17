/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\examples\example.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:05 GMT
*/
'use strict';
var MongoClient = require('mongodb').MongoClient
,
    co = require('co'),
    assert = require('assert'),
    FsDb = require('./lib/fs/fsdb'),
    Document = require('./lib/fs/document');
co(function*() {
    var db = yield MongoClient.connect('mongodb://localhost:27017/darvin');
    console.log("Connected correctly to server");
    var fsdb = new FsDb(db);
    var doc = new Document(fsdb);
    var adminDb = db.admin();
    /**
        var info1 = yield adminDb.command({
                buildInfo: 1
            })
        ;
        console.log('info1', info1);
        var r = yield fsdb.insertFolder('c:/hello6')
        ;
        console.log('insert folder r', r);
    */
    /**
        var d = yield doc.save('c:/hello8/bye3/readme.txt', 'Hello world plus')
        ;
        console.log('saved document d', d);
    */
    var upLoad = yield doc.uploadFolder('C:/My/wizzi/next/solutions/wizzi-mongodb/ittf')
    ;
    console.log('upload saved document upLoad', upLoad);
    db.close();
}).catch(function(err) {
    console.log('catched in main.co', err.stack);
})
;

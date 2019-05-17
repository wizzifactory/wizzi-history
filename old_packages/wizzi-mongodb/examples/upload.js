/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\examples\upload.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:05 GMT
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var MongoClient = require('mongodb').MongoClient
,
    FsDb = require('./lib/fs/fsdb'),
    Document = require('./lib/fs/document'),
    file = require('./lib/fs/file'),
    upload_db,
    fsdb,
    doc;
function upload(projectId,callback) {
    var sourceFolder = path.join(__dirname, 'data', 'projects', projectId)
    ;
    var files = file.getFiles(sourceFolder, {
        deep: true, 
        extension: 'ittf', 
        documentContent: true
    })
    ;
    async.mapSeries(files, function(file, callback) {
        var filePath = file.file;
        if (projectId === 't') {
            var uploadFilePath = filePath.replace(normalize(sourceFolder), 'c:/users/stefi/sources/t');
        }
        else {
            var uploadFilePath = filePath.replace(normalize(sourceFolder), 'c:/users/stefi/' + projectId + '/sources');
        }
        console.log('file to upload', filePath, sourceFolder, uploadFilePath);
        doc.writeFile(uploadFilePath, file.content, function(err, result) {
            if (err) {
                return callback(err)
                ;
            }
            callback(null, result);
        });
    }, function(err, uploadFilePaths) {
        if (err) {
            return callback(err)
            ;
        }
        console.log('uploadFilePaths', uploadFilePaths);
        upload_db.close();
    });
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
    upload('t', function(err, r) {
        console.log('upload result', err, r);
    });
});
function normalize(path) {
    return path.trim().replace(/\\/g,'/').toLowerCase();
}


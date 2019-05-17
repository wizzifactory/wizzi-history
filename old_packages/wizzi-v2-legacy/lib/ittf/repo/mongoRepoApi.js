/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\repo\mongoRepoApi.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var errors = require('./errors');
var wizziMongoDb = require('wizzi-mongodb');
var repoFS = wizziMongoDb.Filesystem;
var db = null;
var fsitems = null;
var documents = null;
var md = module.exports = {};
md.starts = function(config,callback) {
    MongoClient.connect('mongodb://localhost:27017/test', function(err,db) {
        fsdb = new FsDb(db);
        doc = new Document(fsdb);
        db.collection(FSITEMS).drop();
    });
}/**
     param ittfDocumentInfo {
     storeKind:String oneOf("filesystem", "repo")
     }
*/
md.starts.prototype.init = function(ittfDocumentInfo,callback) {
    if (ittfDocumentInfo.storeKind === 'filesystem') {
        this.storeImpl = new FileSystemStore();
    }
    else if (ittfDocumentInfo.storeKind === 'repo') {
        var error = new errors.NotImplementedError("Mongodb repo not implemented.");
        return callback(error)
        ;
        this.storeImpl = new RepoStore();
    }
    else {
        var error = new errors.InvalidRequestError("In ittf.repo.IttfDocumentStore.ctor. Unknown storeKind: " + ittfDocumentInfo.storeKind +" , requested ittfDocumentInfo: " + util.inspect(ittfDocumentInfo, {depth: 2}));
        return callback(error)
        ;
    }
    this.storeKind = this.storeImpl.storeKind;
    callback(null);
}
md.starts.prototype.initSync = function(ittfDocumentInfo) {
    if (ittfDocumentInfo.storeKind === 'filesystem') {
        this.storeImpl = new FileSystemStore();
    }
    else {
        var error = new errors.InvalidRequestError('In lib/ittf/repo/IttfDocumentStore/initSync. Method "initSync" is for storeKind: ' +'"filesystem" only.');
        return callback(error)
        ;
    }
    this.storeKind = this.storeImpl.storeKind;
}
md.starts.prototype.documentExists = function(documentUri,callback) {
    this.storeImpl.documentExists(documentUri, callback);
}
md.starts.prototype.folderExistsSync = function(folderUri) {
    return this.storeImpl.folderExists(folderUri);
}
md.starts.prototype.getFoldersSync = function(parentFolderUri,options) {
    return this.storeImpl.getFoldersSync(parentFolderUri, options);
}
md.starts.prototype.getModelContent = function(documentUri,callback) {
    this.storeImpl.getModelContent(documentUri, callback);
}
md.starts.createFileSystemDocumentStore = function() {
    var ret = new IttfDocumentStore();
    ret.initSync({
        storeKind: "filesystem"
    });
    return ret;
}
;
module.exports = IttfDocumentStore;

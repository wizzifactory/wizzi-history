/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\lib\json\index.js.ittf
*/
'use strict';
var async = require('async');
var md = {};
module.exports = md;
var Collection = require('../utils/collection');
md.directoryTree = require('./directoryTree');
md.FsJson = require('./fs/fsjson');
md.Document = require('./fs/document');
/** -àà
     params
     { jsonFsData
     [ items
     [ documents
     jsonFsData is simply a transport (DTO)
     to get the updated jsonFsData you
     must call the toJson method of the Document instance
*/
md.createDocumentManager = function(fsJsonDataOrFsJson) {
    if (fsJsonDataOrFsJson && fsJsonDataOrFsJson.classType === 'wizzi-repo.json.FsJson') {
        return new md.Document(fsJsonDataOrFsJson);
    }
    else {
        var jsonFsData = fsJsonDataOrFsJson || {};
        jsonFsData.items = jsonFsData.items || [];
        jsonFsData.documents = jsonFsData.documents || [];
        return new md.Document(new md.FsJson(jsonFsData));
    }
};
md.createFsJson = function(documents, callback) {
    md.createJsonFsData(documents, function(err, jsonFsData) {
        if (err) {
            return callback(err);
        }
        var fsJson = new md.FsJson(jsonFsData);
        return callback(null, fsJson);
    });
};
md.createFsJsonByJsonFsData = function(jsonFsData, callback) {
    var fsJson = new md.FsJson(jsonFsData);
    return callback(null, fsJson);
};
md.createJsonFsData = function(documents, callback) {
    const doc = this.createDocumentManager();
    async.map(documents, (document, callback) => {
        doc.writeFile(document.path, document.content, callback)}, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        doc.toJson(callback);
    });
};
md.addToJsonFsData = function(jsonFsData, documents, callback) {
    const doc = this.createDocumentManager(jsonFsData);
    async.map(documents, (document, callback) => {
        doc.writeFile(document.path, document.content, callback)}, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        doc.toJson(callback);
    });
};

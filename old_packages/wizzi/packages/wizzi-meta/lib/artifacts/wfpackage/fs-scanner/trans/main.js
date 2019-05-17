/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\lib\artifacts\wfpackage\fs-scanner\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var verify = require('wizzi-utils').verify;
var folderScanner = require('wizzi-utils').folderScanner;

var myname = 'model.transformer.wfpackage.fs-scanner';

var md = module.exports = {};

md.trans = function(model, ctx, callback) {
    if (verify.isFunction(callback) != true) {
        throw new Error(myname + ' a callback parameter of type function is required. In uri: ' + model.ittfDocumentUri);
    }
    if (verify.isObject(ctx) != true) {
        throw new Error(myname + ' a context parameter of type object is required. In uri: ' + model.ittfDocumentUri);
    }
    if (model.wzElement !== 'wfpackage') {
        throw new Error(myname + ' the model wzElement must be: wfpackage. Found: ' + model.wzElement + '. in uri: ' + model.ittfDocumentUri);
    }
    var result = {
        generatedPackages: []
    };
    var fsBaseUri = model.fsBaseUri;
    // log myname, 'fsBaseUri', fsBaseUri
    var i, i_items=model.generatedPackages, i_len=model.generatedPackages.length, pkg;
    for (i=0; i<i_len; i++) {
        pkg = model.generatedPackages[i];
        var srcPath = path.join(fsBaseUri, pkg.sourceFolder);
        // log myname, 'srcPath', srcPath
        var ittf = folderScanner.scan(srcPath, {
            name: pkg.wzName, 
            gitPath: pkg.gitBaseUri
        });
        ittf.insertAt('version', pkg.version, 1);
        ittf.insertAt('title', pkg.title, 2);
        /** -àà
            TODO why folderScanner.scan already sets this
            ittf.insertAt('src-cwd', srcPath, 3)*/
        result.generatedPackages.push(ittf);
    }
    callback(null, result);
};

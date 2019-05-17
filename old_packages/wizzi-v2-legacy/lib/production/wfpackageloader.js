/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\production\wfpackageloader.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
/**
     This is duplicated
     use the packageFinder in wizzi-core/services
    
*/
var util = require('util');
var path = require('path');
var verify = require('../util/verify');
var file = require('../util/file');
var log = require('../util/log')(module);
var md = module.exports = {};
md.load = function(pkgName,cwd) {
    if (pkgName == 'wizzi') {
        return require('../../index');
    }
    var result;
    // try fullpath
    try {
        // log 'try fullpath ', pkgName
        result = require(pkgName);
        // log 'found fullpath ', pkgName
        return result;
    } catch (ex) {
        console.log("ex" + " " +util.inspect(ex, { depth: null } ))
    }
    // log 'Is not a full path'
    var localNodeModule = findUpFolder(cwd, 'node_modules');
    if (localNodeModule) {
        // log 'try in ', localNodeModule
        var pkgLocalPath = path.join(localNodeModule, pkgName);
        try {
            result = require(pkgLocalPath);
            return result;
        } catch (ex) {
            console.log("ex" + " " +util.inspect(ex, { depth: null } ))
        }
    }
    else {
        // log 'node_modules not found in cwd', cwd
    }
};
function findUpFolder(basePath,folderName) {
    var test = path.join(basePath, folderName);
    if (file.isDirectory(test)) {
        return test;
    }
    basePath = path.dirname(basePath);
    if (basePath.length > 3) {
        return findUpFolder(basePath, folderName);
    }
    else {
        return null;
    }
}


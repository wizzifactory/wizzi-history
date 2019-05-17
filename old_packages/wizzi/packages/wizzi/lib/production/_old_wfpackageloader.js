/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\lib\production\_old_wfpackageloader.js.ittf
*/
'use strict';
/** -àà
     This is duplicated
     use the packageFinder in wizzi-core/services
    
*/
var util = require('util');
var path = require('path');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var log = require('../util/log')(module);
var md = module.exports = {};
md.load = function(pkgName, cwd) {
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
        console.log(ex);
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
            console.log(ex);
        }
    }
    else {
        // log 'node_modules not found in cwd', cwd
    }
};
function findUpFolder(basePath, folderName) {
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

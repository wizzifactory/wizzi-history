// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:44 GMT
'use strict';
var util = require('util');
var path = require('path');
var log = require('../util/log')(module);
var verify = require('../util/verify');
var file = require('../util/file');
var errors = require('../errors');
var md = module.exports = {};
// Search a package in node_modules
// starting from a cwd and going up in
// the folder tree
md.findNodePackage = function(pkgName,cwd,throwIfNotFound) {
    var result;
    // try fullpath
    try {
        // log 'try fullpath ', pkgName
        result = require(pkgName);
        if (result) {
            // log 'found fullpath ', pkgName
            return result;
        }
    } catch (ex) {
        console.log("ex" + " " + util.inspect(ex, { depth: null}));
    }
    // log 'Is not a full path', pkgName
    var localPackagePath = findUpModuleFolder(cwd, pkgName);
    if (localPackagePath) {
        // log 'try in ', localPackagePath, , pkgName
        try {
            result = require(localPackagePath);
            if (result) {
                // log 'found in ', localPackagePath, , pkgName
                return result;
            }
        } catch (ex) {
            console.log("ex" + " " + util.inspect(ex, { depth: null}));
        }
    }
    // log 'not found', pkgName
    if (throwIfNotFound) {
        var error = new errors.NotFoundError('NodePackage', pkgName, 'modulefinder.findNodePackage');
    }
    else {
        return null;
    }
};
md.findUpFolder = function(basePath,folderName) {
    return _findUp(basePath, folderName, true);
};
md.findUpFile = function(basePath,fileName) {
    return _findUp(basePath, fileName, false);
};
function findUpModuleFolder(basePath,pkgName) {
    var test = path.join(basePath, 'node_modules', pkgName);
    if (file.isDirectory(test)) {
        return test;
    }
    basePath = path.dirname(basePath);
    if (basePath.length > 3) {
        return findUpModuleFolder(basePath, pkgName);
    }
    else {
        return null;
    }
}

function _findUp(basePath,name,searchFolder) {
    var test = path.join(basePath, name);
    if (searchFolder) {
        if (file.isDirectory(test)) {
            return test;
        }
    }
    else {
        if (file.isFile(test)) {
            return test;
        }
    }
    basePath = path.dirname(basePath);
    if (basePath.length > 3) {
        return _findUp(basePath, name);
    }
    else {
        return null;
    }
}


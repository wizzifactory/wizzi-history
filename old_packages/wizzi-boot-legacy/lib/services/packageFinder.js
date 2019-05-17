// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:45 GMT
'use strict';
var util = require('util');
var path = require('path');
var verify = require('../util/verify');
var file = require('../util/file');
var errors = require('../ittf/repo/errors');
var fileFinder = require('./fileFinder');
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
    var localPackagePath = fileFinder.findUpModuleFolder(cwd, pkgName);
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

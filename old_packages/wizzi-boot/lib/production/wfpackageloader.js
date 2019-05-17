// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:44 GMT
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
        console.log("ex" + " " + util.inspect(ex, { depth: null}));
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
            console.log("ex" + " " + util.inspect(ex, { depth: null}));
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


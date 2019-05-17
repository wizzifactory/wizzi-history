/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\fs\index.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var uriparser = require('./uriparser');
var file = require('./file');
var repo = require('./repo');
var md = module.exports = {};
var win32 = process.platform === 'win32';
md.unixifyPath = function(path_string) {
    if (win32) {
        return path_string.replace(/\\/g, '/');
    }
    else {
        return path_string;
    }
};
md.exists = function(path_string,callback) {
    uriparser(String(path_string), function(err,parsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed.storeKind === 'repo') {
            return repo.exists(parsed, callback);
        }
        else {
            return file.exists(path_string, callback);
        }
    });
};
md.isFile = function(path_string,callback) {
    uriparser(String(path_string), function(err,parsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed.storeKind === 'repo') {
            return repo.isFile(parsed, callback);
        }
        else {
            return file.isFile(path_string, callback);
        }
    });
};
md.isDirectory = function(path_string,callback) {
    uriparser(String(path_string), function(err,parsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed.storeKind === 'repo') {
            return repo.isDirectory(parsed, callback);
        }
        else {
            return file.isDirectory(path_string, callback);
        }
    });
};
md.read = function(path_string,options,callback) {
    if (typeof (options) === 'function') {
        callback = options, options = {};
    }
    if (!options) {
        options = {};
    }
    uriparser(String(path_string), function(err,parsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed.storeKind === 'repo') {
            return repo.read(parsed, options, callback);
        }
        else {
            return file.read(path_string, options, callback);
        }
    });
};
md.getGlobbedFiles = function(globPattern,options,callback) {
    if (typeof (options) === 'function') {
        callback = options, options = {};
    }
    if (!options) {
        options = {};
    }
    uriparser(String(globPattern), function(err,parsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed.storeKind === 'repo') {
            return repo.getGlobbedFiles(parsed, options, callback);
        }
        else {
            return file.getGlobbedFiles(globPattern, options, callback);
        }
    });
};
md.write = function(path_string,content,options,callback) {
    if (typeof (options) === 'function') {
        callback = options, options = {};
    }
    if (!options) {
        options = {};
    }
    uriparser(String(path_string), function(err,parsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed.storeKind === 'repo') {
            return repo.write(parsed, content, options, callback);
        }
        else {
            return file.write(path_string, content, options, callback);
        }
    });
};
md.mkdir = function(path_string,mode,callback) {
    if (typeof (mode) === 'function') {
        callback = mode, mode = null;
    }
    uriparser(String(path_string), function(err,parsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed.storeKind === 'repo') {
            // no mode param for repo.mkdir
            return repo.mkdir(parsed, callback);
        }
        else {
            return file.mkdir(path_string, mode, callback);
        }
    });
};
md.copy = function(source_path_string,dest_path_string,callback) {
    uriparser(String(source_path_string), function(err,parsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed.storeKind === 'repo') {
            return repo.copy(parsed, dest_path_string, callback);
        }
        else {
            return file.copy(source_path_string, dest_path_string, callback);
        }
    });
};

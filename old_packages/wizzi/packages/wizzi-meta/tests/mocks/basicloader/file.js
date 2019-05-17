/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\tests\mocks\basicloader\file.js.ittf
*/
'use strict';
var fs = require('fs');
var path = require('path');
var iconv = require('iconv-lite');
var md = module.exports = {};
var pathSeparatorRe = /[\/\\]/g;
md.defaultEncoding = 'utf8';
md.preserveBOM = false;
var win32 = process.platform === 'win32';
md.unixifyPath = function(path_string) {
    if (win32) {
        return path_string.replace(/\\/g, '/');
    }
    else {
        return path_string;
    }
};
// sync read
md.read = function(path_string, options) {
    if (!(options)) {
        options = {};
    }
    var contents = fs.readFileSync(String(path_string));
    if (options.encoding !== null) {
        contents = iconv.decode(contents, (options.encoding || md.defaultEncoding));
        if (!md.preserveBOM && contents.charCodeAt(0) === 0xFEFF) {
            contents = contents.substring(1);
        }
    }
    return contents;
};
// sync readJSON
md.readJSON = function(path_string, options) {
    var src = md.read(path_string, options);
    var result;
    try {
        result = JSON.parse(src);
        return result;
    } catch (ex) {
        throw new errors.FileError('Unable to parse "' + path_string + '" file (' + ex.message + ').', ex);
    }
};
// async read
md.readFile = function(path_string, callback) {
    fs.readFile(path_string, function(err, data) {
        if (err) {
            callback(err);
        }
        callback(null, data);
    });
};
md.write = function(path_string, contents, options) {
    if (!options) {
        options = {};
    }
    md.mkpath(path_string);
    try {
        if (!Buffer.isBuffer(contents)) {
            contents = iconv.encode(contents, (options.encoding || md.defaultEncoding));
        }
        fs.writeFileSync(path_string, contents);
        return true;
    } catch (ex) {
        ex.message = 'Writing file ' + path_string + '.\n' + ex.message;
        throw ex;
    }
};
md.writeJSON = function(path_string, contentObject) {
    md.write(path_string, JSON.stringify(contentObject, null, 2));
};
md.mkpath = function(path_string) {
    var dir = path.dirname(path_string);
    md.mkdir(dir);
};
md.mkdir = function(dirpath, mode) {
    if (mode == null) {
        mode = parseInt('0777', 8) & ~ (process.umask());
    }
    dirpath.split(pathSeparatorRe).reduce(function(parts, part) {
        parts += part + '/';
        var subpath = path.resolve(parts);
        if (!md.exists(subpath)) {
            try {
                fs.mkdirSync(subpath, mode);
            } catch (ex) {
                throw new errors.FileError('Unable to create directory "' + subpath + '" (Error code: ' + ex.code + ').', ex);
            }
        }
        return parts;
    }, '');
};
md.exists = function(path_string) {
    try {
        var stat = fs.lstatSync(String(path_string));
        return stat.isFile() || stat.isDirectory();
    } catch (ex) {
    }
    return false;
};
md.isDirectory = function(path_string) {
    try {
        return fs.lstatSync(String(path_string)).isDirectory()
        ;
    } catch (ex) {
    }
    return false;
};
md.isFile = function(path_string) {
    try {
        return fs.lstatSync(String(path_string)).isFile()
        ;
    } catch (ex) {
    }
    return false;
};

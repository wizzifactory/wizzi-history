/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-utils\src\ittf\lib\fs\file.js.ittf
    utc time: Tue, 10 Oct 2017 15:30:05 GMT
*/
'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var iconv = require('iconv-lite');
var glob = require('glob');
var verify = require('../verify');
var errors = require('../errors');
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
md.readFile = function(path_string, options, callback) {
    if (typeof(callback) == 'undefined') {
        callback = options;
        options = null;
    }
    if (!options) {
        options = {
            encoding: md.defaultEncoding
        };
    }
    fs.readFile(path_string, function(err, contents) {
        if (err) {
            callback(err);
        }
        if (options.encoding !== null) {
            contents = iconv.decode(contents, (options.encoding || md.defaultEncoding));
            if (!md.preserveBOM && contents.charCodeAt(0) === 0xFEFF) {
                contents = contents.substring(1);
            }
        }
        callback(null, contents);
    });
};
md.readLines = function(path_string, options) {
    var contents = md.read(path_string, options);
    return md.splitLines(contents);
};
md.splitLines = function(contents) {
    var i,
        l = contents.length,
        result = [],
        line = [],
        ch,
        chprev;
    for (i = 0; i < l; i++) {
        chprev = ch;
        ch = contents[i];
        if ((ch === '\n' && chprev !== '\r') || (ch === '\r' && chprev !== '\n')) {
            result.push(line.join(''));
            line = [];
        }
        else if ((ch === '\n' && chprev === '\r') || (ch === '\r' && chprev === '\n')) {
        }
        else {
            line.push(ch);
        }
    }
    if (line.length > 0) {
        result.push(line.join(''));
    }
    return result;
};
md.openWrite = function(path_string, callback) {
    var stream;
    if (md.exists(path_string)) {
        fs.unlink(path_string, function(err) {
            if (err) {
                return callback(err);
            }
            stream = fs.createWriteStream(path_string);
            callback(null, stream);
        });
    }
    else {
        md.mkpath(path_string);
        stream = fs.createWriteStream(path_string);
        callback(null, stream);
    }
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
md.writeFile = function(path_string, contents, options, callback) {
    if (typeof(callback) === 'undefined') {
        callback = options;
        options = null;
    }
    if (!options) {
        options = {};
    }
    md.mkpath(path_string);
    if (!Buffer.isBuffer(contents)) {
        contents = iconv.encode(contents, (options.encoding || md.defaultEncoding));
    }
    fs.writeFile(path_string, contents, callback);
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
    }, '')
    ;
};
md.copy = function(src, dest) {
    try {
        md.mkpath(dest);
        md.write(dest, md.read(src));
    } catch (ex) {
        ex.message += '\nfile.copy from ' + src + ' to ' + dest;
        throw ex;
    }
};
var getFilesDefaults = {
    deep: true, 
    extension: null, 
    documentContent: false
};
md.getFiles = function(path_string, options) {
    options = _.assign({}, getFilesDefaults, (options || {}));
    var result;
    if (md.isDirectory(path_string)) {
        var files = [];
        var relPath = [];
        md._appendFiles(path_string, files, relPath, options);
        result = files;
    }
    else if (md.isFile(path_string)) {
        result = [md.unixifyPath(path_string)];
    }
    else {
        result = [];
    }
    if (options.documentContent) {
        var newResult = [],
            content;
        var i, i_len=result.length, item;
        for (i=0; i<i_len; i++) {
            item = result[i];
            content = md.read(item);
            newResult.push({
                file: item, 
                content: content
            });
        }
        return newResult;
    }
    return result;
};
md._appendFiles = function(path_string, files, relPath, options) {
    var dir = fs.readdirSync(String(path_string));
    var folders = [];
    var i, i_len=dir.length, item;
    for (i=0; i<i_len; i++) {
        item = dir[i];
        var filePath = path.join(path_string, item);
        if (md.isDirectory(filePath)) {
            if (options.deep) {
                folders.push(item);
            }
        }
        else {
            if (!options.extension || verify.endsWith(item, options.extension)) {
                files.push(md.unixifyPath(path.join(relPath.join('/'), item)
                )
                );
            }
        }
    }
    var i, i_len=folders.length, item;
    for (i=0; i<i_len; i++) {
        item = folders[i];
        var filePath = path.join(path_string, item);
        var newRelPath = relPath.slice(0);
        newRelPath.push(item);
        md._appendFiles(filePath, files, newRelPath, options);
    }
};
var getFoldersDefaults = {
    deep: true, 
    tFoldersOnly: false, 
    documentNames: false, 
    documentContents: false
};
md.getFolders = function(path_string, options) {
    options = _.assign({}, getFoldersDefaults, options);
    var result;
    if (md.isDirectory(path_string)) {
        var folders = [];
        var relPath = [];
        md._appendFolders(path_string, folders, relPath, options);
        result = folders;
    }
    else if (md.isDirectory(path_string)) {
        result = [md.unixifyPath(path_string)];
    }
    else {
        result = [];
    }
    if (options.documentNames) {
        var newResult = [],
            files;
        var i, i_len=result.length, item;
        for (i=0; i<i_len; i++) {
            item = result[i];
            var filePath = path.join(path_string, item);
            if (options.tFoldersOnly) {
                files = md.getFiles(filePath, {deep: true, filesOnly: true});
            }
            else {
                files = md.getFiles(filePath, {deep: false, filesOnly: true});
            }
            newResult.push({
                folder: item, 
                documents: files
            });
        }
        return newResult;
    }
    return result;
};
md._appendFolders = function(path_string, folders, relPath, options) {
    var dir = fs.readdirSync(String(path_string));
    var i, i_len=dir.length, item;
    for (i=0; i<i_len; i++) {
        item = dir[i];
        var filePath = path.join(path_string, item);
        if (md.isDirectory(filePath)) {
            if (options.tFoldersOnly) {
                if (item.toLowerCase() === 't') {
                    folders.push(md.unixifyPath(path.join(relPath.join('/'), item)
                    )
                    );
                    return ;
                }
            }
            else {
                folders.push(md.unixifyPath(path.join(relPath.join('/'), item)
                )
                );
            }
            if (options.deep) {
                var newRelPath = relPath.slice(0);
                newRelPath.push(item);
                md._appendFolders(filePath, folders, newRelPath, options);
            }
        }
    }
};
md.getGlobbedFilesEx = function(globPatterns, options) {
    var options = (options || {});
    return md.getGlobbedFiles(globPatterns, options.removeRoot, options)
    ;
};
md.getGlobbedFiles = function(globPatterns, removeRoot, options) {
    var _this = this;
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
    var output = [];
    if (verify.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, this.getGlobbedFiles(globPattern, removeRoot, options)
            )
            ;
        });
    }
    else if (verify.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        }
        else {
            console.log('globPatterns, options', globPatterns, options);
            var files = glob.sync(globPatterns, options);
            // log 'wizzi-meta.file.globPatterns ', globPatterns, 'files', files.length
            if (removeRoot) {
                console.log('removeRoot', removeRoot);
                files = files.map(function(file) {
                    if (_.isArray(removeRoot)) {
                        for (var i in removeRoot) {
                            file = file.replace(removeRoot[i], '');
                        }
                    }
                    else {
                        // log md.unixifyPath(file), removeRoot
                        file = md.unixifyPath(file).replace(md.unixifyPath(removeRoot)
                        , '')
                        
                        ;
                    }
                    return file;
                })
                ;
            }
            output = _.union(output, files);
        }
    }
    return output;
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
md.isFilePath = function(path) {
    if (verify.isString(path)) {
        var protocol = _protocol(url.parse(path).protocol
        )
        ;
        return protocol.length === 1 || protocol === 'file';
    }
    return false;
};
function _protocol(value) {
    return value.substr(-1, 1) === ':' ? value.substr(0, value.length - 1) : value;
}
md.emptyDirectory = function(path, fn) {
    fs.readdir(path, function(err, files) {
        if (err && 'ENOENT' != err.code) {
            throw err;
        }
        fn(!files || !files.length);
    });
};
md.deleteFile = function(path_string, callback) {
    if (!md.isFile(path_string)) {
        return callback(null, {
                deleted: false, 
                reason: 'Not a file'
            })
        ;
    }
    fs.unlink(String(path_string), function(err) {
        if (err) {
            callback(err);
        }
        callback(null, {
            deleted: false
        });
    });
};
md.getDir = function(path_string, callback) {
    var dir = fs.readdirSync(String(path_string));
    var ret = [];
    var i, i_len=dir.length, item;
    for (i=0; i<i_len; i++) {
        item = dir[i];
        ret.push(path.join(path_string, item));
    }
    return callback(null, ret)
    ;
};

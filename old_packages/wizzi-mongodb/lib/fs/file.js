/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\lib\fs\file.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:07 GMT
*/
'use strict';
var fs = require('fs');
var path = require('path');
var iconv = require('iconv-lite');
var md = module.exports = {};
var pathSeparatorRe = /[\/\\]/g;
md.defaultEncoding = 'utf8';
md.preserveBOM = false;
var getFilesDefaults = {
    deep: true, 
    extension: null, 
    documentContent: false
};
md.getFiles = function(path_string, options) {
    options = Object.assign({}, getFilesDefaults, (options || {}));
    var result;
    if (md.isDirectory(path_string)) {
        var files = [];
        md._appendFiles(path_string, files, options);
        result = files;
    }
    else if (md.isFile(path_string)) {
        result = [normalize(path_string)];
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
md._appendFiles = function(path_string, files, options) {
    var dir = fs.readdirSync(String(path_string));
    var folders = [];
    var i, i_len=dir.length, item;
    for (i=0; i<i_len; i++) {
        item = dir[i];
        var filePath = path.join(path_string, item);
        console.log('md._appendFiles found item', filePath);
        if (md.isDirectory(filePath)) {
            if (options.deep) {
                folders.push(item);
            }
        }
        else {
            if (!options.extension || item.substr(-options.extension.length) === options.extension) {
                console.log('md._appendFiles added file', filePath);
                files.push(normalize(path.join(path_string, item)
                )
                );
            }
        }
    }
    var i, i_len=folders.length, item;
    for (i=0; i<i_len; i++) {
        item = folders[i];
        var folderPath = path.join(path_string, item);
        md._appendFiles(folderPath, files, options);
    }
};
var getFoldersDefaults = {
    deep: true, 
    tFoldersOnly: false, 
    documentNames: false, 
    documentContents: false
};
md.getFolders = function(path_string, options) {
    options = Object.assign({}, getFoldersDefaults, options);
    var result;
    if (md.isDirectory(path_string)) {
        var folders = [];
        md._appendFolders(path_string, folders, options);
        result = folders;
    }
    else if (md.isDirectory(path_string)) {
        result = [normalize(path_string)];
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
md._appendFolders = function(path_string, folders, options) {
    var dir = fs.readdirSync(String(path_string));
    var i, i_len=dir.length, item;
    for (i=0; i<i_len; i++) {
        item = dir[i];
        var filePath = path.join(path_string, item);
        if (md.isDirectory(filePath)) {
            if (options.tFoldersOnly) {
                if (item.toLowerCase() === 't') {
                    folders.push(normalize(path.join(path_string, item)
                    )
                    );
                    return ;
                }
            }
            else {
                folders.push(normalize(path.join(path_string, item)
                )
                );
            }
            if (options.deep) {
                md._appendFolders(filePath, folders, options);
            }
        }
    }
};
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
md.writeBuffer = function(path, content, overwrite, attr) {
    if (fs.existsSync(path)) {
        if (!(overwrite)) {
            return false;
        }
        var stat = fs.statSync(path);
        if (stat.isDirectory()) {
            return false;
        }
    }
    else {
        md.mkpath(path);
    }
    var fd;
    try {
        fd = fs.openSync(path, 'w', 438);
    } catch (e) {
        fs.chmodSync(path, 438);
        fd = fs.openSync(path, 'w', 438);
    }
    if (fd) {
        fs.writeSync(fd, content, 0, content.length, 0);
        fs.closeSync(fd);
    }
    fs.chmodSync(path, (attr || 438));
    return true;
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
                throw new errors.FileError('Unable to create directory "' + subpath + '" (Error code: ' + e.code + ').', ex);
            }
        }
        return parts;
    }, '')
    ;
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
md.lastModified = function(path_string) {
    return fs.lstatSync(String(path_string)).mtime
    ;
};
function normalize(path) {
    return path.trim().replace(/\\/g,'/').toLowerCase();
}


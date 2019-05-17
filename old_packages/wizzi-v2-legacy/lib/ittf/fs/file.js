/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\fs\file.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var path = require('path');
var fs = require('fs');
var iconv = require('iconv-lite');
var glob = require('glob');
var md = module.exports = {};
var pathSeparatorRe = /[\/\\]/g;
md.defaultEncoding = 'utf8';
md.preserveBOM = false;
md.exists = function(path_string,callback) {
    fs.lstat(String(path_string), function(err,stat) {
        if (err) {
            if (err.code === 'ENOENT') {
                return callback(null, false)
                ;
            }
            else {
                return callback(err);
            }
        }
        callback(null, stat.isFile() || stat.isDirectory());
    });
};
md.isDirectory = function(path_string,callback) {
    fs.lstat(String(path_string), function(err,stat) {
        if (err) {
            if (err.code === 'ENOENT') {
                return callback(null, false)
                ;
            }
            else {
                return callback(err);
            }
        }
        callback(null, stat.isDirectory());
    });
};
md.isFile = function(path_string,callback) {
    fs.lstat(String(path_string), function(err,stat) {
        if (err) {
            if (err.code === 'ENOENT') {
                return callback(null, false)
                ;
            }
            else {
                return callback(err);
            }
        }
        callback(null, stat.isFile());
    });
};
md.read = function(path_string,options,callback) {
    fs.readFile(String(path_string), function(err,content) {
        if (err) {
            return callback(err)
            ;
        }
        if (options.encoding !== null) {
            content = iconv.decode(content, (options.encoding || md.defaultEncoding));
            if (!md.preserveBOM && content.charCodeAt(0) === 0xFEFF) {
                content = content.substring(1);
            }
        }
        callback(null, content);
    });
};
md.getGlobbedFiles = function(globPattern,options,callback) {
    var removeRoot = options.removeRoot;
    glob(String(globPattern), function(err,files) {
        if (err) {
            return callback(err)
            ;
        }
        if (removeRoot) {
            files = files.map(function(file) {
                return file.replace(removeRoot, '');
            })
            ;
        }
        console.log('file.getGlobbedFiles', files);
        callback(null, files);
    });
};
md.write = function(path_string,content,options,callback) {
    md.mkpath(path_string, function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        if (!Buffer.isBuffer(content)) {
            content = iconv.encode(content, (options.encoding || md.defaultEncoding));
        }
        fs.writeFile(String(path_string), content, function(err,notUsed) {
            if (err) {
                return callback(err)
                ;
            }
            return callback(null, true)
            ;
        });
    });
};
md.mkpath = function(path_string,callback) {
    var dir = path.dirname(path_string);
    md.mkdir(dir, callback);
};
md.mkdir = function(dirpath,mode,callback) {
    if (typeof (mode) === 'function') {
        callback = mode, mode = null;
    }
    if (mode == null) {
        mode = parseInt('0777', 8) & ~ (process.umask());
    }
    var part, parts = dirpath.split(pathSeparatorRe);
    var len = parts.length;
    var pathArray = [];
    function repeater(index) {
        if (index == len) {
            // we are done, return
            return callback(null);
        }
        part = parts[index];
        pathArray.push(part);
        var subpath = path.resolve(pathArray.join('/'));
        md.exists(subpath, function(err,result) {
            if (err) {
                return callback(err)
                ;
            }
            if (result == false) {
                fs.mkdir(subpath, mode, function(err,notUsed) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    repeater(index + 1);
                });
            }
            else {
                repeater(index + 1);
            }
        });
    }
    repeater(0);
};
md.copy = function(source_path_string,dest_path_string,callback) {
    md.mkpath(String(dest_path_string), function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        md.read(String(source_path_string), {}, function(err,content) {
            if (err) {
                return callback(err)
                ;
            }
            md.write(String(dest_path_string), content, {}, function(err,notUsed) {
                if (err) {
                    return callback(err)
                    ;
                }
                return callback(null, true)
                ;
            });
        });
    });
};

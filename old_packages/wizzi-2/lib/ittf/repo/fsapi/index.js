/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\repo\fsapi\index.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var fs = require("fs-extra");
var verify = require("../../../util/verify");
var sanitize = require("./sanitize");
var md = module.exports = {};
function checkItemName(name) {
    return name === sanitize(name, {replacement: '_'});
}
function checkPath(filepath) {
    var base_path = getBasePath(filepath);
    return fs.existsSync(base_path);
}
function pathExists(filepath) {
    return fs.existsSync(filepath);
}
function isFile(filepath) {
    return pathExists(filepath) && fs.lstatSync(filepath).isDirectory() === false;
}
function isDir(filepath) {
    return (md.pathExists(filepath) && (fs.lstatSync(filepath).isDirectory() === true));
}
function getFile(filepath,callback) {
    fs.readFile(filepath, "utf8", function(err,data) {
        callback(err, data);
    });
}
function renameFile(filepath,newname,callback) {
    var base_path = getBasePath(filepath);
    fs.rename(filepath, base_path + "/" + newname, function(err,data) {
        callback(err, data);
    });
}
function saveFile(filepath,content,callback) {
    fs.writeFile(filepath, content, function(err,data) {
        callback(err, data);
    });
}
function copyFile(dirpath,destination,callback) {
    fs.copy(dirpath, destination, function(err) {
        callback(err);
    });
}
function deleteFile(dirpath,callback) {
    fs.remove(dirpath, function(err) {
        callback(err);
    });
}
function getDir(dirpath,basepath,callback) {
    fs.readdir(dirpath, function(err,files) {
        if (err) {
            callback(err, null);
        }
        else {
            dirpath.slice(- (1)) !== "/" ? dirpath = (dirpath + "/") : dirpath = dirpath;
            var output = {},
                output_dirs = [],
                output_files = [],
                current,
                relpath,
                link;
            var createItem = function(name,current,relpath,type,link) {
                return {
                        name: name, 
                        dirpath: relpath.replace('//', '/'), 
                        type: type, 
                        size: fs.lstatSync(current).size
                        , 
                        atime: fs.lstatSync(current).atime.getTime()
                        , 
                        mtime: fs.lstatSync(current).mtime.getTime()
                        , 
                        link: link
                    };
            };
            files.sort();
            for (var i = 0, z = (files.length - 1); i <= z; i++) {
                current = (dirpath + files[i]);
                current = verify.replaceAll(current, '\\', '/');
                relpath = current.replace(basepath, "");
                fs.lstatSync(current).isSymbolicLink() ? link = true : link = false;
                if (fs.lstatSync(current).isDirectory()) {
                    output_dirs.push(createItem(files[i], current, relpath, "directory", link)
                    );
                }
                else {
                    output_files.push(createItem(files[i], current, relpath, "file", link)
                    );
                }
            }
            var pd = getParentDirs(dirpath, basepath);
            output = {
                curdirname: pd.curdirname, 
                curdirpath: pd.curdirpath, 
                dirs: output_dirs, 
                files: output_files, 
                parents: pd.parents
            };
            callback(null, output);
        }
    });
}
function createDir(dirpath,cmode,callback) {
    fs.mkdir(dirpath, cmode, function(err,data) {
        callback(err, data);
    });
}
function copyDir(dirpath,destination,callback) {
    fs.copy(dirpath, destination, function(err) {
        callback(err);
    });
}
function deleteDir(dirpath,callback) {
    fs.remove(dirpath, function(err) {
        callback(err);
    });
}
var getBasePath = function(path) {
    path = verify.replaceAll(path, '\\', '/');
    var base_path = path.split("/");
    base_path.pop();
    return base_path.join("/");
};
var getParentDirs = function(path,basepath) {
    path = normalizePath(path);
    basepath = normalizePath(basepath);
    var relpath = path.replace(basepath, "");
    relpath = relpath.substr(0, 1) === '/' ? relpath.substr(1) : relpath;
    relpath = relpath.substr(- (1), 1) === '/' ? relpath.substr(0, (relpath.length - 1)) : relpath;
    if (relpath.length == 0) {
        return {
                curdirname: '/', 
                curdirpath: '/', 
                parents: []
            };
    }
    console.log('getParentDirs', relpath);
    var parents = relpath.split("/");
    var curdirname = parents.pop();
    var dp = '/',
        ret = [
            {
                name: '..', 
                dirpath: '/'
            }
        ];
    parents.forEach(function(item) {
        dp += item;
        ret.push({
            name: ('.. ' + item), 
            dirpath: dp
        });
        dp += '/';
    });
    return {
            curdirname: curdirname, 
            curdirpath: ('/' + relpath), 
            parents: ret
        };
};
var normalizePath = function(path) {
    return verify.replaceAll(path, '\\', '/');
};
var merge = function(obj1,obj2) {
    var mobj = {},
        attrname;
    for (attrname in obj1) {
        mobj[attrname] = obj1[attrname];
    }
    for (attrname in obj2) {
        mobj[attrname] = obj2[attrname];
    }
    return mobj;
};
module.exports = {
    checkItemName: checkItemName,
    checkPath: checkPath,
    pathExists: pathExists,
    isFile: isFile,
    isDir: isDir,
    getFile: getFile,
    renameFile: renameFile,
    saveFile: saveFile,
    copyFile: copyFile,
    deleteFile: deleteFile,
    getDir: getDir,
    createDir: createDir,
    copyDir: copyDir,
    deleteDir: deleteDir
};

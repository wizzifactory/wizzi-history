var fs = require("fs-extra");
var verify = require("../../lib/util/verify");
var sanitize = require("./sanitize");

var md = module.exports = {};

md.checkItemName = function (name) {
    return name === sanitize(name, { replacement: '_' });
}

md.checkPath = function (filepath) {
    var base_path = getBasePath(filepath);
    return fs.existsSync(base_path);
}

md.pathExists = function (filepath) {
    return fs.existsSync(filepath);
}

md.isFile = function (filepath) {
    return md.pathExists(filepath) && 
        fs.lstatSync(filepath).isDirectory() === false;
}

md.isDir = function (filepath) {
    return md.pathExists(filepath) && 
        fs.lstatSync(filepath).isDirectory() === true;
}

md.getFile = function (filepath, callback) {
    fs.readFile(filepath, "utf8", function (err, data) {
        callback(err, data);
    });
}

md.renameFile = function (filepath, newname, callback) {
    var base_path = getBasePath(filepath);
    fs.rename(filepath, base_path + "/" + newname, function (err, data) {
        callback(err, data);
    });
}

md.saveFile = function (filepath, content, callback) {
    fs.writeFile(filepath, content, function(err, data) {
        callback(err, data);
    });
}

md.copyFile = function (dirpath, destination, callback) {
    fs.copy(dirpath, destination, function (err) {
        callback(err);
    });
}

md.deleteFile = function (dirpath, callback) {
    fs.remove(dirpath, function (err) {
        callback(err);
    });
}

md.getDir = function (dirpath, basepath, callback) {

    fs.readdir(dirpath, function (err, files) {
        if (err) {
            callback(err, null);
        } else {
                    
            // Ensure ending slash on dirpath
            (dirpath.slice(-1)!=="/") ? dirpath = dirpath + "/" : dirpath = dirpath;
                
            var output = {},
                // output_dirs = {},
                // output_files = {},
                output_dirs = [],
                output_files = [],
                current,
                relpath,
                link;

            // Function to build item for output objects
            //var createItem = function (current, relpath, type, link) {
            //    return {
            //        dirpath: relpath.replace('//','/'),
            //        type: type,
            //        size: fs.lstatSync(current).size,
            //        atime: fs.lstatSync(current).atime.getTime(),
            //        mtime: fs.lstatSync(current).mtime.getTime(),
            //        link: link
            //    };
            //};
                    
            var createItem = function (name, current, relpath, type, link) {
                return {
                    name: name,
                    dirpath: relpath.replace('//', '/'),
                    type: type,
                    size: fs.lstatSync(current).size,
                    atime: fs.lstatSync(current).atime.getTime(),
                    mtime: fs.lstatSync(current).mtime.getTime(),
                    link: link
                };
            };

            // Sort alphabetically
            files.sort();
                    
            // Loop through and create two objects
            // 1. Directories
            // 2. Files
            for (var i=0, z=files.length-1; i<=z; i++) {
                current = dirpath + files[i];
                current = verify.replaceAll(current, '\\', '/');
                relpath = current.replace(basepath, "");
                (fs.lstatSync(current).isSymbolicLink()) ? link = true : link = false;
                if (fs.lstatSync(current).isDirectory()) {
                    // output_dirs[files[i]] = createItem(current,relpath,"directory",link);
                    output_dirs.push(createItem(files[i], current, relpath, "directory", link));
                } else {
                    output_files.push(createItem(files[i], current,relpath,"file",link));                            
                }
            }
                    
            // Merge so we end up with alphabetical directories, then files
            // output = merge(output_dirs,output_files);
            var pd = getParentDirs(dirpath, basepath);
            output = {
                curdirname: pd.curdirname,
                curdirpath: pd.curdirpath,
                dirs: output_dirs,
                files: output_files,
                parents: pd.parents
            };
                    
            // Send output
            callback(null, output);
        }
    });
}

md.createDir = function (dirpath, cmode, callback) {
    fs.mkdir(dirpath, cmode, function (err, data) {
        callback(err, data);
    });
}

md.copyDir = function (dirpath, destination, callback) {
    fs.copy(dirpath, destination, function(err) {
        callback(err);
    });
}

md.deleteDir = function (dirpath, callback) {
    fs.remove(dirpath, function (err) {
        callback(err);
    });
}

/**
 * Get Base Path
 */
var getBasePath = function (path) {
    path = verify.replaceAll(path, '\\', '/');
    var base_path = path.split("/");
    base_path.pop();
    return base_path.join("/");
};

/**
 * Get parent dirs
 */
var getParentDirs = function (path, basepath) {
    path = normalizePath(path);
    basepath = normalizePath(basepath);
    var relpath = path.replace(basepath, "");
    relpath = relpath.substr(0, 1) === '/' ? relpath.substr(1) : relpath;
    relpath = relpath.substr(-1, 1) === '/' ? relpath.substr(0, relpath.length - 1) : relpath;
    if (relpath.length == 0) return {
        curdirname: '/',
        curdirpath: '/',
        parents: []
    };
    console.log('getParentDirs', relpath);
    var parents = relpath.split("/");
    var curdirname = parents.pop();
    var dp = '/', ret = [{ name: '..', dirpath: '/' }];
    parents.forEach(function (item) {
        dp += item;
        ret.push({ name: '.. ' + item, dirpath: dp });
        dp += '/';
    });
    return {
        curdirname: curdirname,
        curdirpath: '/' + relpath,
        parents: ret
    };
};

/**
 * Normalize path
 */
var normalizePath = function (path) {
    return verify.replaceAll(path, '\\', '/');
}

/**
 * Merge function
 */
var merge = function (obj1, obj2) {
    var mobj = {},
        attrname;
    for (attrname in obj1) { mobj[attrname] = obj1[attrname]; }
    for (attrname in obj2) { mobj[attrname] = obj2[attrname]; }
    return mobj;
};

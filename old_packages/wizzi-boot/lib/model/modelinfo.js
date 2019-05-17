var util = require("util");
var path = require("path");
var verify = require('../util/verify');
var log = require('../util/log')(module);
var file = require('../util/file');
var modelInfoCount = 0;
// see the clone method for a detail of the config parameter
/*
    param config = {
        cwd:String,
        src:String,
        ignore:String,
        schema:String,
        contexts:Object, // ModelInfo configs for context objects
        coll:Object {
            name:String
            itemName:String
            pathTemplateValues:Array of {
                token:String
                attribute:String
                function:Function
            }
        }
        modelRef:Object {
            exportName:String
        }
    };
*/
var ModelInfo = function (config) {
    config.id = 'mi_' + (++modelInfoCount);
    this.id = config.id;
    this.config = config;
    this.schema = config.schema;
    var contexts = [];
    if (verify.isArray(config.contexts)) {
        config.contexts.forEach(function (item) {
            contexts.push(new ModelInfo(item));
        });
    }
    this.contexts = contexts;
    this.transformers = config.transformers;
    this.coll = config.coll;
    this.exportName = config.exportName;
    this.___state = null; // pman state
    if (verify.isString(config.src) === false) {
        this.error("config.src must be a string");
    } else {
        this.generatorRequireContextOnly = false;
        if (config.src === 'context') {
            this.generatorRequireContextOnly = true;
        } else {
            config.src = file.unixifyPath(config.src);
            if (verify.isString(config.cwd)) {
                config.cwd = file.unixifyPath(config.cwd);
            }
            var ndx = config.src.indexOf('/*');
            // console.log('ModelInfo.config.src', config.cwd, config.src, ndx);
            if (ndx > -1) {
                config.srcPattern = config.src.substr(ndx);
                config.src = config.src.substr(0, ndx);
                // console.log(config.src, config.srcPattern);
            }
        }
    }
    if (this.generatorRequireContextOnly == false) {
        if (verify.isAbsolutePath(config.src) === false && verify.isEmpty(config.cwd) === true) {
            this.error("when config.src is not an absolute path, config.cwd must be a not empty string");
        }
    }
}
ModelInfo.prototype.src = function (value) {
    if (this.generatorRequireContextOnly == true) return null;
    if (typeof value === 'undefined')
        return this.config.src;
    else
        this.config.src = value;
}
ModelInfo.prototype.srcFullPath = function () {
    if (this.generatorRequireContextOnly == true) return null;
    return verify.isAbsolutePath(this.config.src)
        ? this.config.src
        : path.join(this.config.cwd, this.config.src);
}
ModelInfo.prototype.ignoreFullPath = function () {
    return verify.isAbsolutePath(this.config.ignore)
        ? this.config.ignore
        : path.join(this.config.cwd, this.config.ignore);
}
ModelInfo.prototype.srcGlobPath = function () {
    var globPattern = this.config.srcPattern || '/**/*.*'
    if (globPattern.substr(0, 1) !== '/') globPattern = '/' + globPattern;
    return this.srcFullPath() + globPattern;
}
ModelInfo.prototype.srcGlobOptions = function () {
    var ret = {};
    if (this.config.ignore) {
        ret.ignore = [this.ignoreFullPath()];
    }
    return ret;
}
ModelInfo.prototype.state = function (value) {
    if (typeof value === 'undefined')
        return this.___state;
    else {
        if (verify.isObject(value) === false) {
            throw new Error("value parameter must be an object.");
        }
        if (verify.isObject(value.pman) === false) {
            throw new Error("value parameter must contain an object in the pman property.");
        }
        this.___state = value;
        this.config.___state = value;
    }
}
ModelInfo.prototype.hasContext = function () {
    return verify.isArray(this.config.contexts) && this.config.contexts.length > 0;
}
ModelInfo.prototype.getContextCollectionInfo = function () {
    if (this.hasContext()) {
        for (var i = 0; i < this.config.contexts.length; i++) {
            var item = this.config.contexts[i];
            if (verify.isObject(item.coll)) return item.coll;
        }
    }
    return null;
}
ModelInfo.prototype.getModelInfos = function (options) {
    if (this.isDirectory()) {
        var ret = [], files = this.getFiles(options);
        for (var i = 0; i < files.length; i++) {
            var fileInfo = files[i];
            var mi = this.clone();
            mi.src(fileInfo.relpath);
            mi.state(this.___state);
            ret.push(mi);
        }
        return ret;
    } else {
        return [this];
    }
}
ModelInfo.prototype.getSource = function () {
    if (this.exists() === false) {
        throw new Error("Cannot get source. File not found : " + this.srcFullPath());
    }
    return file.read(this.srcFullPath());
}
ModelInfo.prototype.getSources = function () {
    if (this.exists() === false) {
        throw new Error("Cannot get sources. Directory not found : " + this.srcFullPath());
    }
    if (this.isDirectory() === false) {
        throw new Error("Cannot get sources. Is not a directory : " + this.srcFullPath());
    }
    var ret = [];
    var files = this.getFiles(); // deep search
    for (var i = 0; i < files.length; i++) {
        var fileInfo = files[i];
        var content = file.read(fileInfo.fullpath);
        ret.push({
            fullpath: fileInfo.fullpath,
            relpath: fileInfo.relpath,
            content: content
        });
    }
    return ret;
}
ModelInfo.prototype.getFiles = function (options) {
    if (this.exists() === false) {
        throw new Error("Cannot get files. Directory not found : " + this.srcFullPath());
    }
    if (this.isDirectory() === false) {
        throw new Error("Cannot get files. Is not a directory : " + this.srcFullPath());
    }
    var ret = [],
        srcFullPath = this.srcFullPath(),
        srcGlobPath = this.srcGlobPath(),
        files = file.getGlobbedFilesEx(srcGlobPath, this.srcGlobOptions());
    // console.log('srcGlobPath', srcGlobPath, files, files.length);
    for (var i = 0; i < files.length; i++) {
        var fileInfo = files[i];
        if (fileInfo.indexOf('/_debug/') > -1) continue;
        if (!options.final) {
            if (fileInfo.indexOf('__copy/') >= 0 || fileInfo.indexOf('/t/') >= 0) continue;
        }
        // console.log('ModelInfo.prototype.getFiles', fileInfo);
        var fullpath = fileInfo; /* path.join(srcFullPath, fileInfo); */
        var relpath = relPath(fullpath, this.config.cwd);
        ret.push({
            fullpath: fullpath,
            relpath : relpath,
            });
    }
    return ret;
}
ModelInfo.prototype.exists = function () {
    return file.exists(this.srcFullPath());
}
ModelInfo.prototype.isDirectory = function () {
    return file.isDirectory(this.srcFullPath());
}
ModelInfo.prototype.clone = function () {
    var newconfig = {
        cwd: this.config.cwd,
        src: this.config.src,
        schema: this.config.schema,
        contexts: this.config.contexts,
        transformers: this.config.transformers,
        coll: this.config.coll
    };
    var ret = new ModelInfo(newconfig);
    ret.state(this.state());
    return ret;
}
ModelInfo.prototype.error = function (message) {
    throw new Error('Error. wizzi-factory.ModelInfo: ' + message + '.\n' + this.toString());
}
ModelInfo.prototype.toString = function () {
    return 'config: ' + util.inspect(this.config, { depth: 2 });
}
ModelInfo.prototype.terminate = function () {
    delete this.___state;
    delete this.config.___state;
}
function relPath(fullpath, basedir) {
    return fullpath.substr(basedir.length + 1);
}
module.exports = ModelInfo;

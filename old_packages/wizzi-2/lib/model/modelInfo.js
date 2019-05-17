/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\model\modelInfo.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
// generated by js.module.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require("util");
var assert = require("assert");
var path = require("path");
var async = require("async");
var errors = require('../errors');
var verify = require('../util/verify');
var log = require('../util/log')(module)

;
var ittfs = require('../ittf/fs');

/**
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

function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}


var modelInfoCount = 0;

var ModelInfo = (function () {
    function ModelInfo(config) {
        _classCallCheck(this, ModelInfo);
        config.id = ('mi_' + ++modelInfoCount);
        this.id = config.id;
        this.config = config;
        this.schema = config.schema;
        this.contexts = [];
        if (verify.isArray(config.contexts)) {
            var i, i_len=config.contexts.length, item;
            for (i=0; i<i_len; i++) {
                item = config.contexts[i];
                this.contexts.push(new ModelInfo(item));
            }
        }
        this.transformers = config.transformers;
        this.coll = config.coll;
        this.exportName = config.exportName;
        
        if (verify.isString(config.src) === false) {
            throw this.error("config.src must be a string");
        }
        else {
            this.generatorRequireContextOnly = false;
            if (config.src === 'context') {
                this.generatorRequireContextOnly = true;
            }
            else {
                config.src = ittfs.unixifyPath(config.src);
                if (verify.isString(config.cwd)) {
                    config.cwd = ittfs.unixifyPath(config.cwd);
                }
                var ndx = config.src.indexOf('/*');
                if (ndx > -1) {
                    config.srcPattern = config.src.substr(ndx);
                    config.src = config.src.substr(0, ndx);
                }
            }
        }
        if (this.generatorRequireContextOnly == false) {
            if (verify.isAbsolutePath(config.src) === false && verify.isEmpty(config.cwd) === true) {
                throw this.error("when config.src is not an absolute path, config.cwd must be a not empty string");
            }
        }
    }
    ModelInfo.prototype.src = function(value) {
        if (this.generatorRequireContextOnly == true) {
            return null;
        }
        if (typeof (value) === 'undefined') {
            return this.config.src;
        }
        else {
            this.config.src = value;
        }
    }
    ModelInfo.prototype.srcFullPath = function() {
        if (this.generatorRequireContextOnly == true) {
            return null;
        }
        return verify.isAbsolutePath(this.config.src) ? this.config.src : path.join(this.config.cwd, this.config.src)
        ;
    }
    ModelInfo.prototype.ignoreFullPath = function() {
        return verify.isAbsolutePath(this.config.ignore) ? this.config.ignore : path.join(this.config.cwd, this.config.ignore)
        ;
    }
    ModelInfo.prototype.srcGlobPath = function() {
        var globPattern = this.config.srcPattern || '/**/*.*';
        if (globPattern.substr(0, 1) !== '/') {
            globPattern = ('/' + globPattern);
        }
        return this.srcFullPath() + globPattern;
    }
    ModelInfo.prototype.srcGlobOptions = function() {
        var ret = {};
        if (this.config.ignore) {
            ret.ignore = [this.ignoreFullPath()];
        }
        return ret;
    }
    ModelInfo.prototype.productionManager = function(value) {
        if (typeof (value) === 'undefined') {
            return this.productionManagerInstance;
        }
        else {
            if (verify.isObject(value) === false) {
                throw new Error("value parameter must be an object. Instead is: " + value);
            }
            this.productionManagerInstance = value;
        }
    }
    ModelInfo.prototype.hasContext = function() {
        return verify.isArray(this.config.contexts) && this.config.contexts.length > 0;
    }
    ModelInfo.prototype.getContextCollectionInfo = function() {
        if (this.hasContext()) {
            var i, i_len=this.config.contexts.length, item;
            for (i=0; i<i_len; i++) {
                item = this.config.contexts[i];
                if (verify.isObject(item.coll)) {
                    return item.coll;
                }
            }
        }
        return null;
    }
    ModelInfo.prototype.getModelInfos = function(options,callback) {
        var that = this;
        this.isDirectory(function(err,isDirectory) {
            if (err) {
                return callback(err)
                ;
            }
            if (isDirectory) {
                var ret = [];
                that.getFiles(options, function(err,files) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    if (files.__is_error) {
                        return callback(files);
                    }
                    for (var i = 0; i < files.length; i++) {
                        var fileInfo = files[i];
                        var mi = that.clone();
                        mi.src(fileInfo.relpath);
                        mi.productionManager(that.productionManagerInstance);
                        ret.push(mi);
                    }
                    return callback(null, ret)
                    ;
                });
            }
            else {
                return callback(null, [
                        that
                    ])
                ;
            }
        });
    }
    ModelInfo.prototype.clone = function() {
        var newconfig = {
            cwd: this.config.cwd, 
            src: this.config.src, 
            schema: this.config.schema, 
            contexts: this.config.contexts, 
            transformers: this.config.transformers, 
            coll: this.config.coll
        };
        var ret = new ModelInfo(newconfig);
        return ret;
    }
    ModelInfo.prototype.error = function(message,method) {
        var err = {
            __is_error: true, 
            message: message, 
            source: "wizzi/lib/model/modelInfo/" + method
        };
        logme(err);
        return err;
    }
    ModelInfo.prototype.toString = function() {
        return 'modelInfo.config: ' + util.inspect(this.config, {depth: 2});
    }
    ModelInfo.prototype.terminate = function() {
    }
    ModelInfo.prototype.getSource = function(callback) {
        assert.equal("function", typeof(callback));
        var that = this;
        this.exists(function(err,exists) {
            if (err) {
                return callback(err)
                ;
            }
            if (!exists) {
                callback(that.error("Cannot get source. File not found : " + that.srcFullPath(), 'getSource')
                );
            }
            that.isFile(function(err,isFile) {
                if (err) {
                    return callback(err)
                    ;
                }
                if (!isFile) {
                    callback(that.error("Cannot get source. Is not a file : " + that.srcFullPath(), 'getSource')
                    );
                }
                ittfs.read(that.srcFullPath(), callback);
            });
        });
    }
    ModelInfo.prototype.getSources = function(callback) {
        assert.equal("function", typeof(callback));
        var that = this;
        this.exists(function(err,exists) {
            if (err) {
                return callback(err)
                ;
            }
            if (!exists) {
                callback(that.error("Cannot get sources. Directory not found : " + that.srcFullPath(), 'getSources')
                );
            }
            that.isDirectory(function(err,isDirectory) {
                if (err) {
                    return callback(err)
                    ;
                }
                if (!isDirectory) {
                    callback(that.error("Cannot get sources. Is not a directory : " + that.srcFullPath(), 'getSources')
                    );
                }
                that.getFiles({}, function(err,fileInfos) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    async.map(fileInfos, function(fileInfo,callback) {
                        ittfs.read(fileInfo.fullpath, function(err,content) {
                            if (err) {
                                return callback(err)
                                ;
                            }
                            callback(null, {
                                fullpath: fileInfo.fullpath, 
                                relpath: fileInfo.relpath, 
                                content: content
                            });
                        });
                    }, function(err,fileContents) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        callback(null, fileContents);
                    });
                });
            });
        });
    }
    ModelInfo.prototype.getFiles = function(options,callback) {
        assert.equal("function", typeof(callback));
        var that = this;
        this.exists(function(err,exists) {
            if (err) {
                return callback(err)
                ;
            }
            if (!exists) {
                callback(that.error("Cannot get files. Directory not found : " + that.srcFullPath(), 'getFiles')
                );
            }
            that.isDirectory(function(err,isDirectory) {
                if (err) {
                    return callback(err)
                    ;
                }
                if (!isDirectory) {
                    callback(that.error("Cannot get files. Is not a directory : " + that.srcFullPath(), 'getFiles')
                    );
                }
                var ret = [],
                    srcFullPath = that.srcFullPath(),
                    srcGlobPath = that.srcGlobPath();
                ittfs.getGlobbedFiles(srcGlobPath, that.srcGlobOptions(), function(err,files) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    for (var i = 0; i < files.length; i++) {
                        var fileInfo = files[i];
                        // skip "_debug" folder
                        if (fileInfo.indexOf('/_debug/') > -1) {
                            continue;
                        }
                        // skip "__copy" and "t" folders
                        if (!options.final) {
                            if (fileInfo.indexOf('__copy/') >= 0 || fileInfo.indexOf('/t/') >= 0) {
                                continue;
                            }
                        }
                        var fullpath = fileInfo;
                        var relpath = that.config.cwd ? relPath(fullpath, that.config.cwd)
                         : null;
                        ;
                        ret.push({
                            fullpath: fullpath, 
                            relpath: relpath
                        });
                    }
                    callback(null, ret);
                });
            });
        });
    }
    ModelInfo.prototype.exists = function(callback) {
        assert.equal("function", typeof(callback));
        ittfs.exists(this.srcFullPath(), callback);
    }
    ModelInfo.prototype.isDirectory = function(callback) {
        assert.equal("function", typeof(callback));
        ittfs.isDirectory(this.srcFullPath(), callback);
    }
    ModelInfo.prototype.isFile = function(callback) {
        assert.equal("function", typeof(callback));
        ittfs.isFile(this.srcFullPath(), callback);
    }
    ModelInfo.prototype.getWizziModelFactory = function(callback) {
        if (!this.productionManager()) {
            return callback(this.error("Method called without setting the 'productionManager' object", "getWizziModelFactory")
                )
            ;
        }
        if (!this.schema) {
            return callback(this.error("Method called without setting the 'schema' name", "getWizziModelFactory")
                )
            ;
        }
        var wizziModelFactory = this.productionManager().getWizziModelFactory(this.schema)
        ;
        if (wizziModelFactory == null) {
            return callback(new errors.NotFoundError('WizziModelFactory', this.schema, this))
            ;
        }
        else {
            callback(null, wizziModelFactory);
        }
    }
    ModelInfo.prototype.getModelTransformer = function(trasformerName,callback) {
        if (!this.productionManager()) {
            return callback(this.error("Method called without setting the 'productionManager' object", "getModelTransformer")
                )
            ;
        }
        var modelTransformer = this.productionManager().getModelTransformer(trasformerName)
        ;
        if (modelTransformer == null) {
            return callback(new errors.NotFoundError('modelTransformer', trasformerName, this))
            ;
        }
        else {
            callback(null, modelTransformer);
        }
    }
    ModelInfo.prototype.getArtifactGenerator = function(generatorName,callback) {
        if (!this.productionManager()) {
            return callback(this.error("Method called without setting the 'productionManager' object", "getArtifactGenerator")
                )
            ;
        }
        var generator = this.productionManager().getArtifactGenerator(generatorName)
        ;
        if (generator == null) {
            return callback(new errors.NotFoundError('generator', generatorName, this))
            ;
        }
        else {
            callback(null, generator);
        }
    }
    return ModelInfo;
})();

function relPath(fullpath,basedir) {
    return fullpath.substr(basedir.length + 1);
}

module.exports = {
    ModelInfo: ModelInfo
};

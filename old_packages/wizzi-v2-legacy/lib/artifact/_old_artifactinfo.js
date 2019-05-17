var assert = require('assert');
var path = require('path');
var util = require('util');
var verify = require('../util/verify');
var errors = require('../errors');
var fail = require('../util/fail');
var log = require('../util/log')(module);
var interpolate = require('../util/interpolate');
var ModelInfo = require("../model/modelinfo");
function logme() {
    if (false) console.log.apply(console, arguments);
}
/*
    ArtifactInfo is a wrapper around an @artifact@ element
    of a @wfjob@ wizzi model.
    The config parameter has already been preprocessed 
    by the lib/production/wfjob.js module.
    param config:Object {
            name:String,
            options:Object {
                basedir:String // Uri
                dotgExtensionPrefix:Boolean
            },
            model:Object {
            },
            isWfJob:Boolean,
            transformers:Array {
                name:String
                dumpFile:String    // Uri
            },
            gen:Object {
                generator:String // generator name
            },
            dest:Object {
                fullpath:String    // Uri
                folder:String      // a basepath Uri, may be relative
                baseFolder:String  // a basepath Uri (required when folder is relative)
                path:String        // relative path
                extension:String
            }
          }
*/
var ArtifactInfo = function (config) {
    this.name = config.name;
    this.options = config.options;
    if (verify.isObject(config.model)) {
        this.modelInfo = new ModelInfo(config.model);
        this.contextInfos = null;
    } else {
        // this is a code write artifact
        this.contextInfos = [];
        config.contexts.forEach(function (item) {
            this.contextInfos.push(new ModelInfo(item))
        });
        this.modelInfo = null;
    }
    this.isWfJob = config.isWfJob;
    this.transformers = config.transformers;
    this.gen = config.gen;
    this.dest = config.dest;
    this.wfjob = config.wfjob;
    this.genWriters = [];
};
// called by the production manager
ArtifactInfo.prototype.initialize = function (productionManager, globalContextObject) {
    this.___state = productionManager.___state;
    this.globalContextObject = globalContextObject;
    if (this.modelInfo) {
        this.modelInfo.state(productionManager.___state);
        this.modelInfo.globalContext(globalContextObject);
    } else {
        this.contextInfos.forEach(function (item) {
            item.state(productionManager.___state);
            item.globalContext(globalContextObject);
        });
    }
    // merge production and artifact options
    var save = this.options || {};
    this.options = productionManager.options;
    for (key in save) {
        this.options[key] = save[key];
    }
}
/*
    An ArtifactInfo may have one or many genWriters.
    It has many genWriters when:
    . is a collection artifact and has a genWriter for each collection item
    . its model.src has wildcards and must be globbed
*/
ArtifactInfo.prototype.addGenWriter = function (ctx) {
    this.genWriters.push(ctx);
}
ArtifactInfo.prototype.isWizziFactoryJob = function () {
    return this.modelInfo != null &&
           this.modelInfo.getContextCollectionInfo() == null &&
           this.isWfJob;
}
ArtifactInfo.prototype.isWizziModelArtifact = function () {
    return this.modelInfo != null &&
           this.modelInfo.getContextCollectionInfo() == null &&
           verify.isObject(this.gen) &&
           verify.isNotEmpty(this.gen.generator) &&
           this.gen.generator !== 'swig';
}
ArtifactInfo.prototype.isWizziCollectionArtifact = function () {
    return this.modelInfo != null &&
           verify.isObject(this.modelInfo.getContextCollectionInfo()) &&
           verify.isObject(this.gen);
}
ArtifactInfo.prototype.isSwigArtifact = function () {
    return this.modelInfo != null &&
           verify.isObject(this.gen) &&
           this.gen.generator === 'swig';
}
ArtifactInfo.prototype.isCodeWriteArtifact = function () {
    return this.modelInfo == null &&
           verify.isObject(this.gen) &&
           verify.isNotEmpty(this.gen.generator);
}
ArtifactInfo.prototype.isFinalArtifact = function () {
    return this.modelInfo != null &&
           (verify.isObject(this.gen) === false ||
           verify.isEmpty(this.gen.generator));
}
/*
    Returns a collection of infos for persisting to file
    the generated artifacts of a this artifactInfo instance.
    [
        {
            artifactInfo: ..., // the artifact config info (this object)
            genWriter: ..., // contains the generated text
            filepath: ... // the filepath to write to
        }
    ]
    Is called by the production/persister.js
*/
ArtifactInfo.prototype.getItemsToPersistToFile = function () {
    var self = this;
    var check = {};
    var result = [];
    this.genWriters.forEach(function (genWriter) {
        var srcPath = genWriter.srcPath; 
        if (self.isWizziCollectionArtifact()) {
            var collectionItem = genWriter.model; // Required for resolving filepath.
            assert.strictEqual(verify.isObject(collectionItem), true, 'genWriter.model must contain an object.');
            var ipcontext = self.getInterpolatePathNameContext(collectionItem);
            var filepath = interpolate(self.getDestinationUri(srcPath), ipcontext, { delimiter: '{}' })
            logme('ArtifactInfo.getItemsToPersistToFile.ipcontext', ipcontext, 'filepath', filepath);
            if (check[filepath]) {
                self.error(
                    "Duplicated destination filepath: " + filepath,
                    "getItemsToPersistToFile"
                    );
            }
            check[filepath] = true;
            var persisteable = {
                artifactInfo: self,
                genWriter: genWriter,
                filepath: filepath
            };
            result.push(persisteable);
        } else {
            var filepath = self.getDestinationUri(srcPath);
            var persisteable = {
                artifactInfo: self,
                genWriter: genWriter,
                filepath: filepath
            };
            result.push(persisteable);
        }
    });
    return result;
}
/*
    Input: an item of the model collection that drives the generation
           of this artifact.
*/
ArtifactInfo.prototype.getInterpolatePathNameContext = function (collectionItem) {
    // console.log('ArtifactInfo.getInterpolatePathNameContext.collectionItem', util.inspect(collectionItem, { depth: 2 }));
    if (this.isWizziCollectionArtifact()) {
        var self = this;
        var result = {};
        var info = this.modelInfo.getContextCollectionInfo();
        info.pathTemplateValues.forEach(function (templValue) {
            if (templValue.function) {
                result[templValue.token] = collectionItem[templValue.function]();
                if (verify.isEmpty(result[templValue.token])) {
                    self.error(
                        'the path template value function must return a not empty string for token: "' + templValue.token + '"',
                        'getInterpolatePathNameContext'
                        );
                }
            }
            else if (templValue.attribute) {
                result[templValue.token] = collectionItem[templValue.attribute];
                logme('result[templValue.token]', result[templValue.token], verify.isEmpty(result[templValue.token]));
                if (verify.isEmpty(result[templValue.token])) {
                    self.error(
                        'the path template value attribute "' + templValue.attribute + '" must return a not empty string for token: "' + templValue.token + '"',
                        'getInterpolatePathNameContext'
                        );
                }
            }
            else {
                self.error(
                    'path template value must contain an attribute or a function value for token: "' + templValue.token + '"',
                    'getInterpolatePathNameContext'
                );
            }
        });
        // console.log('ArtifactInfo.getInterpolatePathNameContext.result', util.inspect(result, { depth: 2 }));
        return result;
    } else {
        self.error(
            "Method called on an artifact that is not a wizzi collection artifact.",
            'getInterpolatePathNameContext'
            );
    }
}
ArtifactInfo.prototype.getDestinationUri = function (srcPath) {
    var dest = this.dest;
    var opt = this.options;
    var msg = ['ArtifactInfo.getDestinationUri', 'config.dest'];
    if (verify.isNotEmpty(dest.fullpath)) {
        return dest.fullpath; // ok its enough, dest contains a fullpath
    }
    // console.log('+++ getDestinationUri.dest.srcPath', srcPath);
    // console.log('+++ getDestinationUri.dest.path', dest.path);
    if (verify.isEmpty(dest.folder)) this.error(
        'A not empty dest.folder is required',
        'getDestinationUri'
        );
    var destpath;
    if (dest.path && verify.isAbsolutePath(dest.path)) {
        destpath = path.join(dest.path, srcPath);
        // console.log('+++ getDestinationUri.destpath', destpath);
    } else {
        srcPath = dest.path ? dest.path : srcPath;
        if (verify.isEmpty(srcPath)) this.error(
            'A not empty srcPath is required',
            'getDestinationUri'
            );
        destpath = path.join(dest.folder, srcPath);
    }
    if (this.isFinalArtifact() === false) {
        var ext;
        if (dest.extension === '@@null') {
            ext = ""
        } else {
            var ext = dest.extension || '.js'; // hardcoded default
            ext = verify.startsWith(ext, '.') ? ext : '.' + ext;
            if (ext.toLowerCase() !== '.ittf') {
                if (destpath.substr(-5, 5).toLowerCase() === '.ittf') {
                    destpath = destpath.substr(0, destpath.length - 5);
                }
            }
            ext = verify.endsWith(destpath, ext) ? '' : this.options.dotgExtensionPrefix ? '.g' + ext : ext;
        }
        destpath = destpath + ext;
    } else {
        // isFinalArtifact 
        if (destpath.indexOf('__copy') >= 0) {
            destpath = verify.replaceAll(destpath, '__copy', '');
        }
    }
    
    if (verify.isAbsolutePath(destpath)) return destpath;
    if (verify.isEmpty(dest.baseFolder)) this.error(
        'When dest.folder is a relative path, a not empty dest.baseFolder value is required.',
        'getDestinationUri'
        );
    return path.join(dest.baseFolder, destpath);
}
ArtifactInfo.prototype.error = function (message1, method) {
    logme(message1);
    var error = new errors.ArtifactGenerationError(
        message1, "wizzi/lib/production/artifactinfo.js/" + method, this.modelInfo
    );
    fail.warn(error);
    throw error;
}
ArtifactInfo.prototype.dump = function () {
    throw new Error('Not implemented');
}
ArtifactInfo.prototype.relPath = function () {
    if (this.modelInfo)
        return this.modelInfo.srcFullPath().substr(this.options.basedir.length + 1);
    else
        return 'null';
}
ArtifactInfo.prototype.toString = function () {
    // console.log('ArtifactInfo.options', util.inspect(this.options, { depth: 1 }));
    return [
        'model.src:', this.relPath(),
        'gen.generator:', this.gen ? this.gen.generator : ''
    ].join(' ');
}
ArtifactInfo.prototype.terminate = function () {
    delete this.___state;
    if (this.modelInfo) {
        this.modelInfo.terminate();
    }
    if (this.contextInfos) {
        this.contextInfos.forEach(function (item) {
            item.terminate();
        });
    }
    if (this.genWriters) {
        this.genWriters.forEach(function (item) {
            item.terminate();
        });
    }
}
ArtifactInfo.isArtifactConfig = function (test) {
    if (!test) return false;
    if (!verify.isObject(test.options)) return false;
    if (!verify.isObject(test.model) && !verify.isObject(test.contexts)) return false;
    if (!verify.isObject(test.dest)) return false;
    if (!verify.isObject(test.gen)) return false;
    return true;
}
ArtifactInfo.isArtifactInstance = function (test) {
    throw new Error('Not implemented');
}
module.exports = ArtifactInfo;

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\production\runner.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
// generated by js.module.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var assert = require('assert');
var path = require('path');
var util = require('util');
var verify = require('../util/verify');
var log = require('../util/log')(module)

;
var GenWriter = require('../artifact/GenWriter');
var AsyncModelLoader = require('../model/asyncModelLoader');
var AsyncArtifactGenerator = require('../artifact/asyncArtifactGenerator').AsyncArtifactGenerator;
var AsyncWfJobRunner = require('./asyncWfJobRunner');

/**
     Async artifact generation runner.
     A runner instance runs a single artifactInfo.
     Input: an ArtifactInfo (constructor injected).
     Output: the ArtifactInfo enriched with (one or many) writeContext(s),
     ready to be persisted (callback ok result).
     A Runner can run
     a WfJob
     a ModelArtifact
     a CollectionArtifact
     a CodeWriteArtifact
     a FinalArtifact
*/

function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}


var Runner = (function () {
    function Runner(artifactInfo) {
        _classCallCheck(this, Runner);
        this.artifactInfo = artifactInfo;
        log.setLevel((artifactInfo.options.verbose || 0));
    }
    Runner.prototype.run = function(callback) {
        if (this.artifactInfo.modelInfo) {
            /**
                VIA
                logme("Runner.run modelInfo", 'isDirectory', this.artifactInfo.modelInfo.isDirectory(), 'config', util.inspect(this.artifactInfo.modelInfo.config, {
                    depth: 3
                })
                )
            */
            this._runOnModelInfo(this.artifactInfo.modelInfo, callback);
        }
        else {
            this._runOnContextInfos(this.artifactInfo.contextInfos, callback);
        }
    }
    Runner.prototype._runOnContextInfos = function(contextInfos,callback) {
        if (this.artifactInfo.isCodeWriteArtifact()) {
            this.runCodeWriteArtifact(this.artifactInfo.modelInfo, this.artifactInfo.gen, callback);
        }
        else {
            return callback(this.error('Artifact is in an invalid state: ' + util.inspect(this.artifactInfo, {depth: 2}), '_runOnContextInfos')
                )
            ;
        }
    }
    Runner.prototype._runOnModelInfo = function(modelInfo,callback) {
        var gen = this.artifactInfo.gen;
        if (this.artifactInfo.isWizziFactoryJob()) {
            this.runWizziFactoryJob(modelInfo, callback);
        }
        else if (this.artifactInfo.isWizziModelArtifact()) {
            this.runWizziModelArtifact(modelInfo, gen, callback);
        }
        else if (this.artifactInfo.isWizziCollectionArtifact()) {
            this.runWizziCollectionArtifact(modelInfo, gen, callback);
        }
        else if (this.artifactInfo.isFinalArtifact()) {
            this.runFinalArtifact(modelInfo, callback);
        }
        else {
            return callback(this.error('Artifact is in an invalid state: ' + util.inspect(this.artifactInfo, {depth: 2}), '_runOnModelInfo')
                )
            ;
        }
    }
    Runner.prototype.runWizziFactoryJob = function(modelInfo,callback) {
        log.warn('runWizziFactoryJob ' + this.artifactInfo.name);
        modelInfo.getModelInfos({
            final: false
        }, function(err,modelInfos) {
            if (err) {
                return callback(err)
                ;
            }
            AsyncWfJobRunner.run_many(modelInfos, callback);
        });
    }
    Runner.prototype.runWizziModelArtifact = function(modelInfo,gen,callback) {
        var that = this;
        modelInfo.getModelInfos({
            final: false
        }, function(err,modelInfos) {
            if (err) {
                return callback(err)
                ;
            }
            modelInfo.getArtifactGenerator(gen.generator, function(err,generator) {
                if (err) {
                    return callback(err)
                    ;
                }
                AsyncModelLoader.loadMany(modelInfos, function(err,contextModels) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    AsyncArtifactGenerator.generate(that.artifactInfo, generator, modelInfos, contextModels, function(err,notUsed) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        callback(null, that.artifactInfo);
                    });
                });
            });
        });
    }
    Runner.prototype.runWizziCollectionArtifact = function(modelInfo,gen,callback) {
        /**
            VIA
            logme("runWizziCollectionArtifact", 'isDirectory', modelInfo.isDirectory(), 'config', util.inspect(modelInfo.config, {
                depth: 3
            })
            )
        */
        var that = this;
        modelInfo.getModelInfos({
            final: false
        }, function(err,modelInfos) {
            if (err) {
                return callback(err)
                ;
            }
            var i, i_len=modelInfos.length, mi;
            for (i=0; i<i_len; i++) {
                mi = modelInfos[i];
                logme("runWizziCollectionArtifact.modelInfo to load", mi.id);
            }
            modelInfo.getArtifactGenerator(gen.generator, function(err,generator) {
                if (err) {
                    return callback(err)
                    ;
                }
                AsyncModelLoader.loadMany(modelInfos, function(err,contextModelsCollection) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    logme('runWizziCollectionArtifact got contextModelsCollection', contextModelsCollection.length);
                    AsyncArtifactGenerator.generateFromCollectionContexts(that.artifactInfo, generator, modelInfos, contextModelsCollection, function(err,notUsed) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        callback(null, that.artifactInfo);
                    });
                });
            });
        });
    }
    Runner.prototype.runCodeWriteArtifact = function(contextInfos,gen,callback) {
        var that = this;
        modelInfo.getArtifactGenerator(gen.generator, function(err,generator) {
            if (err) {
                return callback(err)
                ;
            }
            AsyncModelLoader.loadMany(contextInfos, function(err,contextModels) {
                if (err) {
                    return callback(err)
                    ;
                }
                AsyncArtifactGenerator.generateCodeWrite(that.artifactInfo, generator, contextModels, function(err,notUsed) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    callback(null, that.artifactInfo);
                });
            });
        });
    }
    // TODO execute copy without loading content in genWriter
    Runner.prototype.runFinalArtifact = function(modelInfo,callback) {
        var that = this;
        modelInfo.isDirectory(function(err,isDirectory) {
            if (err) {
                return callback(err)
                ;
            }
            if (isDirectory) {
                modelInfo.getFiles({
                    final: true
                }, function(err,files) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    var i, i_len=files.length, fileInfo;
                    for (i=0; i<i_len; i++) {
                        fileInfo = files[i];
                        var genWriter = new GenWriter({
                            model: null, 
                            srcPath: fileInfo.relpath, 
                            srcFullPath: fileInfo.fullpath, 
                            options: that.artifactInfo.options
                        });
                        genWriter.writeFile(fileInfo.fullpath);
                        that.artifactInfo.addGenWriter(genWriter);
                    }
                    return callback(null, that.artifactInfo)
                    ;
                });
            }
            else {
                var genWriter = new GenWriter({
                    model: null, 
                    srcPath: modelInfo.src(), 
                    srcFullPath: modelInfo.srcFullPath(), 
                    options: that.artifactInfo.options
                });
                modelInfo.getSource(function(err,content) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    genWriter.write(content);
                    that.artifactInfo.addGenWriter(genWriter);
                    return callback(null, that.artifactInfo)
                    ;
                });
            }
        });
    }
    Runner.prototype.error = function(message,method) {
        var err = {
            __is_error: true, 
            message: message, 
            source: "wizzi/lib/production/artifactinfo.js/" + method, 
            modelInfo: this.modelInfo
        };
        logme(err);
        return err;
    }
    return Runner;
})();

module.exports = {
    Runner: Runner
};

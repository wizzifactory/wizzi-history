/*
    Async artifact generation runner.
    A runner instance runs on a single artifactInfo.
    Input: an ArtifactInfo (constructor injected).
    Output: the ArtifactInfo enriched with (one or many) writeContext(s),
            ready to be persisted (callback ok result).
*/
var assert = require('assert');
var path = require('path');
var util = require('util');
var swig = require('swig');
var verify = require('../util/verify');
var log = require('../util/log')(module);
var GenWriter = require('../artifact/GenWriter');
var AsyncModelLoader = require('../model/asyncModelLoader');
var AsyncArtifactGenerator = require('../artifact/asyncArtifactGenerator');
var AsyncWfJobRunner = require('./asyncWfJobRunner');
function logme() {
    if (false) console.log.apply(console, arguments);
}
var Runner = function (artifactInfo) {
    this.artifactInfo = artifactInfo;
    log.setLevel(artifactInfo.options.verbose || 0);
};
Runner.prototype.run = function (callback) {
    if (this.artifactInfo.modelInfo) {
        logme("Runner.run modelInfo", 'isDirectory', this.artifactInfo.modelInfo.isDirectory(), 
            'config', util.inspect(this.artifactInfo.modelInfo.config, { depth: 3 }));
        this._runOnModelInfo(this.artifactInfo.modelInfo, callback);
    } else {
        this._runOnContextInfos(this.artifactInfo.contextInfos, callback);
    }
}
Runner.prototype._runOnContextInfos = function (contextInfos, callback) {
    var self = this;
    var contextInfos = this.artifactInfo.modelInfo; // artifactConfig.model property
    var gen = this.artifactInfo.gen; // artifactConfig.gen property
    if (this.artifactInfo.isCodeWriteArtifact()) {
        this.runCodeWriteArtifact(contextInfos, gen, function (err, result) {
            callback(err, result);
        })
    } else {
        throw new Error('Artifact is in an invalid state: ' + util.inspect(this.artifactInfo, { depth: 2 }));
    }
}
Runner.prototype._runOnModelInfo = function (modelInfo, callback) {
    var self = this;
    // Already in artifactInfo. modelInfo.___state = this.artifactInfo.___state; // expose production state on modelInfo
    var gen = this.artifactInfo.gen; // artifactConfig.gen property
    if (this.artifactInfo.isWizziFactoryJob()) {
        this.runWizziFactoryJob(modelInfo, function (err, result) {
            callback(err, result);
        })
    } else if (this.artifactInfo.isWizziModelArtifact()) {
        this.runWizziModelArtifact(modelInfo, gen, function (err, result) {
            callback(err, result);
        })
    } else if (this.artifactInfo.isWizziCollectionArtifact()) {
        this.runWizziCollectionArtifact(modelInfo, gen, function (err, result) {
            callback(err, result);
        })
    } else if (this.artifactInfo.isSwigArtifact()) {
        this.runSwigArtifact(modelInfo, function (err, result) {
            callback(err, result);
        })
    } else if (this.artifactInfo.isFinalArtifact()) {
        this.runFinalArtifact(modelInfo, function (err, result) {
            callback(err, result);
        })
    } else {
        throw new Error('Artifact is in an invalid state: ' + util.inspect(this.artifactInfo, { depth: 2 }));
    }
}
Runner.prototype.runWizziFactoryJob = function (modelInfo, callback) {
    log.warn('runWizziFactoryJob ' + this.artifactInfo.name);
    var self = this;
    // set modelInfos
    var modelInfos;
    if (modelInfo.isDirectory()) {
        modelInfos = modelInfo.getModelInfos({ final: false });
    } else {
        modelInfos = [modelInfo];
    }
    AsyncWfJobRunner.run_many(modelInfos, callback);
}
Runner.prototype.runWizziModelArtifact = function (modelInfo, gen, callback) {
    // log.warn('runWizziModelArtifact ' + this.artifactInfo.name);
    var self = this;
    // set modelInfos
    var modelInfos;
    if (modelInfo.isDirectory()) {
        modelInfos = modelInfo.getModelInfos({ final: false });
    } else {
        modelInfos = [modelInfo];
    }
    // retrieve generator
    var generator = modelInfo.___state.pman.getArtifactGenerator(gen.generator);
    if (generator == null) {
        return callback('Generator not found: ' + gen.generator + ', for artifact ' + self.artifactInfo.toString(), null);
    }
    // each model info describe a context for a generation
    AsyncModelLoader.loadMany(modelInfos, function (err, contextModels) {
        if (err) return callback(err, null); 
        AsyncArtifactGenerator.generate(
            self.artifactInfo, generator, modelInfos, contextModels, function (err) {
                callback(null, self.artifactInfo);
            });
    });
}
Runner.prototype.runWizziCollectionArtifact = function (modelInfo, gen, callback) {
    // log.warn('runWizziCollectionArtifact ' + this.artifactInfo.name);
    logme("runWizziCollectionArtifact", 'isDirectory', modelInfo.isDirectory(), 'config', util.inspect(modelInfo.config, { depth: 3 }));
    var self = this;
    // set modelInfos
    var modelInfos;
    if (modelInfo.isDirectory()) {
        modelInfos = modelInfo.getModelInfos({ final: false });
    } else {
        modelInfos = [modelInfo];
    }
    modelInfos.forEach(function (mi) {
        logme("runWizziCollectionArtifact.modelInfo to load", mi.id);
    });
    var generator = modelInfo.___state.pman.getArtifactGenerator(gen.generator);
    if (generator == null) {
        return callback('Generator not found: ' + gen.generator + ', for artifact ' + self.artifactInfo.toString(), null);
    }
    AsyncModelLoader.loadMany(modelInfos, function (err, contextModelsCollection) {
        if (err) return callback(err, null);
        logme('runWizziCollectionArtifact got contextModelsCollection', contextModelsCollection.length);
        AsyncArtifactGenerator.generateFromCollectionContexts(
            self.artifactInfo, generator, modelInfos, contextModelsCollection, function (err) {
                callback(null, self.artifactInfo);
        });
    });
}
Runner.prototype.runCodeWriteArtifact = function (contextInfos, gen, callback) {
    // log.warn('runCodeWriteArtifact ' + this.artifactInfo.name);
    var self = this;
    // retrieve generator
    var generator = modelInfo.___state.pman.getArtifactGenerator(gen.generator);
    if (generator == null) {
        return callback('Generator not found: ' + gen.generator + ', for artifact ' + self.artifactInfo.toString(), null);
    }
    AsyncModelLoader.loadMany(contextInfos, function (err, contextModels) {
        if (err) return callback(err, null);
        AsyncArtifactGenerator.generateCodeWrite(
            self.artifactInfo, generator, contextModels, function (err) {
                callback(null, self.artifactInfo);
            });
    });
}
Runner.prototype.runSwigArtifact = function (modelInfo, callback) {
    // log.warn('runSwigArtifact ' + this.artifactInfo.name);
    var self = this;
    // Load the contextModelObjects for the swig template transformation
    AsyncModelLoader.loadContexts(modelInfo, function (err, contextModelObjects) {
        if (err) return callback(err, null);
        // create the template context object
        var context = {};
        contextModelObjects.forEach(function (item) {
            context[item.___exportName] = item;
        });
        if (modelInfo.isDirectory()) {
            var sources = modelInfo.getSources();
            sources.forEach(function (item) {
                // transform the source (template)
                var transformed = swig.render(item.content, { locals: context });
                // write the result into a new GenWriter
                var genWriter = new GenWriter({
                    model: null,
                    srcPath: item.relpath,
                    srcFullPath: item.fullpath,
                    options: self.artifactInfo.options
                });
                genWriter.write(transformed);
                self.artifactInfo.addGenWriter(genWriter); // augment artifactInfo with result
            });
        } else {
            // read the template content
            var template = modelInfo.getSource();
            // transform the template
            var transformed = swig.render(template, { locals: context });
            // write the result into a new GenWriter
            var genWriter = new GenWriter({
                model: null,
                srcPath: modelInfo.src(),
                srcFullPath: modelInfo.srcFullPath(),
                options: self.artifactInfo.options
            });
            genWriter.write(transformed);
            self.artifactInfo.addGenWriter(genWriter); // augment artifactInfo with result
        }
        callback(null, self.artifactInfo);
    });
}
/*
    A final artifact is read from disk and written into a genWriter
    without template transformation or generation.
    The source may be a directory, in this case a genWriter is created
    for each file in the folder.
*/
Runner.prototype.runFinalArtifact = function (modelInfo, callback) {
    // log.warn('runFinalArtifact ' + this.artifactInfo.name);
    var self = this;
    if (modelInfo.isDirectory()) {
        var files = modelInfo.getFiles({ final: true });
        files.forEach(function (fileInfo) {
            // logme('Runner.runFinalArtifact.item', modelInfo.src(), item.filepath);
            var genWriter = new GenWriter({
                model: null,
                srcPath: fileInfo.relpath,
                srcFullPath: fileInfo.fullpath,
                options: self.artifactInfo.options
            });
            genWriter.writeFile(fileInfo.fullpath);
            self.artifactInfo.addGenWriter(genWriter); // augment artifactInfo with result
        });
    } else {
        var genWriter = new GenWriter({
            model: null,
            srcPath: modelInfo.src(),
            srcFullPath: modelInfo.srcFullPath(),
            options: self.artifactInfo.options
        });
        genWriter.write(modelInfo.getSource());
        self.artifactInfo.addGenWriter(genWriter);
    }
    callback(null, this.artifactInfo);
}
module.exports = Runner;

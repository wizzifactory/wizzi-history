/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\root\factory.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var verify = require('./lib/util/verify');
var file = require('./lib/util/file');
var fail = require('./lib/util/fail');
var errors = require('./lib/errors');
var StringWriter = require('./lib/util/stringwriter');
var log = require('./lib/util/log')(module);
var GenWriter = require('./lib/artifact/GenWriter');
var ittf = require('./lib/ittf/ittf');
var options = require('./lib/production/options');
var legacy = require('./legacy');
var md = module.exports = {};
md.name = 'wizzi-factory';
md.ProductionContext = require('./lib/production/context');
md.ProductionManager = require('./lib/production/manager');
md.ProductionService = require('./lib/production/service');
md.options = require('./lib/production/options');
/**
     local wizzi models
*/
/**
     async load a WizziModel of type 'wfjob' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.wfjob = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('wfjob');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "wfjob" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
        fail.warn(error.message);
        return callback(error);
    }
    factory.load(ittfDocumentUri, evaluationContext, function(err,wizziModel) {
        if (err) {
            return callback(err);
        }
        callback(null, wizziModel);
    });
};
/**
     async load a WizziModel of type 'nools' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.nools = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('nools');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "nools" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
        fail.warn(error.message);
        return callback(error);
    }
    factory.load(ittfDocumentUri, evaluationContext, function(err,wizziModel) {
        if (err) {
            return callback(err);
        }
        callback(null, wizziModel);
    });
};
/**
     async load a WizziModel of type 'wfpackage' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.wfpackage = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('wfpackage');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "wfpackage" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
        fail.warn(error.message);
        return callback(error);
    }
    factory.load(ittfDocumentUri, evaluationContext, function(err,wizziModel) {
        if (err) {
            return callback(err);
        }
        callback(null, wizziModel);
    });
};
/**
     expose wizzi models, transformations and artifacts to the wizzi factory
*/
/**
     Simply load an IttfModel from an IttfDocument
     param ittfDocumentUri      - the uri of the primary IttfDocument that declares the model
     param evaluationContext    - the IttfModel evaluation context
     param callback
*/
md.ittf = function(ittfDocumentUri,evaluationContext,callback) {
    ittf.loadModel(ittfDocumentUri, evaluationContext, function(err,ittfModel) {
        if (err) {
            err.srcPath = ittfDocumentUri;
            fail.warn(util.inspect(err, { depth: null}));
            return callback(err);
        }
        var ittfmodel = ittfModel.nodes[0];
        // log 'md.ittf.ittfDocumentUri', ittfDocumentUri, ittfmodel
        callback(null, ittfmodel);
    });
};
var wizziModelFactories = {};
var wizziSchemaObjects = {};
/**
     Retrieve a WizziModelFactory by its wizzischema name
     searching the loader in this WizziPackage
     No search up in "node_modules" folders. For that see wizzi/services/repository.
*/
md.getWizziModelFactory = function(wizzischemaName) {
    if (wizziModelFactories[wizzischemaName]) {
        return wizziModelFactories[wizzischemaName];
    }
    else {
        var modulePath = path.resolve(__dirname, './lib/wizzi/models/' + wizzischemaName + '-factory.g.js');
        if (file.exists(modulePath)) {
            var ret = require('./lib/wizzi/models/' + wizzischemaName + '-factory.g');
            wizziModelFactories[wizzischemaName] = ret;
            return ret;
        }
        else {
            return null;
        }
    }
};
/**
     Retrieve a WizziSchema model object from its JSON representation
     searching the loader in this WizziPackage
     No search up in "node_modules" folders. For that see wizzi/services/repository.
*/
md.getWizziSchemaObject = function(wizzischemaName) {
    if (wizziSchemaObjects[wizzischemaName]) {
        return wizziSchemaObjects[wizzischemaName];
    }
    else {
        var modulePath = path.resolve(__dirname, './lib/wizzi/models/' + wizzischemaName + '-schema.g.json');
        if (file.exists(modulePath)) {
            var ret = require('./lib/wizzi/models/' + wizzischemaName + '-schema.g.json');
            wizziSchemaObjects[wizzischemaName] = ret;
            return ret;
        }
        else {
            return null;
        }
    }
};
var modelTransformers = {};
/**
     Async execute a model transformation
     Transformers are searched in this WizziPackage
     No search up in "node_modules" folders. For that see wizzi/services/repository.
*/
md.doModelTransformation = function(model,transformerName,context,callback) {
    var transformer = md.getModelTransformer(transformerName);
    if (transformer == null) {
        var error = new errors.NotFoundError('ModelTransformation', transformerName, model.uri);
        wizzi.fail.warn(error.message);
        return callback(error);
    }
    else {
        new transformer.trans(model, context, callback);
    }
};
/**
     retrieve a ModelTransformer by its name
     searching the loader in this WizziPackage
     No search up in "node_modules" folders. For that see wizzi/services/repository.
*/
md.getModelTransformer = function(transformerName) {
    
    if (modelTransformers[transformerName]) {
        return modelTransformers[transformerName];
    }
    else {
        var modulePath = path.resolve(__dirname, './lib/artifacts/' + transformerName + '/trans/main.js');
        if (file.exists(modulePath)) {
            var ret = require('./lib/artifacts/' + transformerName + '/trans/main');
            modelTransformers[transformerName] = ret;
            return ret;
        }
        else {
            return null;
        }
    }
};
var artifactGenerators = {};
/**
     Async generate an artifact
     Generators are searched in this WizziPackage
     No search up in "node_modules" folders. For that see wizzi/services/repository.
    
     @param {Object} modelContext
     A WizziModel or any other value of type Object used to drive the artifact generation.
     The object may a contain options parameter and or a structure
     of other objects or WizziModels.
     @param {String} sourceIttfDocumentInfo
     For trace and documentation purposes.
     @param {String} generationName
     The name for retrieving the ArtifactGeneration module.
     @param {Object} emitContext
     The emitContext
     . collects the generated elements of an artifact generation
     . may be used as a service container during generation.
     For now the wizzi/artifact/genWriter is used as emitContext.
     TODO revise and rename the wizzi/artifact/genWriter module
     The emitContext parameter may be used to pass context data to the artifact generator;
     It may contain a "__data" property that will be set on the genWriter "data" property.
     @param {Function} callback
*/
md.doArtifactGeneration = function doArtifactGeneration(modelContext,sourceIttfDocumentInfo,generationName,emitContext,callback) {
    
    if (!callback) {
        callback = emitContext;
        emitContext = {};
    }
    if (!emitContext) {
        emitContext = {};
    }
    
    var generator = md.getArtifactGenerator(generationName);
    if (generator == null) {
        var error = new errors.NotFoundError('ArtifactGenerator', generationName, sourceIttfDocumentInfo);
        fail.warn(error.message);
        return callback(error);
    }
    
    var genWriter = new GenWriter({ options: options(null, { data: emitContext.__data }) });
    new generator.gen(modelContext, genWriter, function(err) {
        if (err) {
            err.srcPath = sourceIttfDocumentInfo;
            fail.warn(util.inspect(err, { depth: null}));
            return callback(err);
        }
        var sw = new StringWriter();
        genWriter.toStream(sw);
        callback(null, sw.toString());
    });
};
/**
     Retrieve an ArtifactGenerator by its name
     Generators are searched in this WizziPackage
     No search up in "node_modules" folders. For that see wizzi/services/repository.
*/
md.getArtifactGenerator = function(generationName) {
    
    var generator = artifactGenerators[generationName];
    if (!generator) {
        generator = md[generationName];
        if (!generator) {
            var modulePath = path.resolve(__dirname, './lib/artifacts/' + generationName + '/gen/main.js');
            if (file.exists(modulePath)) {
                generator = artifactGenerators[generationName] = require('./lib/artifacts/' + generationName + '/gen/main');
            }
        }
    }
    return generator;
};
/**
     legacy wizzi models
*/
md.js = function(ittfDocumentUri,evalContext,callback) {
    legacy.js(ittfDocumentUri, evalContext, function(err,wizziModel) {
        if (err) {
            return callback(err, null);
        }
        callback(null, wizziModel);
    });
};
md.css = function(ittfDocumentUri,evalContext,callback) {
    legacy.css(ittfDocumentUri, evalContext, function(err,wizziModel) {
        if (err) {
            return callback(err, null);
        }
        callback(null, wizziModel);
    });
};
md.html = function(ittfDocumentUri,evalContext,callback) {
    legacy.html(ittfDocumentUri, evalContext, function(err,wizziModel) {
        if (err) {
            return callback(err, null);
        }
        callback(null, wizziModel);
    });
};
/**
     legacy artifacts generators
*/
md.getLegacyArtifactGenerator = function(artifactName) {
    return legacy.getArtifactGenerator(artifactName);
};
/**
    Async generate a json/document artifact, that uses a raw ittfModel as input model.
     The context parameter may be used to pass context data to the artifact generator;
     it may contain a __data property that will be set on the genWriter data property.
     genWriter is the context object of an artifact generation
*/
md.jsonDocument = function(ittfDocumentPath,context,callback) {
    // async load the ittfModel
    md.ittf.loadModel(ittfDocumentPath, context, function(err,ittfModel) {
        if (err) {
            // no need to augment the err object
            return callback(err, null);
        }
        //
        var modelRootNode = ittfModel.nodes[0];
        // async generate
        md.doArtifactGeneration(modelRootNode, ittfDocumentPath, 'json/document', context, callback);
    });
};
/**
    Async generate a xml/document artifact, that uses a raw ittfModel as input model.
     The context parameter may be used to pass context data to the artifact generator;
     it may contain a __data property that will be set on the genWriter data property.
     genWriter is the context object of an artifact generation
*/
md.xmlDocument = function(ittfDocumentPath,context,callback) {
    // async load the ittfModel
    md.ittf.loadModel(ittfDocumentPath, context, function(err,ittfModel) {
        if (err) {
            // no need to augment the err object
            return callback(err, null);
        }
        //
        var modelRootNode = ittfModel.nodes[0];
        // async generate
        md.doArtifactGeneration(modelRootNode, ittfDocumentPath, 'xml/document', context, callback);
    });
};
/**
     async generate a nools/flowDsl artifact
     the context parameter may contain a __data property that will be
     set on the genWriter data property
*/
md.noolsFlowDsl = function(ittfDocumentPathOrContext,context,callback) {
    if (verify.isString(ittfDocumentPathOrContext)) {
        // async load the wizziModelInstance
        md.nools(ittfDocumentPathOrContext, context, function(err,wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            // async generate
            md.doArtifactGeneration(wizziModelInstance, ittfDocumentPathOrContext, 'nools/flowDsl', context, function(err,results) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    else {
        // async generate
        md.doArtifactGeneration(ittfDocumentPathOrContext, 'Unknown', 'nools/flowDsl', context, callback);
    }
};
md.executeJob = function(request) {
    var jobName = request.name;
    var path = request.path;
    var options = request.options;
    var wizziFactoryPackages = request.wizziFactoryPackages;
    
    var pman = new md.ProductionManager(options);
    
    if (wizziFactoryPackages && verify.isArray(wizziFactoryPackages)) {
        var i,
            i_len = wizziFactoryPackages.length,
            wfp;
        for (i = 0; i < i_len; i++) {
            wfp = wizziFactoryPackages[i];
            pman.registerWizziFactoryPackage(wfp);
        }
    }
    
    pman.addWfJob({
        options: {}, 
        wfjob: {
            src: path
        }
    });
    
    pman.run(function(err,result) {
        if (err) {
            var msg = 'Package-examples ' + jobName + '\nError running production: ' + path + '\n' + util.inspect(err, {depth: null});
            fail.warn(msg);
            throw new Error(msg);
        }
        log.success('run completed');
        pman.persistToFile(function(err,result) {
            if (err) {
                var msg = 'Package-examples ' + jobName + '\nError persisting production to file: ' + path + '\n' + util.inspect(err, {depth: null});
                fail.warn(msg);
                throw new Error(msg);
            }
            log.success('persistToFile completed');
        });
    });
};

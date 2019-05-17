/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v2\sources\plugins\wizzi-lab-spa\ittf\root\index.js.ittf
    utc time: Mon, 17 Jul 2017 15:07:32 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var wizzi = require('wizzi');
var log = wizzi.log(module);
var GenWriter = wizzi.GenWriter;
var StringWriter = wizzi.StringWriter;
var options = wizzi.options;
var file = wizzi.file;
var ittf = wizzi.ittf;
var verify = wizzi.verify;
var errors = wizzi.errors;
var fail = wizzi.fail;
var md = module.exports = {};
md.name = 'wizzi-lab-spa';
/**
     local wizzi models
*/
/**
     async load a WizziModel of type 'spa' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.spa = function(ittfDocumentUri, evaluationContext, callback) {
    var factory = md.getWizziModelFactory('spa');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "spa" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
        fail.warn(error.message);
        return callback(error);
    }
    factory.load(ittfDocumentUri, evaluationContext, function(err, wizziModel) {
        if (err) {
            return callback(err);
        }
        callback(null, wizziModel);
    });
};
/**
     async load a WizziModel of type 'form' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.form = function(ittfDocumentUri, evaluationContext, callback) {
    var factory = md.getWizziModelFactory('form');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "form" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
        fail.warn(error.message);
        return callback(error);
    }
    factory.load(ittfDocumentUri, evaluationContext, function(err, wizziModel) {
        if (err) {
            return callback(err);
        }
        callback(null, wizziModel);
    });
};
/**
     local transformations
*/
/**
    async generate a spa/detect transformed model
     the model to be transformed is loaded from the parameter ittfDocumentPath;
     only one transformation can be executed with this method,
     transformations cannot be chained
*/
md.spaDetect = function(ittfDocumentPathOrWizziModel, context, callback) {
    if (verify.isString(ittfDocumentPathOrWizziModel)) {
        // async load the wizziModelInstance
        md.spa(ittfDocumentPath, context, function(err, wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            md.doModelTransformation(wizziModelInstance, 'spa/detect', context, callback);
        });
    }
    else {
        md.doModelTransformation(ittfDocumentPathOrWizziModel, 'spa/detect', context, callback);
    }
};
/**
    async generate a spa/project_files transformed model
     the model to be transformed is loaded from the parameter ittfDocumentPath;
     only one transformation can be executed with this method,
     transformations cannot be chained
*/
md.spaProject_files = function(ittfDocumentPathOrWizziModel, context, callback) {
    if (verify.isString(ittfDocumentPathOrWizziModel)) {
        // async load the wizziModelInstance
        md.spa(ittfDocumentPath, context, function(err, wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            md.doModelTransformation(wizziModelInstance, 'spa/project_files', context, callback);
        });
    }
    else {
        md.doModelTransformation(ittfDocumentPathOrWizziModel, 'spa/project_files', context, callback);
    }
};
/**
    async generate a form/jsonizer transformed model
     the model to be transformed is loaded from the parameter ittfDocumentPath;
     only one transformation can be executed with this method,
     transformations cannot be chained
*/
md.formJsonizer = function(ittfDocumentPathOrWizziModel, context, callback) {
    if (verify.isString(ittfDocumentPathOrWizziModel)) {
        // async load the wizziModelInstance
        md.form(ittfDocumentPath, context, function(err, wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            md.doModelTransformation(wizziModelInstance, 'form/jsonizer', context, callback);
        });
    }
    else {
        md.doModelTransformation(ittfDocumentPathOrWizziModel, 'form/jsonizer', context, callback);
    }
};
/**
     local artifact generators
*/
/**
     async generate a spa/babelrc artifact
     the context parameter may contain a __data property that will be
     set on the genWriter data property
*/
md.spaBabelrc = function(ittfDocumentPathOrContext, context, callback) {
    if (verify.isString(ittfDocumentPathOrContext)) {
        // async load the wizziModelInstance
        md.spa(ittfDocumentPathOrContext, context, function(err, wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            // async generate
            md.doArtifactGeneration(wizziModelInstance, ittfDocumentPathOrContext, 'spa/babelrc', context, function(err, results) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    else {
        // async generate
        md.doArtifactGeneration(ittfDocumentPathOrContext, 'Unknown', 'spa/babelrc', context, callback);
    }
};
/**
     async generate a spa/gulp artifact
     the context parameter may contain a __data property that will be
     set on the genWriter data property
*/
md.spaGulp = function(ittfDocumentPathOrContext, context, callback) {
    if (verify.isString(ittfDocumentPathOrContext)) {
        // async load the wizziModelInstance
        md.spa(ittfDocumentPathOrContext, context, function(err, wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            // async generate
            md.doArtifactGeneration(wizziModelInstance, ittfDocumentPathOrContext, 'spa/gulp', context, function(err, results) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    else {
        // async generate
        md.doArtifactGeneration(ittfDocumentPathOrContext, 'Unknown', 'spa/gulp', context, callback);
    }
};
/**
     async generate a spa/package artifact
     the context parameter may contain a __data property that will be
     set on the genWriter data property
*/
md.spaPackage = function(ittfDocumentPathOrContext, context, callback) {
    if (verify.isString(ittfDocumentPathOrContext)) {
        // async load the wizziModelInstance
        md.spa(ittfDocumentPathOrContext, context, function(err, wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            // async generate
            md.doArtifactGeneration(wizziModelInstance, ittfDocumentPathOrContext, 'spa/package', context, function(err, results) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    else {
        // async generate
        md.doArtifactGeneration(ittfDocumentPathOrContext, 'Unknown', 'spa/package', context, callback);
    }
};
/**
     async generate a spa/webpack artifact
     the context parameter may contain a __data property that will be
     set on the genWriter data property
*/
md.spaWebpack = function(ittfDocumentPathOrContext, context, callback) {
    if (verify.isString(ittfDocumentPathOrContext)) {
        // async load the wizziModelInstance
        md.spa(ittfDocumentPathOrContext, context, function(err, wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            // async generate
            md.doArtifactGeneration(wizziModelInstance, ittfDocumentPathOrContext, 'spa/webpack', context, function(err, results) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    else {
        // async generate
        md.doArtifactGeneration(ittfDocumentPathOrContext, 'Unknown', 'spa/webpack', context, callback);
    }
};
/**
     Exposes functions for loading WizziModels and
     executing ModelTransformers and ArtifactGenerators searching loaders and executors
     in this WizziPackage (no search up in "node_modules" folders)
*/
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
md.doModelTransformation = function(model, transformerName, context, callback) {
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
md.doArtifactGeneration = function doArtifactGeneration(modelContext, sourceIttfDocumentInfo, generationName, emitContext, callback) {
    
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

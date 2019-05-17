/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\root\schema.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var verify = require('./lib/util/verify');
var file = require('./lib/util/file');
var fail = require('./lib/util/fail');
var errors = require('./lib/errors');
var StringWriter = require('./lib/util/stringwriter');
var log = require('./lib/util/log')(module);
var GenWriter = require('./lib/artifact/genwriter');
var ittf = require('./lib/ittf/ittf');
var options = require('./lib/production/options');
var bootModelUri = "./lib/wizzi/models/bootstrap/wizzischema-boot-model";
var bootModelDefUri = "./lib/wizzi/models/bootstrap/wizzischema-boot-modelDef";
var legacy = require('./legacy');
var WizziSchema = require(bootModelUri).WizziSchema;
var md = module.exports = {};
md.name = 'wizzi-schema';
// This should be superflous index/legacy-artifacts(  )
/**
     async load a WizziModel of type 'wizzischema' from an IttfDocument
*/
md.wizzischema = function(ittfDocumentPath,context,callback) {
    var factory = md.getWizziModelFactory('wizzischema');
    factory.load(ittfDocumentPath, context, function(err,wizziModel) {
        if (err) {
            fail.warn('Error loading ' + ittfDocumentPath + ':' + util.inspect(err));
            return callback(err, null);
        }
        callback(null, wizziModel);
    });
};
/**
     Async generate the bootstrap WizziModel and WizziModelFactory of type 'wizzischema'
     and persist them in the lib/wizzi/models folder of this module
*/
md.generateBootstrapWizzischema = function(callback) {
    var wizzischemaBootModelDef = require(bootModelDefUri);
    var wizzimodelsFolder = path.resolve(__dirname, 'lib', 'wizzi', 'models');
    var outModelPath = path.join(wizzimodelsFolder, 'wizzischema-model.g.js');
    var outFactoryPath = path.join(wizzimodelsFolder, 'wizzischema-factory.g.js');
    var wizzischemaBootModelInstance = wizzischemaBootModelDef.createInstance();
    // execute the artifact generator 'wizzischema/model'
    md.doArtifactGeneration(wizzischemaBootModelInstance, '/lib/wizzimodels/bootstrap/wizzischema-boot-modelinstance', 'wizzischema/model', {}, function(err,artifact) {
        if (err) {
            var msg = 'Error generating the bootstrap WizziModel of type wizzischema: ' + util.inspect(err);
            fail.warn(msg);
            throw new Error(msg);
        }
        file.write(outModelPath, artifact);
        log.success('wizzi-schema.boot: WizziModel generated ');
        // execute the artifact generator 'wizzischema/factory'
        md.doArtifactGeneration(wizzischemaBootModelInstance, '/lib/wizzimodels/bootstrap/wizzischema-boot-modelinstance', 'wizzischema/factory', {}, function(err,artifact) {
            if (err) {
                var msg = 'Error generating the bootstrap WizziModelFactory of type wizzischema: ' + util.inspect(err);
                fail.warn(msg);
                throw new Error(msg);
            }
            file.write(outFactoryPath, artifact);
            log.success('wizzi-schema.boot: WizziModelFactory generated ');
            if (typeof callback === 'function') {
                callback(null);
            }
        });
    });
};
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
/**
     From an IttfDocument of schema "wizzischema"
     async generate:
     - a WizziModelType
     - a WizziModelFactory
     - a WizziModelType test module
     - a WizziModelType json documentation
     - a WizziModelType html documentation
*/
md.executeWizziModelTypesGeneration = function(wizzischemaIttfDocumentUri,modelPath,factoryPath,testPath,jsondocsPath,htmldocsPath,context,isV3,callback) {
    if (typeof(callback) === 'undefined') {
        callback = isV3;
        isV3 = false;
    }
    md.generateWizziModelObjects(wizzischemaIttfDocumentUri, context || {}, isV3, function(err,wizziModelAndFactoryArtifact) {
        if (err) {
            throw new Error('Wizzi-schema.index.executeSchemaGenerationProcess: ' + util.inspect(err));
        }
        file.write(modelPath, wizziModelAndFactoryArtifact[0]);
        log.success('Generated WizziModel: ' + modelPath);
        file.write(factoryPath, wizziModelAndFactoryArtifact[1]);
        log.success('Generated WizziModelFactory: ' + factoryPath);
        file.write(testPath, wizziModelAndFactoryArtifact[2]);
        log.success('Generated WizziModel test: ' + testPath);
        file.write(jsondocsPath, wizziModelAndFactoryArtifact[3]);
        log.success('Generated WizziModel json docs: ' + jsondocsPath);
        file.write(htmldocsPath, wizziModelAndFactoryArtifact[4]);
        log.success('Generated WizziModel html docs: ' + htmldocsPath);
        callback(null, null);
    });
};
/**
     async generate a Wizzi model and a Wizzi model factory
     from an IttfDocument of schema "wizzischema"
*/
md.generateWizziModelObjects = function(wizzischemaIttfDocumentUri,context,isV3,callback) {
    if (typeof(callback) === 'undefined') {
        callback = isV3;
        isV3 = false;
    }
    // async load the WizziModel from wizzischemaIttfDocumentUri
    log.info('starting async load the WizziModel from wizzischemaIttfDocumentUri');
    md.wizzischema(wizzischemaIttfDocumentUri, context, function(err,schemaModelTemp) {
        log.info('async load the WizziModel. err', err);
        if (err) {
            return callback(err);
        }
        // load the schemaModelTemp instance into the bootstrap wizzimodel.
        // This is required until the generation of the WizziModel of type 'wizzischema'
        // is not completely automated.
        var bootWizziModel = new WizziSchema(schemaModelTemp.wzName);
        bootWizziModel.loadFromWizziModel(schemaModelTemp);
        log.info('starting the artifact generator wizzischema/model');
        // execute the artifact generator 'wizzischema/model'
        md.doArtifactGeneration(bootWizziModel, bootModelDefUri, 'wizzischema/model', context, function(err,wizziModelArtifact) {
            if (err) {
                return callback(err);
            }
            var factoryArtifact = isV3 ? 'wizzischema/factory_v3' : 'wizzischema/factory';
            log.info('starting the artifact generator wizzischema/factory');
            // execute the artifact generator 'wizzischema/factory'
            md.doArtifactGeneration(bootWizziModel, bootModelDefUri, factoryArtifact, context, function(err,wizziFactoryArtifact) {
                if (err) {
                    return callback(err);
                }
                log.info('starting the artifact generator wizzischema/test');
                // execute the artifact generator 'wizzischema/test'
                md.doArtifactGeneration(bootWizziModel, bootModelDefUri, 'wizzischema/test', context, function(err,wizziTestArtifact) {
                    if (err) {
                        return callback(err);
                    }
                    md.doModelTransformation(bootWizziModel, 'wizzischema/json_docs', context, function(err,wizziDocsObject) {
                        if (err) {
                            return callback(err);
                        }
                        var docsJson = stringify(wizziDocsObject, null, 2);
                        // execute the artifact generator 'wizzischema/html_docs'
                        md.doArtifactGeneration(wizziDocsObject, bootModelDefUri, 'wizzischema/html_docs', context, function(err,wizziHtmlDocsArtifact) {
                            if (err) {
                                return callback(err);
                            }
                            callback(null, [
                                wizziModelArtifact, 
                                wizziFactoryArtifact, 
                                wizziTestArtifact, 
                                docsJson, 
                                wizziHtmlDocsArtifact
                            ]);
                        });
                    });
                });
            });
        });
    });
};
/**
     From an IttfDocument of schema "wizzischema"
     async generate:
     - a WizziModelType
     - a WizziModelFactory
     - a WizziModelType test module
     - a WizziModelType json documentation
     - a WizziModelType html documentation
*/
md.executeWizziModelTypesGenerationEx = function(wizzischemaIttfDocumentUri,outputPackagePath,wizzischemaName,context,isV3,callback) {
    
    if (typeof(callback) === 'undefined') {
        callback = isV3;
        isV3 = false;
    }
    
    var wizziSchemaLabFolder = path.join(outputPackagePath, 'lib', 'wizzi', 'schemas', 'lab');
    var wizziModelFolder = path.join(outputPackagePath, 'lib', 'wizzi', 'models');
    
    //
    // Launches the generation of the WizziModelTypes for a wizzischema of the this WizziPackage
    var modelPath = path.join(wizziModelFolder, wizzischemaName + '-model.g.js');
    var factoryPath = path.join(wizziModelFolder, wizzischemaName + '-factory.g.js');
    var labPath = path.join(wizziSchemaLabFolder, wizzischemaName + '-test.g.js');
    var jsondocsPath = path.join(wizziModelFolder, wizzischemaName + '-schema.g.json');
    var htmldocsPath = path.join(wizziModelFolder, wizzischemaName + '-schema.g.html');
    
    var ProductionManager = require('./lib/production/manager');
    var acl = require('./lib/acl');
    var aclStat = new acl.AclStat('stefi', 'admin');
    var pman = new ProductionManager({});
    pman.aclStat(aclStat);
    pman.globalContext({});
    
    md.executeWizziModelTypesGeneration(wizzischemaIttfDocumentUri, modelPath, factoryPath, labPath, jsondocsPath, htmldocsPath, {
        __productionManager: pman
    }, isV3, function(err,result) {
        if (err) {
            throw new Error('Package: ' + packageName + '.WizziModelProduction error: ' + util.inspect(err, { depth: null }));
        }
        return callback(null, result);
    });
};

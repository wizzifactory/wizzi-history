/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\root\index.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var errors = require('./lib/errors');
var fail = require('./lib/util/fail');
var verify = require('./lib/util/verify');
var file = require('./lib/util/file');
var log = require('./lib/util/log')(module);
var GenWriter = require('./lib/artifact/genwriter');
var StringWriter = require('./lib/util/stringwriter');
var md = module.exports = {};
md.name = 'wizzi';
md.filename = __filename;
// core
md.errors = errors;
md.file = file;
md.fail = fail;
md.chalk = require('chalk');
md.verify = verify;
md.log = require('./lib/util/log');
md.StringWriter = StringWriter;
md.HtmlBuilder = require('./lib/util/htmlbuilder').HtmlBuilder;
md.lineParser = require('./lib/util/lineParser');
md.interpolate = require('./lib/util/interpolate');
md.ittf = require('./lib/ittf/ittf');
md.ProductionContext = require('./lib/production/context').ProductionContext;
var options = require('./lib/production/options');
md.options = options;
md.GenWriter = GenWriter;
md.utilNode = require('./lib/util/node');
md.acl = require('./lib/acl');
// option
md.option = require('./lib/util/option');
md.option.init({
    force: false, 
    stack: true
});
// services
md.config = require('./lib/config');
md.fsapi = require('./lib/ittf/repo/fsapi/index');
var wizziMongoDb;
var wizziMongoDb_FS;

/**
     start a wizzi instance
*/
md.startInstance = function(configOptions,callback) {
    configOptions = Object.assign({}, configOptions);
    var wfBaseFolder = configOptions.wfBaseFolder;
    if (wfBaseFolder && wfBaseFolder.length > 0) {
        md.config.set('wfBaseFolder', wfBaseFolder);
    }
    var repoUri = configOptions.repoUri;
    var repoBaseFolderUri = configOptions.repoBaseFolderUri;
    if (repoUri && repoUri.length > 0) {
        md.config.set('isRepoDbInstance', true);
        md.config.set('repoUri', repoUri);
        wizziMongoDb = require('wizzi-mongodb');
        wizziMongoDb_FS = wizziMongoDb.Filesystem;
        wizziMongoDb_FS.mount(repoUri, repoBaseFolderUri, function(err,notUsed) {
            if (err) {
                return callback(err)
                ;
            }
            console.log(md.chalk.yellow('REPO DB CONNECTED on uri: ' + repoUri + ' - repoBaseFolderUri: ' + repoBaseFolderUri));
            console.log(md.chalk.yellow('WIZZI PRODUCTION INSTANCE STARTED WITH REPO DB'));
            return callback(null);
        });
    }
    else {
        console.log(md.chalk.yellow('WIZZI PRODUCTION INSTANCE STARTED WITHOUT REPO DB - FILESYSTEM ONLY'));
        return callback(null);
    }
};

/**
     terminate a wizzi instance
*/
md.terminateInstance = function(callback) {
    if (wizziMongoDb_FS && wizziMongoDb_FS.isMounted) {
        wizziMongoDb_FS.unmount(function(err,notUsed) {
            if (err) {
                return callback(err)
                ;
            }
            console.log(md.chalk.yellow('REPO DB CONNECTION CLOSED'));
            console.log(md.chalk.yellow('WIZZI PRODUCTION INSTANCE TERMINATED'));
            callback(null);
        });
    }
    else {
        console.log(md.chalk.yellow('WIZZI PRODUCTION INSTANCE TERMINATED'));
        callback(null);
    }
};
/**
     startRunnerServer is async.
     Can be used at startup to load WizziModels, that is an async process,
     implementing the onStart and onPrepare callbacks in the wizzifile.
     During an mTree evaluation the calls to runnerServer
     must be sync. Both $.api(name, query) and $.model(name, query)
     are sync methods that operate on WizziModels or POJO
     previously prepared.
*/
md.startRunnerServer = function(options,callback) {
    options = (options || {});
    var runnerServerCWD = (options.cwd || process.cwd());
    var wizziFilePath = path.join(runnerServerCWD, 'wizzifile.js');
    if (md.file.isFile(wizziFilePath)) {
        md.wizzifile = require(wizziFilePath);
        console.log(md.chalk.yellow(('WIZZI FILE ' + wizziFilePath)));
        if (md.wizzifile.onConfig) {
            md.wizzifile.onConfig(md.config, function(err,result) {
                if (err) {
                    return callback(err)
                    ;
                }
                var RunnerServer = require('./runtime/runnerserver');
                RunnerServer.init(runnerServerCWD, md);
                var runnerServer = RunnerServer.instance;
                if (md.wizzifile.onStart) {
                    md.wizzifile.onStart(runnerServer, md.config, function(err,result) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        if (md.wizzifile.onPrepare) {
                            md.wizzifile.onPrepare(runnerServer, md.config, function(err,result) {
                                if (err) {
                                    return callback(err)
                                    ;
                                }
                                console.log(md.chalk.yellow('WIZZI STARTED ON FOLDER ' + runnerServerCWD));
                                return callback(null);
                            });
                        }
                        else {
                            console.log(md.chalk.yellow('WIZZI STARTED ON FOLDER ' + runnerServerCWD));
                            return callback(null);
                        }
                    });
                }
                else {
                    console.log(md.chalk.yellow('WIZZI STARTED ON FOLDER ' + runnerServerCWD));
                    return callback(null);
                }
            });
        }
        else {
            return callback(null);
        }
    }
    else {
        return callback(null);
    }
};
// factory
md.ProductionManager = require('./lib/production/manager');
md.ProductionService = require('./lib/production/service');
// schema
md.schema = require('./schema');
/**
     expose the js types for next version bootstrap
*/
var jsModelTypeFile = path.resolve(path.join(__dirname, './lib/wizzi/models/js-model.g.js')
)
;
if (md.file.exists(jsModelTypeFile)) {
    md.jsModelType = require('./lib/wizzi/models/js-model.g');
}
else {
    console.log('WARNING module ./lib/wizzi/models/js-model.g NOT FOUND. During current version bootstrap is OK');
}
/**
     Expose WizziModelTypes of this package
*/
/**
     async load a WizziModel of type 'wizzischema' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.wizzischema = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('wizzischema');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "wizzischema" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
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
     async load a WizziModel of type 'npmpackage' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.npmpackage = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('npmpackage');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "npmpackage" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
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
     async load a WizziModel of type 'wftest' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.wftest = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('wftest');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "wftest" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
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
     async load a WizziModel of type 'js' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.js = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('js');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "js" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
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
     async load a WizziModel of type 'html' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.html = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('html');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "html" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
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
     async load a WizziModel of type 'css' from an IttfDocument
     @param {String} ittfDocumentUri
     @param {Object} context : IttfModel evaluation context
     @param {Function} callback
*/
md.css = function(ittfDocumentUri,evaluationContext,callback) {
    var factory = md.getWizziModelFactory('css');
    if (!factory) {
        var error = new errors.NotFoundError('WizziModelFactory','model type "css" not found. Did you executed the "schemas.js" module?',ittfDocumentUri);
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
     Expose ArtifactGenerators of this package
*/
/**
    Async generate a text/document artifact, that uses a raw ittfModel as input model.
     The context parameter may be used to pass context data to the artifact generator;
     it may contain a __data property that will be set on the genWriter data property.
     genWriter is the context object of an artifact generation
*/
md.textDocument = function(ittfDocumentPath,context,callback) {
    // async load the ittfModel
    md.ittf.loadModel(ittfDocumentPath, context, function(err,ittfModel) {
        if (err) {
            // no need to augment the err object
            return callback(err, null);
        }
        //
        var modelRootNode = ittfModel.nodes[0];
        // async generate
        md.doArtifactGeneration(modelRootNode, ittfDocumentPath, 'text/document', context, callback);
    });
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
/**
     async generate a js/module artifact
     the context parameter may contain a __data property that will be
     set on the genWriter data property
*/
md.jsModule = function(ittfDocumentPathOrContext,context,callback) {
    if (verify.isString(ittfDocumentPathOrContext)) {
        // async load the wizziModelInstance
        md.js(ittfDocumentPathOrContext, context, function(err,wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            // async generate
            md.doArtifactGeneration(wizziModelInstance, ittfDocumentPathOrContext, 'js/module', context, function(err,results) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    else {
        // async generate
        md.doArtifactGeneration(ittfDocumentPathOrContext, 'Unknown', 'js/module', context, callback);
    }
};
/**
     async generate a html/document artifact
     the context parameter may contain a __data property that will be
     set on the genWriter data property
*/
md.htmlDocument = function(ittfDocumentPathOrContext,context,callback) {
    if (verify.isString(ittfDocumentPathOrContext)) {
        // async load the wizziModelInstance
        md.html(ittfDocumentPathOrContext, context, function(err,wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            // async generate
            md.doArtifactGeneration(wizziModelInstance, ittfDocumentPathOrContext, 'html/document', context, function(err,results) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    else {
        // async generate
        md.doArtifactGeneration(ittfDocumentPathOrContext, 'Unknown', 'html/document', context, callback);
    }
};
/**
     async generate a css/document artifact
     the context parameter may contain a __data property that will be
     set on the genWriter data property
*/
md.cssDocument = function(ittfDocumentPathOrContext,context,callback) {
    if (verify.isString(ittfDocumentPathOrContext)) {
        // async load the wizziModelInstance
        md.css(ittfDocumentPathOrContext, context, function(err,wizziModelInstance) {
            if (err) {
                return callback(err, null);
            }
            // async generate
            md.doArtifactGeneration(wizziModelInstance, ittfDocumentPathOrContext, 'css/document', context, function(err,results) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    else {
        // async generate
        md.doArtifactGeneration(ittfDocumentPathOrContext, 'Unknown', 'css/document', context, callback);
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
//
md.executeInstanceJob = function(request,callback) {
    md.startInstance(request.config, function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        md.executeJob(request.job, function(err,notUsed) {
            if (err) {
                return callback(err)
                ;
            }
            md.terminateInstance(callback);
        });
    });
};
md.executeJob = function(request,callback) {
    var jobName = request.name;
    var path = request.path;
    var options = request.options;
    var wizziFactoryPackages = request.wizziFactoryPackages;
    var globalContext = request.globalContext;
    var aclStat = request.aclStat;
    
    var pman = new md.ProductionManager(options);
    pman.aclStat(aclStat);
    pman.globalContext(globalContext);
    
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
            var msg = 'WizziFactoryJob ' + jobName + '\nError running production: ' + path + '\n' + util.inspect(err, {depth: null});
            fail.warn(msg);
            throw new Error(msg);
        }
        log.success('run completed');
        pman.persistToFile(function(err,result) {
            if (err) {
                var msg = 'WizziFactoryJob ' + jobName + '\nError persisting production to file: ' + path + '\n' + util.inspect(err, {depth: null});
                fail.warn(msg);
                throw new Error(msg);
            }
            log.success('persistToFile completed');
            if (callback) {
                callback(null, result);
            }
        });
    });
};

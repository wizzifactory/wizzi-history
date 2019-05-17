var path = require('path');
var util = require('util');
var async = require('async');
var _ = require('lodash');
var verify = require('../util/verify');
var errors = require('../errors');
var fail = require('../util/fail');
var file = require('../util/file');
var log = require('../util/log')(module);
function logme() {
    if (false) console.log.apply(console, arguments);
}
var AsyncModelLoader = {
    // load a collection of wizziModels from a collection of modelInfos
    loadMany: function (modelInfos, callback) {
        if (modelInfos.length === 0) {
            return callback(null, []);
        }
        log.setLevel(modelInfos[0].___state.pman.options.verbose);
        async.map(modelInfos, AsyncModelLoader._load_item, function (err, wizziModels) {
            if (err) return callback(err, null);
            callback(null, wizziModels);
        });
    },
    // load a single wizziModel from a single modelInfo
    load: function (modelInfo, callback) {
        log.setLevel(modelInfo.___state.pman.options.verbose);
        log.info('Started.async.load.model', modelInfo.srcFullPath().substr(modelInfo.___state.pman.options.basedir.length + 1));
        var modelInfos = [modelInfo];
        async.map(modelInfos, AsyncModelLoader._load_item, function (err, wizziModels) {
            if (err) return callback(err, null);
            log.info('Ended.async.load.model', modelInfo.srcFullPath().substr(modelInfo.___state.pman.options.basedir.length + 1));
            callback(null, wizziModels[0]);
        });
    },
    // Internal worker. Loads a WizziModel from a modelInfo (from element @model@ of schema @wfjob@).
    _load_item: function (modelInfo, callback) {
        logme('AsyncModelLoader._load_item.modelInfo.config', util.inspect(modelInfo.config, { depth: 3 }));
        
        if (modelInfo.contexts && modelInfo.contexts.length > 0) {
            // The modelInfo has context modelInfos, so the wizziModel is templated.
            // Load recursively the contextWizziModels
            // set the production state on each context model info
            modelInfo.contexts.forEach(function (contextModelInfo) {
                contextModelInfo.___state = modelInfo.___state;
                logme('AsyncModelLoader._load_item.context', contextModelInfo.id, contextModelInfo.srcFullPath());
            })
            // recurse wizziModels loading on ModelInfo.contexts
            async.map(modelInfo.contexts, AsyncModelLoader._load_item, function (err, contextWizziModels) {
                if (err)
                {
                    log.error('Error.AsyncModelLoader._load_item', util.inspect(err, { depth: null }));
                    return callback(err, null);
                }
                // prepare context model instances for model loading
                // if one context is a collection context, prepare collection context
                var wizziModelWithCollection = null,
                    collectionContextIndex = -1,
                    loadingContext = {};  // The context object that will be passed to the wizziModelFactory
                for (var i = 0; i < contextWizziModels.length; i++) {
                    // logme('*** Context.model.loaded as', util.inspect(contextWizziModels[i], { depth: 1 }));
                    // log.info('Context.model.loaded as __' + contextWizziModels[i].WmtTag, modelInfo.contexts[i].srcFullPath().substr(modelInfo.___state.pman.options.basedir.length + 1));
                    var contextWizziModel = contextWizziModels[i];
                    // logme('contextWizziModel.exportName', contextWizziModel.___exportName);
                    //
                    // Load every contextWizziModel in the loadingContext,
                    // even the wizziModelWithCollection, it may be useful during artifact generation
                    // even if the property wzParent of the collectionItemObject contain the same data
                    loadingContext[contextWizziModel.___exportName] = contextWizziModel;
                    if (contextWizziModel.___coll) {
                        // this contextWizziModel is a context model from which 
                        // must be extracted a collection context
                        wizziModelWithCollection = contextWizziModel;
                        collectionContextIndex = i;
                    }
                }
                // log.info('Context.model.loaded', modelInfo.contexts[0].srcFullPath().substr(modelInfo.___state.pman.options.basedir.length + 1));
                if (collectionContextIndex > -1) {
                    // One of the contextWizziModels is a collection context, 
                    // load one wizziModel for each item of the collection context
                    var collectionItemLoadDatas = AsyncModelLoader.prepareCollectionItemLoadDatas(
                        modelInfo,
                        contextWizziModels,
                        wizziModelWithCollection,
                        loadingContext
                    );
                    if (modelInfo.generatorRequireContextOnly) {
                        // There is no source document for this artifact
                        // The ArtifactGenerator require a context object only,
                        // so collext contexts in an array and pass them back
                        var context, newcontext;
                        var collModelInstances = [];
                        for (var i = 0; i < collectionItemLoadDatas.length; i++) {
                            context = collectionItemLoadDatas[i].context;
                            newcontext = {}
                            for (var k in context) {
                                newcontext[k] = context[k];
                            }
                            newcontext.___collItem = collectionItemLoadDatas[i].itemObject; // stored so the collection artifacts can resolve the destination filepath.
                            collModelInstances.push(newcontext);
                        }
                        callback(null, collModelInstances);
                    } else {
                        async.map(collectionItemLoadDatas, AsyncCollectionModelLoader.load, function (err, collModelInstances) {
                            if (err) return callback(err, null);
                            callback(null, collModelInstances);
                        });
                    }
                } else {
                    // no collection context found, load a single wizziModel with a loadingContext
                    var wizziModelFactory = modelInfo.___state.pman.getWizziModelFactory(modelInfo.schema);
                    if (wizziModelFactory == null) {
                        var error = new errors.NotFoundError('WizziModelFactory', modelInfo.schema, modelInfo);
                        fail.warn(error);
                        throw error;
                    }
                    logme('wizziModelFactory', wizziModelFactory);
                    var ittfLoadContext = _.assign({}, modelInfo.globalContext || {}, loadingContext);
                    wizziModelFactory(modelInfo.srcFullPath(), ittfLoadContext, function (err, wizziModel) {
                        if (err) return callback(err, null);
                        // VIA 24/2/2017 wizziModel.contextWizziModels = contextWizziModels; // ???
                        // TODO model transformations
                        wizziModel.___exportName = modelInfo.exportName || modelInfo.schema;
                        if (modelInfo.coll) {
                            // this wizziModel is a context model from which 
                            // will be extracted a collection context, bubbling up from recursion
                            wizziModel.___coll = modelInfo.coll; 
                        }
                        logme('AsyncModelLoader._load_item', 'success with loadingContext no collectionContext, modelInfo', modelInfo.id, 'exportName', wizziModel.___exportName);
                        callback(null, wizziModel);
                    });
                }
            });
        } else {
            // modelInfo has no context, we can check for a cached instance
            var srcFullPath = modelInfo.srcFullPath();
            // TODO implements cache
            //   wizziModel = modelInfo.___state.models[srcFullPath];
            //   if (verify.isObject(wizziModel)) {
            //      log.warn("Model loaded from cache: " + srcFullPath);
            //      callback(null, wizziModel);
            //      return;
            //   }
            //   log.warn("Model not found in cache: " + srcFullPath);
            // cached instance not found, load model using the WizziModelFactory
            var wizziModelFactory = modelInfo.___state.pman.getWizziModelFactory(modelInfo.schema);
            if (wizziModelFactory == null) {
                var error = new errors.NotFoundError('WizziModelFactory', modelInfo.schema, modelInfo);
                fail.warn(error);
                throw error;
            }
            var ittfLoadContext = _.assign({}, {}, modelInfo.globalContext || {});
            wizziModelFactory(srcFullPath, ittfLoadContext, function (err, wizziModel) {
                if (err) return callback(err, null);
                if (modelInfo.transformers && modelInfo.transformers.length > 0) {
                    AsyncModelLoader.recurseTransform(modelInfo.transformers, 0, wizziModel, modelInfo, function (err, transformedWizziModel) {
                        if (err) return callback(err, null);
                        transformedWizziModel.___exportName = modelInfo.exportName || modelInfo.schema;
                        if (modelInfo.coll) {
                            // this wizziModel is a context model from which 
                            // will be extracted a collection context, when bubbling up from recursion
                            transformedWizziModel.___coll = modelInfo.coll;
                        }
                        // cache the instance
                        modelInfo.___state.models[srcFullPath] = transformedWizziModel;
                        logme('AsyncModelLoader._load_item', 'success after transformation, modelInfo', modelInfo.id, 'exportName', wizziModel.___exportName);
                        callback(null, transformedWizziModel);
                    });
                } else {
                    wizziModel.___exportName = modelInfo.exportName || modelInfo.schema;
                    if (modelInfo.coll) {
                        // this wizziModel is a context model from which 
                        // will be extracted a collection context, when bubbling up from recursion
                        wizziModel.___coll = modelInfo.coll;
                    }
                    // cache the instance
                    modelInfo.___state.models[srcFullPath] = wizziModel;
                    logme('AsyncModelLoader._load_item', 'success, modelInfo', modelInfo.id, 'exportName', wizziModel.___exportName);
                    callback(null, wizziModel);
                }
            });
        }
    },
    recurseTransform: function (modelTransformers, index, instance, modelInfo, callback) {
        if (index >= modelTransformers.length) {
            return callback(null, instance);
        }
        var transformerConfig = modelTransformers[index];
        var modelTransformer = modelInfo.___state.pman.getModelTransformer(transformerConfig.name);
        if (modelTransformer == null) {
            var error = new errors.NotFoundError('ModelTransformer', modelTransformers[index], modelInfo);
            fail.warn(error);
            throw error;
        }
        modelTransformer(instance, {}, function (err, transformedWizziModel) {
            if (err) return callback(err, null);
            if (transformerConfig.dumpFile) {
                file.writeJSON(transformerConfig.dumpFile, transformedWizziModel);
            }
            AsyncModelLoader.recurseTransform(modelTransformers, index + 1, transformedWizziModel, modelInfo, callback);
        });
    },
    prepareCollectionItemLoadDatas: function (
        modelInfo, wizziModelContexts, wizziModelWithCollection, loadingContext
        ) {
        logme('prepareCollectionItemLoadDatas', 'modelInfo', modelInfo.id);
        var collName = wizziModelWithCollection.___coll.name;
        var collItemExportName = wizziModelWithCollection.___coll.itemName;
        logme('prepareCollectionItemLoadDatas', 'collName, collItemExportName', collName, collItemExportName);
        
        var collectionArray = wizziModelWithCollection[collName];
        if (!verify.isArray(collectionArray))
        {
            var error = new errors.IttfLoadError('Collection is not an array. Name: ', collName, modelInfo);
            fail.warn(error);
            throw error;
        }
        var itemLoadDatas = [], context;
        collectionArray.forEach(function (itemObject) {
            context = {}
            for (var k in loadingContext)
                context[k] = loadingContext[k];
            context[collItemExportName] = itemObject;
            itemLoadDatas.push({
                modelInfo: modelInfo,
                itemObject: itemObject,
                context: context
            });
            if (itemLoadDatas.length == 1) {
                for (var k in context) {
                    logme('prepareCollectionItemLoadDatas', 'context exportName', k);
                }
            }
            logme('prepareCollectionItemLoadDatas', 'itemObject', itemObject.wzName);
        });
        return itemLoadDatas;
    }
    /* TODO ??? VIA ???
    // load the context objects of a model info
    loadContexts: function (modelInfo, callback) {
        log.setLevel(modelInfo.___state.pman.options.verbose);
        modelInfo.contexts.forEach(function (ctxitem) {
            ctxitem.___state = modelInfo.___state;
            //NO log.info('Context.model.toload', ctxitem.srcFullPath().substr(modelInfo.___state.pman.options.basedir.length + 1));
        })
        async.map(modelInfo.contexts, AsyncModelLoader._load_item, function (err, contextWizziModels) {
            // logme('*** loaded contexts', util.inspect(result, { depth: 1 }));
            if (err) { callback(err, null); return; }
            callback(null, contextWizziModels);
        });
    }
    */
};
var AsyncCollectionModelLoader = {
    /*
        Load a single WizziModel using a single collection item as a context.
        
        param collectionLoadData:Object {
                  modelInfo:Object {
                      schema:String,
                      ___state:Object {
                          pman:Object // ProductionManager
                      },
                      srcFullPath:Function
                  },
                  context: Object { // prepared by prepareCollectionItemLoadDatas
                  }
              }
    */
    load: function (collectionLoadData, callback) {
        var modelInfo = collectionLoadData.modelInfo,
            context = collectionLoadData.context,
            itemObject = collectionLoadData.itemObject;
        var wizziModelFactory = modelInfo.___state.pman.getWizziModelFactory(modelInfo.schema);
        if (wizziModelFactory == null) {
            var error = new errors.NotFoundError('WizziModelFactory', modelInfo.schema, modelInfo);
            fail.warn(error);
            throw error;
        }
        logme("AsyncCollectionModelLoader.load", "modelInfo", modelInfo.id, "schema", modelInfo.schema);
        // wizziModelFactory(IttfDocumentUri, ContextObject)
        var ittfLoadContext = _.assign({}, modelInfo.globalContext || {}, context);
        wizziModelFactory(modelInfo.srcFullPath(), ittfLoadContext, function (err, wizziModel) {
            if (err) return callback(err, null);
            // No export name. This can only be a final model to be passed to a generator, not a context model.
            // wizziModel.___exportName = ...;
            logme("AsyncCollectionModelLoader.load", "success, root", wizziModel.wzTag, wizziModel.wzName);
            wizziModel.___collItem = itemObject; // stored so the collection artifacts can resolve the destination filepath.
            callback(null, wizziModel);
        });
    }
}
module.exports = AsyncModelLoader;

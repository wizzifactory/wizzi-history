/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\model\asyncModelLoader.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var _ = require('lodash');
var verify = require('../util/verify');
var errors = require('../errors');
var fail = require('../util/fail');
var file = require('../util/file');
var log = require('../util/log')(module)

;

function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}


function loadMany(modelInfos,callback) {
    if (modelInfos.length > 0) {
        log.setLevel(modelInfos[0].productionManager().options.verbose);
    }
    async.map(modelInfos, _load_item, callback);
}
function load(modelInfo,callback) {
    log.setLevel(modelInfo.productionManager().options.verbose);
    log.info('Started.async.load.model', modelInfo.srcFullPath().substr((modelInfo.productionManager().options.basedir.length + 1))
    );
    var modelInfos = [
        modelInfo
    ];
    async.map(modelInfos, _load_item, function(err,wizziModels) {
        if (err) {
            return callback(err, null);
        }
        log.info('Ended.async.load.model', modelInfo.srcFullPath().substr((modelInfo.productionManager().options.basedir.length + 1))
        );
        callback(null, wizziModels[0]);
    });
}
/**
     Load a single WizziModel using ModelInfo data
     The master ModelInfo may contain one or many context ModelInfos
*/
function _load_item(masterModelInfo,callback) {
    logme('AsyncModelLoader._load_item.masterModelInfo.config', util.inspect(masterModelInfo.config, {
        depth: 3
    })
    );
    if (masterModelInfo.contexts && masterModelInfo.contexts.length > 0) {
        // The master modelInfo has context ModelInfos, so it is templated.
        // First of all load recursively the context models
        
        // step 1 - set the production state on each contextModelInfo
        var i, i_len=masterModelInfo.contexts.length, contextModelInfo;
        for (i=0; i<i_len; i++) {
            contextModelInfo = masterModelInfo.contexts[i];
            // set contextModelInfo.___state = masterModelInfo.___state
            logme('AsyncModelLoader._load_item.context', contextModelInfo.id, contextModelInfo.srcFullPath());
        }
        
        // step 2 - recurse contextModelInfo loading
        async.map(masterModelInfo.contexts, _load_item, function(err,contextWizziModels) {
            if (err) {
                log.error('Error.AsyncModelLoader._load_item', util.inspect(err, {
                    depth: null
                })
                );
                return callback(err, null);
            }
            // step 3 - prepare the loaded context model instances for the master model loading
            // if one context is a collection context, prepare the collection context
            var wizziModelWithCollection = null,
                collectionContextIndex = -1,
                loadingContext = {};
            for (var i = 0; i < contextWizziModels.length; i++) {
                var contextWizziModel = contextWizziModels[i];
                loadingContext[contextWizziModel.___exportName] = contextWizziModel;
                if (contextWizziModel.___coll) {
                    wizziModelWithCollection = contextWizziModel;
                    collectionContextIndex = i;
                }
            }
            if (collectionContextIndex > -1) {
                // Yes one of the loaded context models is a collection context.
                // step 3.b - Prepare the collection context. This is quite complex.
                // . We must have as many context objects as the items in the collection context
                // . Every context object has all the loaded context plus the
                // item of the collection context.
                // So the template of the artifact to be generate will have
                // available as a context its collection item plus all the other context models.
                var collectionItemLoadDatas = prepareCollectionItemLoadDatas(masterModelInfo, contextWizziModels, wizziModelWithCollection, loadingContext)
                ;
                if (collectionItemLoadDatas && collectionItemLoadDatas.__is_error) {
                    console.log('__is_error ', collectionItemLoadDatas);
                    return callback(collectionItemLoadDatas);
                }
                if (masterModelInfo.generatorRequireContextOnly) {
                    // There is no source document for the artifact to be generated.
                    // The ArtifactGenerator simply requires a context object.
                    // So collect the loaded contexts in an array and pass them back.
                    var collModelInstances = [];
                    var i, i_len=collectionItemLoadDatas.length, itemLoadData;
                    for (i=0; i<i_len; i++) {
                        itemLoadData = collectionItemLoadDatas[i];
                        collModelInstances.push(_.assign({}, itemLoadData.context, {
                            ___collItem: itemLoadData.itemObject
                        })
                        );
                    }
                    callback(null, collModelInstances);
                }
                else {
                    // step 4.b - load a context for each item of the collection context
                    async.map(collectionItemLoadDatas, load_collection, callback);
                }
            }
            else {
                // step 3.1 - load the context model
                masterModelInfo.getWizziModelFactory(function(err,wizziModelFactory) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    var ittfLoadContext = _.assign({}, masterModelInfo.productionManager().globalContext || {}, loadingContext)
                    ;
                    ittfLoadContext.__productionManager = masterModelInfo.productionManager();
                    wizziModelFactory(masterModelInfo.srcFullPath(), ittfLoadContext, function(err,wizziModel) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        wizziModel.___exportName = (masterModelInfo.exportName || masterModelInfo.schema);
                        if (masterModelInfo.coll) {
                            wizziModel.___coll = masterModelInfo.coll;
                        }
                        logme('AsyncModelLoader._load_item', 'success with loadingContext no collectionContext, masterModelInfo', masterModelInfo.id, 'exportName', wizziModel.___exportName);
                        callback(null, wizziModel);
                    });
                });
            }
        });
    }
    else {
        // The master modelInfo has no context ModelInfos
        // simply load it
        var srcFullPath = masterModelInfo.srcFullPath();
        masterModelInfo.getWizziModelFactory(function(err,wizziModelFactory) {
            if (err) {
                return callback(err)
                ;
            }
            var ittfLoadContext = _.assign({}, {}, (masterModelInfo.productionManager().globalContext || {}))
            ;
            ittfLoadContext.__productionManager = masterModelInfo.productionManager();
            wizziModelFactory(srcFullPath, ittfLoadContext, function(err,wizziModel) {
                if (err) {
                    return callback(err)
                    ;
                }
                if (masterModelInfo.transformers && masterModelInfo.transformers.length > 0) {
                    recurseTransform(masterModelInfo.transformers, 0, wizziModel, masterModelInfo, function(err,transformedWizziModel) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        transformedWizziModel.___exportName = (masterModelInfo.exportName || masterModelInfo.schema);
                        if (masterModelInfo.coll) {
                            // this wizziModel is a context model from which
                            // will be extracted a collection context,
                            // when bubbling up from the recursive loading
                            transformedWizziModel.___coll = masterModelInfo.coll;
                        }
                        // cache the loaded model, one day, may be, will be useful
                        masterModelInfo.productionManager().setStateModel(srcFullPath, transformedWizziModel);
                        logme('AsyncModelLoader._load_item', 'success after transformation, masterModelInfo', masterModelInfo.id, 'exportName', wizziModel.___exportName);
                        callback(null, transformedWizziModel);
                    });
                }
                else {
                    wizziModel.___exportName = (masterModelInfo.exportName || masterModelInfo.schema);
                    if (masterModelInfo.coll) {
                        // this wizziModel is a context model from which
                        // will be extracted a collection context,
                        // when bubbling up from the recursive loading
                        wizziModel.___coll = masterModelInfo.coll;
                    }
                    // cache the loaded model, one day, may be, will be useful
                    masterModelInfo.productionManager().setStateModel(srcFullPath, wizziModel);
                    logme('AsyncModelLoader._load_item', 'success, masterModelInfo', masterModelInfo.id, 'exportName', wizziModel.___exportName);
                    callback(null, wizziModel);
                }
            });
        });
    }
}
function recurseTransform(modelTransformers,index,instance,modelInfo,callback) {
    if (index >= modelTransformers.length) {
        return callback(null, instance);
    }
    var transformerConfig = modelTransformers[index];
    modelInfo.getModelTransformer(transformerConfig.name, function(err,modelTransformer) {
        if (err) {
            return callback(err)
            ;
        }
        modelTransformer(instance, {}, function(err,transformedWizziModel) {
            if (err) {
                return callback(err)
                ;
            }
            if (transformerConfig.dumpFile) {
                file.writeJSON(transformerConfig.dumpFile, transformedWizziModel);
            }
            recurseTransform(modelTransformers, index + 1, transformedWizziModel, modelInfo, callback);
        });
    });
}
function prepareCollectionItemLoadDatas(modelInfo,wizziModelContexts,wizziModelWithCollection,loadingContext) {
    logme('prepareCollectionItemLoadDatas', 'modelInfo', modelInfo.id);
    var collName = wizziModelWithCollection.___coll.name;
    var collItemExportName = wizziModelWithCollection.___coll.itemName;
    logme('prepareCollectionItemLoadDatas', 'collName, collItemExportName', collName, collItemExportName);
    var collectionArray = wizziModelWithCollection[collName];
    if (!verify.isArray(collectionArray)) {
        return error('Collection is not an array. Name: ' + collName + ', ' + modelInfo.toString(), 'prepareCollectionItemLoadDatas')
        ;
    }
    var itemLoadDatas = [],
        context;
    var i, i_len=collectionArray.length, itemObject;
    for (i=0; i<i_len; i++) {
        itemObject = collectionArray[i];
        context = _.assign({}, loadingContext)
        ;
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
    }
    return itemLoadDatas;
}
/**
     Load a single WizziModel using a single collection item as a context.
     param collectionLoadData:Object {
     modelInfo:Object {
     schema:String,
     ___state:Object {
     pman:Object // ProductionManager
     },
     srcFullPath:Function {
     },
     context: Object { // prepared by prepareCollectionItemLoadDatas
     }
     }
*/
function load_collection(collectionLoadData,callback) {
    var modelInfo = collectionLoadData.modelInfo,
        context = collectionLoadData.context,
        itemObject = collectionLoadData.itemObject;
    modelInfo.getWizziModelFactory(function(err,wizziModelFactory) {
        if (err) {
            return callback(err)
            ;
        }
        logme("AsyncModelLoader.load_collection", "modelInfo", modelInfo.id, "schema", modelInfo.schema);
        var ittfLoadContext = _.assign({}, modelInfo.productionManager().globalContext || {}, context)
        ;
        ittfLoadContext.__productionManager = modelInfo.productionManager();
        console.log('asyncModelLoader.load_collection.ittfLoadContext', ittfLoadContext);
        wizziModelFactory(modelInfo.srcFullPath(), ittfLoadContext, function(err,wizziModel) {
            if (err) {
                return callback(err)
                ;
            }
            logme("AsyncCollectionModelLoader.load", "success, root", wizziModel.wzTag, wizziModel.wzName);
            wizziModel.___collItem = itemObject;
            callback(null, wizziModel);
        });
    });
}
function error(message,method) {
    var err = {
        __is_error: true, 
        message: message, 
        source: "wizzi/lib/model/asyncModelLoader/" + method
    };
    logme(err);
    return err;
}

module.exports = {
    loadMany: loadMany,
    load: load,
    _load_item: _load_item,
    recurseTransform: recurseTransform,
    prepareCollectionItemLoadDatas: prepareCollectionItemLoadDatas,
    load_collection: load_collection
};

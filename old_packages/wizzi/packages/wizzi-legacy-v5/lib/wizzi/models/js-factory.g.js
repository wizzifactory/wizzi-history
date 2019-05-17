/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-legacy-v4\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\node_modules\wizzi-core\lib\artifacts\wfschema\factory\gen\ittf\wfschema-factory.js.ittf
    utc time: Thu, 06 Sep 2018 09:45:42 GMT
*/
'use strict';
/**
     js WizziModelFactory
*/
var path = require('path');
var util = require('util');
var _ = require('lodash');

var stringify = require('json-stringify-safe');

var jsschema = require('./js-model.g');

var _md = module.exports = {};

//
// called from the wizzi.wizziFactory.getLoadModel method
/**
    params
     { wizziObject
         func loadMTree
             api-ref wizzi-mtree.loader.loadMTree
         { file
             api-ref wizzi-utils.file
         { verify
             api-ref wizzi-utils.verify
         { errors
             type WizziModelLoadError
         { wizziFactory
             api-ref wizzi.wizziFactory
*/
_md.createLoadModel = function(wizziObject) {
    var options = wizziObject.options || {};
    var loadMTree = wizziObject.loadMTree;
    var file = wizziObject.file;
    var verify = wizziObject.verify;
    var errors = wizziObject.errors;
    var wizziFactory = wizziObject.wizziFactory;
    function loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, options, callback) {
        
        var start = Date.now(),
            modulemodel;
        if (mTree.nodes.length == 0) {
            var modulemodel = new modulemodelType('EmptyIttfDocument');
        }
        else {
            // Get the model type of the root node of the ittf model.
            var rootNode = mTree.nodes[0];
            var modulemodelType = jsschema[rootNode.n];
            if (!modulemodelType) {
                var maptag = jsschema.__tagElementMapping[rootNode.n];
                if (typeof maptag === 'string') {
                    modulemodelType = jsschema[maptag];
                }
                if (!modulemodelType) {
                    var error = new errors.WizziModelLoadError('In js Factory. Cannot map root node: ' + rootNode.n + ', to any entity of schema: js', ittfDocumentUri);
                    return callback(error);
                }
            }
            // Load the WizziModel from the root node of the mTree
            modulemodel = new modulemodelType(rootNode.v);
            modulemodel.loadHistory = mTree.loadHistory;
            modulemodel.wzFactory = options.wizziFactory;
            try {
                // this is a sync call
                modulemodel.loadFromNode(rootNode);
            } catch (ex) {
                var error = new errors.WizziModelLoadError(ex.message + '\nIn js Factory, calling loadFromNode.', ittfDocumentUri);
                // TODO review errors.WizziModelLoadError
                error.stack = ex.stack;
                return callback(error);
            }
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Loaded ittfDocument ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        // TODO Implement an initialize strategy to be declared in the wizzischema
        // Initialize and verify the loaded model
        var ctx = new jsschema.jsContext();
        modulemodel.wzInitialize(ctx);
        modulemodel.wzVerify(ctx);
        if (ctx.schemaIsValid() === false) {
            var errorsMessage = ctx.validationErrors.join('\n');
            var error = new errors.WizziModelLoadError('In js Factory.\nWizziModel has validation errors: \n' + errorsMessage, ittfDocumentUri);
            callback(error);
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Initialized wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModel) && modulemodel.toJson && file.isFilePath(ittfDocumentUri)) {
            // dump for debug
            var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.json');
            file.write(mTreeDump, stringify(modulemodel.toJson(), null, 2));
        }
        // TODO Generate this wzInitializeAsync call only if wizziModelRequested by the wizzischema
        modulemodel.wzInitializeAsync(ctx, function(err, result) {
            if (err) {
                return callback(err, null);
            }
            if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModelAfterInitializeAsync) && modulemodel.toJson && file.isFilePath(ittfDocumentUri)) {
                // dump for debug
                var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.after.initializeasync.json');
                file.write(mTreeDump, stringify(modulemodel.toJson(), null, 2));
            }
            callback(null, modulemodel);
        });
    }
    if (options.loadFromMTree) {
        /**
             Load a WizziModel of type 'js' from an mTree
        */
        return function(mTree, wizziModelRequest, callback) {
                if (verify.isFunction(callback) !== true) {
                    callback = wizziModelRequest;
                    wizziModelRequest = {};
                }
                if (verify.isFunction(callback) !== true) {
                    throw new TypeError('callback must be a function');
                }
                if (verify.isObject(mTree) !== true) {
                    return callback(error('InvalidArgument', 'mTree', 'The mTree parameter must be an object')
                        )
                    ;
                }
                loadModelFromMTree(mTree, 'Unavailable (loaded from mTree)', wizziModelRequest || {}, {
                    wizziFactory: wizziFactory
                }, callback);
            };
    }
    else {
        /**
             Load a WizziModel of type 'js' from an IttfDocument uri
             params
                 string ittfDocumentUri
                 { loadHistory
                     { __productionManager
                         { productionContext
                             { aclstat
                     { __ittfDocumentStore
                     { mTreeBuildUpContext
                         optional
                     { __request
                         This is a legacy that should disappear.
                         See the wizzi.production.productionContext class.
                         boolean dumpAll
                         boolean dumpIttfModel
                         boolean dumpModel
                         boolean dumpModelAfterInitializeAsync
                 callback
        */
        return function loadModel(ittfDocumentUri, loadHistory, callback) {
                if (typeof callback !== 'function') {
                    throw new TypeError('callback must be a function');
                }
                if (typeof ittfDocumentUri !== 'string') {
                    return callback(error('InvalidArgument', 'loadModel', 'The ittfDocumentUri parameter must be a string')
                        )
                    ;
                }
                if (verify.isObject(loadHistory) !== true) {
                    return callback(error('InvalidArgument', 'loadModel', 'The loadHistory parameter must be an object')
                        )
                    ;
                }
                if (verify.isObject(loadHistory.__productionManager) !== true) {
                    return callback(error('InvalidArgument', 'loadModel', 'The loadHistory.__productionManager parameter must be an object')
                        )
                    ;
                }
                loadHistory.mTreeBuildUpContext = Object.assign({}, loadHistory.__productionManager.globalContext(), loadHistory.mTreeBuildUpContext)
                ;
                var wizziModelRequest = loadHistory.__request || {};
                var start = Date.now();
                // load the magical tree
                loadMTree(ittfDocumentUri, loadHistory, function(err, mTree) {
                    if (err) {
                        return callback(err);
                    }
                    // TODO implement a stats object inside the wizziModelRequest object
                    // _ log.info('Loaded Wizzi model instance of schema js from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
                    if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
                        var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
                        file.write(ittfDumpPath, stringify(mTree, null, 2)
                        );
                    }
                    loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, {
                        wizziFactory: wizziFactory
                    }, callback);
                });
            };
    }
};
function error(code, method, message) {
    return {
            __is_error_: true, 
            code: code, 
            method: method, 
            message: message, 
            source: __filename
        };
}


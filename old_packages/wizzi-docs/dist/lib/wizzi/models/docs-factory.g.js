/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\node_modules\wizzi-core\lib\artifacts\wfschema\factory\gen\ittf\wfschema-factory.js.ittf
    utc time: Mon, 23 Oct 2017 10:07:42 GMT
*/
'use strict';
/**
     docs WizziModelFactory
*/
var path = require('path');
var util = require('util');
var _ = require('lodash');

var stringify = require('json-stringify-safe');

var docsschema = require('./docs-model.g');

var md = module.exports = {};

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
*/
md.createLoadModel = function(wizziObject) {
    var loadMTree = wizziObject.loadMTree;
    var file = wizziObject.file;
    var verify = wizziObject.verify;
    var errors = wizziObject.errors;
    function loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, callback) {
        
        var start = Date.now(),
            docsmodel;
        if (mTree.nodes.length == 0) {
            var docsmodel = new docsmodelType('EmptyIttfDocument');
        }
        else {
            // Get the model type of the root node of the ittf model.
            var rootNode = mTree.nodes[0];
            var docsmodelType = docsschema[rootNode.n];
            if (!docsmodelType) {
                var maptag = docsschema.__tagElementMapping[rootNode.n];
                if (typeof maptag === 'string') {
                    docsmodelType = docsschema[maptag];
                }
                if (!docsmodelType) {
                    var error = new errors.WizziModelLoadError('In docs Factory. Cannot map root node: ' + rootNode.n + ', to any entity of schema: docs', ittfDocumentUri);
                    return callback(error);
                }
            }
            // Load the WizziModel from the root node of the mTree
            docsmodel = new docsmodelType(rootNode.v);
            docsmodel.loadHistory = mTree.loadHistory;
            try {
                // this is a sync call
                docsmodel.loadFromNode(rootNode);
            } catch (ex) {
                var error = new errors.WizziModelLoadError(ex.message + '\nIn docs Factory, calling loadFromNode.', ittfDocumentUri);
                // TODO review errors.WizziModelLoadError
                error.stack = ex.stack;
                return callback(error);
            }
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Loaded ittfDocument ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        // TODO Implement an initialize strategy to be declared in the wizzischema
        // Initialize and verify the loaded model
        var ctx = new docsschema.docsContext();
        docsmodel.wzInitialize(ctx);
        docsmodel.wzVerify(ctx);
        if (ctx.schemaIsValid() === false) {
            var errorsMessage = ctx.validationErrors.join('\n');
            var error = new errors.WizziModelLoadError('In docs Factory.\nWizziModel has validation errors: \n' + errorsMessage, ittfDocumentUri);
            callback(error);
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Initialized wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModel) && docsmodel.toJson && file.isFilePath(ittfDocumentUri)) {
            // dump for debug
            var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.json');
            file.write(mTreeDump, stringify(docsmodel.toJson(), null, 2));
        }
        // TODO Generate this wzInitializeAsync call only if wizziModelRequested by the wizzischema
        docsmodel.wzInitializeAsync(ctx, function(err, result) {
            if (err) {
                return callback(err, null);
            }
            if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModelAfterInitializeAsync) && docsmodel.toJson && file.isFilePath(ittfDocumentUri)) {
                // dump for debug
                var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.after.initializeasync.json');
                file.write(mTreeDump, stringify(docsmodel.toJson(), null, 2));
            }
            callback(null, docsmodel);
        });
    }
    /**
         Load a WizziModel of type 'docs' from an IttfDocument uri
         params
             string ittfDocumentUri
             { loadContext
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
    return function loadModel(ittfDocumentUri, loadContext, callback) {
            if (typeof callback !== 'function') {
                throw new TypeError('callback must be a function');
            }
            if (typeof ittfDocumentUri !== 'string') {
                return callback(error('InvalidArgument', 'loadModel', 'The ittfDocumentUri parameter must be a string')
                    )
                ;
            }
            if (verify.isObject(loadContext) !== true) {
                return callback(error('InvalidArgument', 'loadModel', 'The loadContext parameter must be an object')
                    )
                ;
            }
            if (verify.isObject(loadContext.__productionManager) !== true) {
                return callback(error('InvalidArgument', 'loadModel', 'The loadContext.__productionManager parameter must be an object')
                    )
                ;
            }
            loadContext.modelContext = Object.assign({}, loadContext.__productionManager.globalContext(), loadContext.modelContext)
            ;
            var wizziModelRequest = loadContext.__request || {};
            var start = Date.now();
            // load the magical tree
            loadMTree(ittfDocumentUri, loadContext, function(err, mTree) {
                if (err) {
                    return callback(err);
                }
                // TODO implement a stats object inside the wizziModelRequest object
                // _ log.info('Loaded Wizzi model instance of schema docs from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
                if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
                    var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
                    file.write(ittfDumpPath, stringify(mTree, null, 2)
                    );
                }
                loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, callback);
            });
        };
};
function error(code,method,message) {
    return {
            __is_error_: true, 
            code: code, 
            method: method, 
            message: message, 
            source: __filename
        };
}



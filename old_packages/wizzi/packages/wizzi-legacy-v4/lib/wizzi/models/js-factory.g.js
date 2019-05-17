/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\node_modules\wizzi-core\lib\artifacts\wfschema\factory\gen\ittf\wfschema-factory.js.ittf
    utc time: Wed, 11 Oct 2017 11:27:55 GMT
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

var md = module.exports = {};

md.createLoadModel = function(wizziObject) {
    var loadMTree = wizziObject.loadMTree;
    var file = wizziObject.file;
    var verify = wizziObject.verify;
    var errors = wizziObject.errors;
    function loadModelFromMTree(mTree, ittfDocumentUri, request, callback) {
        
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
            modulemodel.loadContext = mTree.loadContext;
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
        // TODO implement a stats object inside the request object
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
        // TODO implement a stats object inside the request object
        // _ log.info('Initialized wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        if ((request.dumpAll || request.dumpModel) && modulemodel.toJson && file.isFilePath(ittfDocumentUri)) {
            // dump for debug
            var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.json');
            file.write(mTreeDump, stringify(modulemodel.toJson(), null, 2));
        }
        // TODO Generate this wzInitializeAsync call only if requested by the wizzischema
        modulemodel.wzInitializeAsync(ctx, function(err, result) {
            if (err) {
                return callback(err, null);
            }
            if ((request.dumpAll || request.dumpModelAfterInitializeAsync) && modulemodel.toJson && file.isFilePath(ittfDocumentUri)) {
                // dump for debug
                var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.after.initializeasync.json');
                file.write(mTreeDump, stringify(modulemodel.toJson(), null, 2));
            }
            callback(null, modulemodel);
        });
    }
    /**
         Load a WizziModel of type js from an IttfDocument uri
         @param {String} ittfDocumentUri
         @param {Object} context - the loading context object
         @param {Function} callback
    */
    return function loadModel(ittfDocumentUri, context, callback) {
            if (typeof callback !== 'function') {
                throw new TypeError('callback must be a function');
            }
            if (typeof ittfDocumentUri !== 'string') {
                return callback(error(999, 'The ittfDocumentUri parameter must be a string')
                    )
                ;
            }
            if (verify.isObject(context) !== true) {
                return callback(error(999, 'The context parameter must be an object')
                    )
                ;
            }
            if (verify.isObject(context.__productionManager) !== true) {
                return callback(error(999, 'The context.__productionManager parameter must be an object')
                    )
                ;
            }
            context.mTreeBuildUpContext = Object.assign({}, context.__productionManager.globalContext(), context.mTreeBuildUpContext)
            ;
            var wizziModelRequest = context.__request || {};
            var start = Date.now();
            // load the magical tree
            loadMTree(ittfDocumentUri, context, function(err, mTree) {
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
                loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, callback);
            });
        };
};


// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:49 GMT
'use strict';
/**
     css WizziModelFactory
*/
var path = require('path');
var util = require('util');
var _ = require('lodash');


var stringify = require('json-stringify-safe');
var wizzi = require('wizzi');
var file = wizzi.file;
var fail = wizzi.fail;
var errors = wizzi.errors;
var log = wizzi.log(module);
var pathutil = wizzi.pathutil;
var ittf = wizzi.ittf;
var cssschema = require('./css-model.g');
var md = module.exports = {};
/**
     Load a WizziModel of type css from an IttfDocument uri
     @param {String} ittfDocumentUri
     @param {Object} context - the loading context object
     @param {Function} callback
*/
md.load = function(ittfDocumentUri,context,callback) {
    if (!ittfDocumentUri) {
        throw new TypeError('ittfDocumentUri required');
    }
    if (typeof ittfDocumentUri !== 'string') {
        throw new TypeError('ittfDocumentUri must be a string');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    var context = context || {};
    var request = context.__request || {};
    var start = Date.now();
    // load the ittfModel
    ittf.loadModel(ittfDocumentUri, context, function(err,ittfModel) {
        if (err) {
            return callback(err);
        }
        // TODO implement a stats object inside the request object
        // _ log.info('Loaded Wizzi model instance of schema css from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        if ((request.dumpAll || request.dumpIttfModel) && pathutil.isFilePath(ittfDocumentUri)) {
            var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
            file.write(ittfDumpPath, stringify(ittfModel, null, 2)
            );
        }
        loadFromIttfModel(ittfModel, ittfDocumentUri, request, callback);
    });
};
md.loadFromString = function(content,context,callback) {
    if (!content) {
        throw new TypeError('content required');
    }
    if (typeof content !== 'string') {
        throw new TypeError('content must be a string');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    var context = context || {};
    var request = context.__request || {};
    var start = Date.now(),
        ittfDocumentUri = 'text://';
    ittf.loadModelFromString(content, context, function(err,ittfModel) {
        if (err) {
            return callback(err);
        }
        // TODO implement a stats object inside the request object
        // _ log.info('Loaded ittf model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        loadFromIttfModel(ittfModel, ittfDocumentUri, request, callback);
    });
};
function loadFromIttfModel(ittfModel,ittfDocumentUri,request,callback) {
    // Get the model type of the root node of the ittf model.
    var rootNode = ittfModel.nodes[0];
    var cssmodelType = cssschema[rootNode.n];
    if (!cssmodelType) {
        var maptag = cssschema.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            cssmodelType = cssschema[maptag];
        }
        if (!cssmodelType) {
            var error = new errors.WizziModelLoadError('In css Factory. Cannot map root node: ' + rootNode.n + ', to any entity of schema: css', ittfDocumentUri);
            fail.warn(error.message);
            return callback(error);
        }
    }
    // Load the WizziModel from the root node of the ittfModel
    var start = Date.now(),
        cssmodel = new cssmodelType(rootNode.v);
    cssmodel.loadContext = ittfModel.loadContext;
    try {
        // this is a sync call
        cssmodel.loadFromNode(rootNode);
    } catch (ex) {
        var error = new errors.WizziModelLoadError(ex.message + '\nIn css Factory, calling loadFromNode.', ittfDocumentUri);
        fail.warn(error.message);
        return callback(error);
    }
    // TODO implement a stats object inside the request object
    // _ log.info('Loaded wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
    // TODO Implement an initialize strategy to be declared in the wizzischema
    // Initialize and verify the loaded model
    start = Date.now();
    var ctx = new cssschema.cssContext();
    cssmodel.wzInitialize(ctx);
    cssmodel.wzVerify(ctx);
    if (ctx.schemaIsValid() === false) {
        var errorsMessage = ctx.validationErrors.join('\n');
        var error = new errors.WizziModelLoadError('In css Factory.\nWizziModel has validation errors: \n' + errorsMessage, ittfDocumentUri);
        fail.warn(error.message);
        callback(error);
    }
    // TODO implement a stats object inside the request object
    // _ log.info('Initialized wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
    if ((request.dumpAll || request.dumpModel) && cssmodel.toJson && pathutil.isFilePath(ittfDocumentUri)) {
        // dump for debug
        var ittfModelDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.json');
        file.write(ittfModelDump, stringify(cssmodel.toJson(), null, 2));
    }
    // TODO Generate this wzInitializeAsync call only if requested by the wizzischema
    cssmodel.wzInitializeAsync(ctx, function(err,result) {
        if (err) {
            return callback(err, null);
        }
        if ((request.dumpAll || request.dumpModelAfterInitializeAsync) && cssmodel.toJson && pathutil.isFilePath(ittfDocumentUri)) {
            // dump for debug
            var ittfModelDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.after.initializeasync.json');
            file.write(ittfModelDump, stringify(cssmodel.toJson(), null, 2));
        }
        callback(null, cssmodel);
    });
}



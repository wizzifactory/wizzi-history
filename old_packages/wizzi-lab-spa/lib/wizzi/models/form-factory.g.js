/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-lab-spa\node_modules\wizzi\lib\artifacts\wizzischema\factory\gen\ittf\wizzischema-factory.js.ittf
    utc time: Tue, 11 Jul 2017 19:51:58 GMT
*/
'use strict';
/**
     form WizziModelFactory
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
var ittf = wizzi.ittf;
var formschema = require('./form-model.g');
var md = module.exports = {};
/**
     Load a WizziModel of type form from an IttfDocument uri
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
        // _ log.info('Loaded Wizzi model instance of schema form from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        if ((request.dumpAll || request.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
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
    
    var start = Date.now(),
        formmodel;
    if (ittfModel.nodes.length == 0) {
        var formmodel = new formmodelType('EmptyIttfDocument');
    }
    else {
        // Get the model type of the root node of the ittf model.
        var rootNode = ittfModel.nodes[0];
        var formmodelType = formschema[rootNode.n];
        if (!formmodelType) {
            var maptag = formschema.__tagElementMapping[rootNode.n];
            if (typeof maptag === 'string') {
                formmodelType = formschema[maptag];
            }
            if (!formmodelType) {
                var error = new errors.WizziModelLoadError('In form Factory. Cannot map root node: ' + rootNode.n + ', to any entity of schema: form', ittfDocumentUri);
                fail.warn(error.message);
                return callback(error);
            }
        }
        // Load the WizziModel from the root node of the ittfModel
        formmodel = new formmodelType(rootNode.v);
        formmodel.loadContext = ittfModel.loadContext;
        try {
            // this is a sync call
            formmodel.loadFromNode(rootNode);
        } catch (ex) {
            var error = new errors.WizziModelLoadError(ex.message + '\nIn form Factory, calling loadFromNode.', ittfDocumentUri);
            fail.warn(error.message);
            return callback(error);
        }
    }
    // TODO implement a stats object inside the request object
    // _ log.info('Loaded ittfDocument ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
    // TODO Implement an initialize strategy to be declared in the wizzischema
    // Initialize and verify the loaded model
    var ctx = new formschema.formContext();
    formmodel.wzInitialize(ctx);
    formmodel.wzVerify(ctx);
    if (ctx.schemaIsValid() === false) {
        var errorsMessage = ctx.validationErrors.join('\n');
        var error = new errors.WizziModelLoadError('In form Factory.\nWizziModel has validation errors: \n' + errorsMessage, ittfDocumentUri);
        fail.warn(error.message);
        callback(error);
    }
    // TODO implement a stats object inside the request object
    // _ log.info('Initialized wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
    if ((request.dumpAll || request.dumpModel) && formmodel.toJson && file.isFilePath(ittfDocumentUri)) {
        // dump for debug
        var ittfModelDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.json');
        file.write(ittfModelDump, stringify(formmodel.toJson(), null, 2));
    }
    // TODO Generate this wzInitializeAsync call only if requested by the wizzischema
    formmodel.wzInitializeAsync(ctx, function(err,result) {
        if (err) {
            return callback(err, null);
        }
        if ((request.dumpAll || request.dumpModelAfterInitializeAsync) && formmodel.toJson && file.isFilePath(ittfDocumentUri)) {
            // dump for debug
            var ittfModelDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.after.initializeasync.json');
            file.write(ittfModelDump, stringify(formmodel.toJson(), null, 2));
        }
        callback(null, formmodel);
    });
}


/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\ittf.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var errors = require('../errors');
var verify = require('../util/verify');
var fail = require('../util/fail');
var log = require('../util/log')(module)

;
var node = require('../util/node');
var ProductionContext = require("../production/context").ProductionContext
;
var LoadContext = require('./loadContext').loadContext
;
var appender = require('./appender');
var evaluator = require('./evaluator');
var includer = require('./includer');
var mixer = null;
var md = module.exports = {};
/**
     The Big JOB of an IttfLoad
     manages
     normalization of context objects
     instantiation of the ittfLoadState
     instantiation of the modelProvider
     lexer
     parser
     includer
     mixer
     appender
     evaluator
*/
md.load = function(ittfDocumentUri,requestContext,callback) {
    if (typeof(callback) !== 'function') {
        throw new Error("Ittf.load. A callback is required. Uri: " + ittfDocumentUri);
    }
    var originalrequestContext = requestContext;
    requestContext = normalizeRequestContext(requestContext);
    if (requestContext.__is_error) {
        requestContext.ittfDocumentUri = ittfDocumentUri;
        requestContext.instance = originalrequestContext;
        return callback(requestContext);
    }
    LoadContext.getLoadStateAsync(ittfDocumentUri, requestContext, function(err,ittfLoadState) {
        if (err) {
            return callback(err)
            ;
        }
        var parsedIttfModel = ittfLoadState.getPrimaryIttfModel();
        ittfLoadState.callChain.push({
            caller: null, 
            callee: parsedIttfModel.uri
        });
        if (!parsedIttfModel.nodes || parsedIttfModel.nodes.length == 0) {
            return callback(null, parsedIttfModel);
        }
        // resolve $include commands
        includer(parsedIttfModel, ittfLoadState, function(err,includedIttfModel) {
            if (err) {
                return callback(err)
                ;
            }
            if (mixer == null) {
                mixer = require('./mixer');
            }
            // mix primary ittfModel and fragments
            mixer(includedIttfModel, ittfLoadState, function(err,mixedIttfModel) {
                if (err) {
                    return callback(err)
                    ;
                }
                requestContext.productionContext.addMixedIttfModel(ittfDocumentUri, mixedIttfModel);
                // resolve $group, $hook and $append commands
                appender(mixedIttfModel, function(err,appendedIttfModel) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    // evaluate
                    evaluator(appendedIttfModel, requestContext, function(err,evaluatedIttfModel) {
                        if (err) {
                            err.ittfDocumentUri = ittfDocumentUri;
                            return callback(err);
                        }
                        evaluatedIttfModel.loadContext = ittfLoadState.provider.loadContext;
                        requestContext.productionContext.addEvaluatedIttfModel(ittfDocumentUri, evaluatedIttfModel);
                        callback(null, evaluatedIttfModel);
                    });
                });
            });
        });
    });
};
md.loadModel = function(ittfDocumentUri,context,callback) {
    md.load(ittfDocumentUri, context, callback);
};
function normalizeRequestContext(context) {
    // log 'normalizeRequestContext.context', context
    if (verify.isObject(context) == false) {
        return error('A request context object is required')
        ;
    }
    else {
        for (var k in context) {
            // log 'normalizeRequestContext.k', k
        }
    }
    if (verify.isObject(context.__productionManager) == false) {
        return error('A request context must contain a __productionManager object')
        ;
    }
    else {
        context.productionContext = context.__productionManager.productionContext;
    }
    if (verify.isObject(context.productionContext.aclstat) == false) {
        return error('A productionContext must contain an aclstat object')
        ;
    }
    if (verify.isObject(context.modelContext) == false) {
        context.modelContext = {};
    }
    if (verify.isObject(context.artifactContext) == false) {
        context.artifactContext = {};
    }
    return context;
}

function error(message) {
    return {
            __is_error: true, 
            operation: 'IttfLoad', 
            message: message
        };
}


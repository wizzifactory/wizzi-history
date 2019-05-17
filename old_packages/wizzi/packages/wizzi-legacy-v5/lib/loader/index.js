/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\index.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var verify = require('../util/verify');
var util = require('util');
var path = require('path');
var errors = require('../errors');
var node = require('../util/node');
var MTreeBrickProvider = require('./mTreeBrickProvider');
var includer = require('./includer');
var mixer = null;
var appender = require('./appender');
var evaluator = require('./evaluator');
var md = module.exports = {};
/**
     The Big JOB of an mTree loading
     manages
     normalization of context objects
     instantiation of the modelProvider
     liner
     nodifier
     includer
     mixer
     appender
     evaluator
*/
md.loadMTree = function loadMTree(primaryIttfDocumentUri, requestContext, callback) {
    // console.log('wizzi-legacy.loader.requestContext', requestContext)
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'loadMTree', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(primaryIttfDocumentUri) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTree', { parameter: 'primaryIttfDocumentUri', message: 'The primaryIttfDocumentUri parameter must be a string. Received: ' + primaryIttfDocumentUri }
        ));
    }
    if (verify.isObject(requestContext) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTree', { parameter: 'requestContext', message: 'The requestContext parameter must be an object. Received: ' + requestContext }
        ));
    }
    if (verify.isObject(requestContext.__productionManager) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTree', { parameter: 'requestContext.__productionManager', message: 'The requestContext.__productionManager parameter must be an object. Received: ' + requestContext.__productionManager }
        ));
    }
    if (verify.isObject(requestContext.__productionManager.productionContext) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTree', { parameter: 'requestContext.__productionManager.productionContext', message: 'The requestContext.__productionManager.productionContext parameter must be an object. Received: ' + requestContext.__productionManager.productionContext }
        ));
    }
    if (verify.isObject(requestContext.__productionManager.productionContext.aclstat) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTree', { parameter: 'requestContext.__productionManager.productionContext.aclstat', message: 'The requestContext.__productionManager.productionContext.aclstat parameter must be an object. Received: ' + requestContext.__productionManager.productionContext.aclstat }
        ));
    }
    if (verify.isObject(requestContext.__ittfDocumentStore) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTree', { parameter: 'requestContext.__ittfDocumentStore', message: 'The requestContext.__ittfDocumentStore parameter must be an object. Received: ' + requestContext.__ittfDocumentStore }
        ));
    }
    if (verify.isNullOrUndefined(requestContext.mTreeBuildUpContext) === false) {
        if (verify.isObject(requestContext.mTreeBuildUpContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTree', { parameter: 'requestContext.mTreeBuildUpContext', message: 'The requestContext.mTreeBuildUpContext parameter must be an object. Received: ' + requestContext.mTreeBuildUpContext }
            ));
        }
    }
    if (verify.isNullOrUndefined(requestContext.artifactContext) === false) {
        if (verify.isObject(requestContext.artifactContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTree', { parameter: 'requestContext.artifactContext', message: 'The requestContext.artifactContext parameter must be an object. Received: ' + requestContext.artifactContext }
            ));
        }
    }
    var originalrequestContext = requestContext;
    requestContext = normalizeRequestContext(requestContext);
    if (requestContext.__is_error) {
        requestContext.ittfDocumentUri = primaryIttfDocumentUri;
        requestContext.instance = originalrequestContext;
        return callback(requestContext);
    }
    MTreeBrickProvider.createFromUri(primaryIttfDocumentUri, requestContext, function(err, createdProvider) {
        if (err) {
            return callback(err)
            ;
        }
        var primaryMTreeBrick = createdProvider.getPrimaryMTreeBrick();
        if (!primaryMTreeBrick.nodes || primaryMTreeBrick.nodes.length == 0) {
            return callback(null, primaryMTreeBrick);
        }
        // log 'wizzi-mtree.loader.index.primaryMTreeBrick', primaryMTreeBrick.dump()
        // resolve $include commands
        includer(primaryMTreeBrick, createdProvider, function(err, includedMTreePiece) {
            if (err) {
                return callback(err)
                ;
            }
            if (mixer == null) {
                mixer = require('./mixer');
            }
            // mix primary mTreeBrick and mixins
            mixer(includedMTreePiece, createdProvider, function(err, mixedMTreePiece) {
                if (err) {
                    return callback(err)
                    ;
                }
                requestContext.productionContext.addMixedMTree(primaryIttfDocumentUri, mixedMTreePiece);
                // resolve $group, $hook and $append commands
                appender(mixedMTreePiece, function(err, appendedMTreePiece) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    // evaluate
                    // console.log('wizzi-legacy.loader.index', 1);
                    evaluator(appendedMTreePiece, requestContext, function (err, finalMTree) {
                        // console.log('wizzi-legacy.loader.index', 2, err);
                        if (err) {
                            err.ittfDocumentUri = primaryIttfDocumentUri;
                            return callback(err);
                        }
                        finalMTree.loadHistory = createdProvider.loadHistory;
                        requestContext.productionContext.addEvaluatedMTree(primaryIttfDocumentUri, finalMTree);
                        callback(null, finalMTree);
                    });
                });
            });
        });
    });
};
/**
     Load the raw primaryIttfDocumentUri only.
     This is mainly for debug or documentation purposes.
*/
md.loadMTreeRaw = function loadMTreeRaw(primaryIttfDocumentUri, requestContext, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'loadMTreeRaw', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(primaryIttfDocumentUri) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'primaryIttfDocumentUri', message: 'The primaryIttfDocumentUri parameter must be a string. Received: ' + primaryIttfDocumentUri }
        ));
    }
    if (verify.isObject(requestContext) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'requestContext', message: 'The requestContext parameter must be an object. Received: ' + requestContext }
        ));
    }
    if (verify.isObject(requestContext.__productionManager) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'requestContext.__productionManager', message: 'The requestContext.__productionManager parameter must be an object. Received: ' + requestContext.__productionManager }
        ));
    }
    if (verify.isObject(requestContext.__productionManager.productionContext) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'requestContext.__productionManager.productionContext', message: 'The requestContext.__productionManager.productionContext parameter must be an object. Received: ' + requestContext.__productionManager.productionContext }
        ));
    }
    if (verify.isObject(requestContext.__productionManager.productionContext.aclstat) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'requestContext.__productionManager.productionContext.aclstat', message: 'The requestContext.__productionManager.productionContext.aclstat parameter must be an object. Received: ' + requestContext.__productionManager.productionContext.aclstat }
        ));
    }
    if (verify.isObject(requestContext.__ittfDocumentStore) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'requestContext.__ittfDocumentStore', message: 'The requestContext.__ittfDocumentStore parameter must be an object. Received: ' + requestContext.__ittfDocumentStore }
        ));
    }
    var originalrequestContext = requestContext;
    requestContext = normalizeRequestContext(requestContext);
    if (requestContext.__is_error) {
        requestContext.ittfDocumentUri = primaryIttfDocumentUri;
        requestContext.instance = originalrequestContext;
        return callback(requestContext);
    }
    MTreeBrickProvider.createFromUri(primaryIttfDocumentUri, requestContext, function(err, createdProvider) {
        if (err) {
            return callback(err)
            ;
        }
        var primaryMTreeBrick = createdProvider.getPrimaryMTreeBrick();
        return callback(null, primaryMTreeBrick);
    });
};
function normalizeRequestContext(context) {
    // log 'wizzi-mtree.loader.index.normalizeRequestContext.context', context
    for (var k in context) {
        // log 'normalizeRequestContext.k', k
    }
    context.productionContext = context.__productionManager.productionContext;
    if (verify.isObject(context.mTreeBuildUpContext) == false) {
        context.mTreeBuildUpContext = {};
    }
    if (verify.isObject(context.artifactContext) == false) {
        context.artifactContext = {};
    }
    return context;
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-mtree.loader.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}

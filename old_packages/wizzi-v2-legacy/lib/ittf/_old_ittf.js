var util = require('util');
var path = require('path');
var errors = require('../errors');
var verify = require('../util/verify');
var fail = require('../util/fail');
var log = require('../util/log')(module);
var node = require('../util/node');
var ProductionContext = require("../production/context").ProductionContext;
var LoadContext = require('./loadContext').loadContext;
var appender = require('./appender');
var evaluator = require('./evaluator');
var includer = require('./includer');
var mixer = null;
var md = module.exports = {};
/*
    The Big JOB of an IttfLoad
    manages
        lexer
        parser
        includer
        mixer
        appender
        evaluator
        normalize context objects
        instantiate the ittfLoadState
        instantiate the modelProvider
*/
md.load = function (ittfDocumentUri, requestContext, callback) {
    if (typeof callback !== 'function') {
        throw new Error("Ittf.load. A callback is required. Uri: " + ittfDocumentUri);
    }
    requestContext = normalizeRequestContext(requestContext);
    LoadContext.getLoadStateAsync(ittfDocumentUri, requestContext, function (err, ittfLoadState) {
        if (err) { return callback(err); }
        var parsedIttfModel = ittfLoadState.getPrimaryIttfModel();
        ittfLoadState.callChain.push({
            caller: null,
            callee: parsedIttfModel.uri
        });
        if (!parsedIttfModel.nodes || parsedIttfModel.nodes.length == 0)
        {
            return callback(null, parsedIttfModel)
        }
        includer(parsedIttfModel, ittfLoadState, function (err, includedIttfModel) {
            if (err) { return callback(err); }
            
            if (mixer == null) {
                mixer = require('./mixer');
            }
            mixer(includedIttfModel, ittfLoadState, function (err, mixedIttfModel) {
                if (err) { return callback(err); }
                requestContext.productionContext.addMixedIttfModel(
                    ittfDocumentUri,
                    mixedIttfModel
                    );
                appender(mixedIttfModel, function (err, appendedIttfModel) {
                    if (err) { return callback(err); }
                    evaluator(appendedIttfModel, requestContext, function (err, evaluatedIttfModel) {
                        if (err)
                        {
                            err.ittfDocumentUri = ittfDocumentUri;
                            return callback(err);
                        }
                        evaluatedIttfModel.loadContext = ittfLoadState.provider.loadContext;
                        requestContext.productionContext.addEvaluatedIttfModel(
                            ittfDocumentUri,
                            evaluatedIttfModel
                            );
                        // console.log('+++ evaluatedIttfModel', evaluatedIttfModel.nodes)
                        // for (var key in evaluatedIttfModel) console.log('evaluatedIttfModel prop: ' + key);
                        callback(null, evaluatedIttfModel);
                    });
                });
            });
        });
    });
}
md.loadModel = function (uri, context, callback) {
    md.load(uri, context, callback);
}
/*
    An IttfLoad execution contains 3 context object
        modelContext       IttfModel evaluation context (see evaluator.js)
        artifactContext    ArtifactGeneration context 
                           not used during IttfLoad ??? why is it here ???
        productionContext  A production context that may span more then one IttfLoad
*/
function normalizeRequestContext(context) {
    if (verify.isObject(context)) {
        if (verify.isObject(context.productionContext)) {
            if (verify.isObject(context.modelContext)) {
                if (verify.isObject(context.artifactContext)) {
                    return context;
                } else {
                    context.artifactContext = context.modelContext;
                    return context;
                }
            } else {
                context.modelContext = {};
                context.artifactContext = {};
                return context;
            }
        } else {
            // console.log('ProductionContext', ProductionContext)
            return {
                modelContext: context,
                artifactContext: context,
                productionContext: new ProductionContext()
            }
        }
    } else {
        return {
            modelContext: {},
            artifactContext: {},
            productionContext: new ProductionContext()
        }
    }
}

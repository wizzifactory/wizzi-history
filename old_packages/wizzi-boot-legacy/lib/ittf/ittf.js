var util = require('util');
var path = require('path');
var errors = require('../errors');
var verify = require('../util/verify');
var fail = require('../util/fail');
var log = require('../util/log')(module);
var node = require('../util/node');
var ProductionContext = require("../production/context");
var LoadContext = require('./loadContext');
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
        var ittfModel = ittfLoadState.getPrimaryIttfModel();
        ittfLoadState.callChain.push({
            caller: null,
            callee: ittfModel.uri
        });
        includer(ittfModel, ittfLoadState, function (err, includeResult) {
            if (err) { return callback(err); }
            if (mixer == null) {
                mixer = require('./mixer');
            }
            mixer(includeResult, ittfLoadState, function (err, mixResult) {
                if (err) { return callback(err); }
                requestContext.productionContext.addMixedIttfModel(
                    ittfDocumentUri,
                    mixResult
                    );
                try {
                    // sync calls
                    ittfModel = appender(mixResult);
                    ittfModel = evaluator(ittfModel, requestContext);
                    ittfModel.loadContext = ittfLoadState.provider.loadContext;
                    requestContext.productionContext.addEvaluatedIttfModel(
                        ittfDocumentUri,
                        ittfModel
                        );
                } catch (ex) {
                    var error = new errors.IttfLoadError(
                        'Exception: ' + ex.message,
                        ittfModel.uri,
                        ex
                        )
                    error.inner = ex;
                    fail.warn(error.message);
                    return callback(error);
                }
                // console.log('+++ ittfModel', ittfModel.nodes)
                // for (var key in ittfModel) console.log('ittfModel prop: ' + key);
                callback(null, ittfModel);
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

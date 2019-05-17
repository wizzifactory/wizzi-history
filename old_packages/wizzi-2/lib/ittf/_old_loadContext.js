/*
    The ittf model load context
*/
var util = require('util');
var ModelProvider = null; // avoid circula require - see getLoadState
var ModelProvider2 = null; // avoid circula require - see getLoadStateAsync
// TODO
// Describe source keys and model keys
// How to retrieve textContent of IttfDocuments
/*
    loadContext : {
        ittfDocumentDatas: Array,
        ittfModelDatas: Array, // of IttfModel
        sourceCount: Integer, 
        modelCount: Integer,
        nodeCount: Integer,
        addIttfModel:Function,
        addIttfDocument:Function,
        getIttfDocuments:Function,
        getSourceKey(ittfDocumentUri):Function,
        getNewNodeId:Function,
    }
    
    ittfDocumentData : {
        ittfDocumentUri: String, // uri
        sourceKey: Strong,
        content: String // ittf text content
    }
    var ittfModelData = {
        ittfDocumentUri: String, // uri
        schema: String,
        sourceKey: sourceKey,
        modelKey: modelKey,
        ittfModel: ittfModelCloned,
        // - added during evaluation:
        evalContext: Object, //
        byRefParams: Array, // of Strings
    };
 */
function loadContext() {
    this.ittfDocumentDatas = {};
    this.ittfModelDatas = {};
    this.sourceCount = 0;
    this.modelCount = 0;
    this.nodeCount = 0;
}
/*
    Stores uri, textContent and sourceKey of a loaded IttfDocument
    Must be called only when a new IttfDocument is loaded from source
*/
loadContext.prototype.addIttfDocument = function (ittfDocumentUri, textContent) {
    var sourceKey = 'f' + (++this.sourceCount);
    var ittfDocumentData = {
        ittfDocumentUri: ittfDocumentUri,
        sourceKey: sourceKey,
        content: textContent
    };
    this.ittfDocumentDatas[sourceKey] = ittfDocumentData;
    return ittfDocumentData;
}
/*
    The same IttfDocument can be mixed many times inside an IttfModel.
    The ittfModelDatas collection stores a cloned instance of the loaded IttfModel,
    that is specific to a mixed document.
    Parameters passed to a document and variables declared in the document have
    document scope, so each cloned IttfModel has its local value context that will
    be associated to it (through the modelKey).
*/
loadContext.prototype.addIttfModel = function (ittfDocumentUri, schema, ittfModelCloned, options) {
    var sourceKey = this.getSourceKey(ittfDocumentUri);
    if (options.include) {
        return {
            sourceKey: sourceKey,
            modelKey: options.includerModelKey,
        }
    } 
    var modelKey = 'f' + (++this.modelCount);
    var ittfModelData = {
        ittfDocumentUri: ittfDocumentUri,
        schema: schema,
        sourceKey: sourceKey,
        modelKey: modelKey,
        ittfModel: ittfModelCloned
    };
    this.ittfModelDatas[modelKey] = ittfModelData;
    return ittfModelData;
}
loadContext.prototype.getIttfModelData = function (modelKey) {
    return this.ittfModelDatas[modelKey];
}
loadContext.prototype.getIttfDocumentUri = function (sourceKey) {
    var ittfDocumentData = this.ittfDocumentDatas[sourceKey];
    return ittfDocumentData ? ittfDocumentData.ittfDocumentUri : 'Source ittfDocumentUri unknown';
}
loadContext.prototype.getSourceKey = function (ittfDocumentUri) {
    for (var k in this.ittfDocumentDatas) {
        if (this.ittfDocumentDatas[k].ittfDocumentUri === ittfDocumentUri) {
            return k;
        }
    }
    return null;
}
loadContext.prototype.getIttfDocuments = function () {
    var ret = {};
    for (var k in this.ittfDocumentDatas) {
        var ittfDocumentData = this.ittfDocumentDatas[k]
        ret[this.getIttfDocumentUri(ittfDocumentData.sourceKey)] = { sourceKey: ittfDocumentData.sourceKey };
    }
    return ret;
}
loadContext.prototype.getNewNodeId = function () {
    return ++this.nodeCount;
}
loadContext.getLoadState = function (ittfDocumentUri, requestContext) {
    if (!ModelProvider) ModelProvider = require('./provider');
    return {
        requestContext: requestContext,
        provider: ModelProvider.createFromFilepath(ittfDocumentUri, requestContext),
        callChain: [],
        checkForLoops: function () {
            for (var i = 0; i < this.callChain.length; i++) {
                if (this.callChain[i].caller == this.callChain[i].callee) return true;
                for (var j = 0; j < this.callChain.length; j++) {
                    if ((this.callChain[j].caller == this.callChain[i].callee) &&
                        (this.callChain[j].callee == this.callChain[i].caller)) return true;
                }
            }
            return false;
        }
    }
}
loadContext.getLoadStateAsync = function (ittfDocumentUri, requestContext, callback) {
    if (!ModelProvider2) ModelProvider2 = require('./ittfModelProvider');
    ModelProvider2.createFromUri(ittfDocumentUri, requestContext, function (err, createdProvider) {
        if (err) return callback(err);
        callback(null, {
            requestContext: requestContext,
            provider: createdProvider,
            getPrimaryIttfModel: function () {
                return createdProvider.getPrimaryIttfModel();
            },
            callChain: [],
            checkForLoops: function () {
                for (var i = 0; i < this.callChain.length; i++) {
                    if (this.callChain[i].caller == this.callChain[i].callee) return true;
                    for (var j = 0; j < this.callChain.length; j++) {
                        if ((this.callChain[j].caller == this.callChain[i].callee) &&
                            (this.callChain[j].callee == this.callChain[i].caller)) return true;
                    }
                }
                return false;
            }
        });
    });
}
module.exports = loadContext;

/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\evaluator.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var util = require('util');
var jsWizziRunner = require('../jswizzi/jsWizziRunner');
var JsWizziContext = require('../jswizzi/jsWizziContext');
var dateUtil = require('../jswizzi/functions/dateutil');
var JsWizziScriptCoder = require('../jswizzi/JsWizziScriptCoder');
var mTreeBuildUpScripter = require('./mTreeBuildUpScripter');
/**
     The final step of an mTree loading.
     Executes the expressions evaluation and the
     template commands of the composed mTree piece and build the final mTree:
     . creates the mTreeBuildUpScript from the composedMTreePiece,
     . creates the jsWizziContext and loads the requestContext.mTreeBuildUpContext
     in the global context,
     . runs the script with the jsWizziRunner,
     . returns the builded mTree.
    
     params
     { composedMTreePiece
     { requestContext
     { mTreeBuildUpContext
     { productionContext
     { runnerServer
     callback
    
*/
module.exports = function(composedMTreePiece, requestContext, callback) {
    // console.log('wizzi-legacy.loader.evaluator.requestContext.mTreeBuildUpContext', requestContext.mTreeBuildUpContext);
    var productionContext = requestContext.productionContext;
    var ctx = {
        brickKey: null, 
        counter: 0, 
        startTime: dateUtil.now_GMYHMS()
    };
    var scriptCoder = new JsWizziScriptCoder();
    scriptCoder.w('// ' + ctx.startTime + '  by ' + __filename);
    scriptCoder.w('$.n(); // set the context state to NodeContext');
    scriptCoder.w('var $0 = {}; // the root node of the MTree buildup');
    var i, i_len=composedMTreePiece.nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = composedMTreePiece.nodes[i];
        mTreeBuildUpScripter.codify(item, 0, scriptCoder, ctx);
    }
    productionContext.addMTreeBuildUpScript(composedMTreePiece.uri, scriptCoder);
    var jsWizziContext = new JsWizziContext(composedMTreePiece, productionContext);
    jsWizziContext.setGlobalValues(requestContext.mTreeBuildUpContext);
    // console.log('wizzi-legacy.loader.evaluator', 1);
    jsWizziRunner.run(scriptCoder.toCode(), jsWizziContext, {}, function (err, result) {
        // console.log('wizzi-legacy.loader.evaluator', 2, err);
        if (err) {
            return callback(err)
            ;
        }
        jsWizziContext.set_NodeContext();
        var $0 = jsWizziContext.getValue('$0');
        if (typeof($0) === 'undefined' || $0 == null || $0.children === 'undefined') {
            callback({
                message: 'No nodes returned after IttfEvaluation.', 
                document: composedMTreePiece.uri
            });
        }
        composedMTreePiece.nodes = [];
        var i, i_len=$0.children.length, item;
        for (i=0; i<i_len; i++) {
            item = $0.children[i];
            item.parent = null;
            composedMTreePiece.nodes.push(item);
        }
        composedMTreePiece.data = {
            createdAt: ctx.startTime
        };
        callback(null, composedMTreePiece);
    });
};

/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\lib\loader\evaluator.js.ittf
*/
'use strict';
var util = require('util');
var jsWizziRunner = require('../jswizzi/jsWizziRunner');
var JsWizziContext = require('../jswizzi/jsWizziContext');
var dateUtil = require('../jswizzi/functions/dateutil');
var JsWizziScriptCoder = require('../jswizzi/JsWizziScriptCoder');
var mTreeBuildUpScripter = require('./mTreeBuildUpScripter');
var requireFromString = null;
/** -àà
     The final step of an mTree loading.
     Executes the expressions evaluation and the
     template commands of the composed mTree piece and build the final mTree:
     . creates the mTreeBuildUpScript from the composedMTreePiece,
     . creates the jsWizziContext and loads the loadContext.mTreeBuildUpContext
     in the global context,
     . runs the script with the jsWizziRunner,
     . returns the builded mTree.
    
     params
     { composedMTreePiece
     { loadContext
     { mTreeBuildUpContext
     { productionContext
     { runnerServer
     callback
    
*/
module.exports = function(composedMTreePiece, loadContext, callback) {
    var productionContext = loadContext.productionContext;
    loadContext.options = loadContext.options || {};
    var jsWizziContext = new JsWizziContext(composedMTreePiece, productionContext);
    jsWizziContext.setGlobalValues(loadContext.mTreeBuildUpContext);
    var ctx = {
        brickKey: null, 
        counter: 0, 
        startTime: dateUtil.now_GMYHMS(), 
        isCompile: loadContext.options.isCompile
    };
    var isCompile = loadContext.options.isCompile;
    // log 'isCompile', isCompile
    var scriptCoder = new JsWizziScriptCoder();
    scriptCoder.w('// ' + ctx.startTime + '  by ' + __filename);
    if (isCompile) {
        scriptCoder.w('module.exports = function($, $ctx) {');
        scriptCoder.indent();
        var i, i_items=Object.keys(jsWizziContext.getIsCompileGlobals()), i_len=Object.keys(jsWizziContext.getIsCompileGlobals()).length, k;
        for (i=0; i<i_len; i++) {
            k = Object.keys(jsWizziContext.getIsCompileGlobals())[i];
            scriptCoder.w('var ' + k + ' = $ctx.' + k + ';');
        }
    }
    scriptCoder.w('$.n(); // set the context state to NodeContext');
    scriptCoder.w('var $0 = {}; // the root node of the MTree buildup');
    var i, i_items=composedMTreePiece.nodes, i_len=composedMTreePiece.nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = composedMTreePiece.nodes[i];
        mTreeBuildUpScripter.codify(item, 0, scriptCoder, ctx);
    }
    if (isCompile) {
        scriptCoder.w('return $0;');
        scriptCoder.deindent();
        scriptCoder.w('}');
    }
    productionContext.addMTreeBuildUpScript(composedMTreePiece.uri, scriptCoder);
    if (isCompile) {
        // log 'scriptCoder.toCode()', scriptCoder.toCode()
        if (requireFromString === null) {
            requireFromString = require('./requireFromString');
        }
        var md = requireFromString(scriptCoder.toCode());
        var $0 = md(jsWizziContext.getValue('$'), jsWizziContext.getGlobalValues());
        finalize(composedMTreePiece, $0, ctx, callback);
    }
    else {
        jsWizziRunner.run(scriptCoder.toCode(), jsWizziContext, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            jsWizziContext.set_NodeContext();
            var $0 = jsWizziContext.getValue('$0');
            if (typeof($0) === 'undefined' || $0 == null || $0.children === 'undefined') {
                return callback({
                        message: 'No nodes returned after IttfEvaluation.', 
                        document: composedMTreePiece.uri
                    });
            }
            finalize(composedMTreePiece, $0, ctx, callback);
        });
    }
};
function finalize(composedMTreePiece, $0, ctx, callback) {
    composedMTreePiece.nodes = [];
    var i, i_items=$0.children, i_len=$0.children.length, item;
    for (i=0; i<i_len; i++) {
        item = $0.children[i];
        item.parent = null;
        composedMTreePiece.nodes.push(item);
    }
    composedMTreePiece.data = {
        createdAt: ctx.startTime
    };
    callback(null, composedMTreePiece);
}

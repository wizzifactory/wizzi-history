/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\evaluator.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var util = require('util');
var assert = require('assert');
var log = require('../util/log')(module)

;
var verify = require('../util/verify');
var wizziJsRunner = require('../esprima/wizziJsRunner');
var WizziJsContext = require('../esprima/wizziJsContext');
var dateUtil = require('../esprima/functions/dateutil');
var JsScriptCoder = require('../esprima/JsScriptCoder');
var scripter = require('./buildup/scripter');
module.exports = function(composedIttfModel,requestContext,callback) {
    var productionContext = requestContext.productionContext;
    var ctx = {
        modelKey: null, 
        counter: 0, 
        startTime: dateUtil.now_GMYHMS()
    };
    var jsScriptCoder = new JsScriptCoder();
    jsScriptCoder.w('// ' + ctx.startTime + '  by ' + __filename);
    jsScriptCoder.w('$.n(); // set the context state to NodeContext');
    jsScriptCoder.w('var $0 = {}; // the root node of the IttfModel buildup');
    var i, i_len=composedIttfModel.nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = composedIttfModel.nodes[i];
        scripter.codify(item, 0, jsScriptCoder, ctx);
    }
    productionContext.addIttfModelBuildUpScript(composedIttfModel.uri, jsScriptCoder);
    var wizziJsContext = new WizziJsContext(composedIttfModel);
    wizziJsContext.setGlobalValues(requestContext.modelContext);
    wizziJsRunner.run(jsScriptCoder.toCode(), wizziJsContext, {}, function(err,result) {
        if (err) {
            return callback(err);
        }
        wizziJsContext.set_NodeContext();
        var $0 = wizziJsContext.getValue('$0');
        assert($0, "wizzi/evaluator. The wizziJsRunner did not return the $0 root object. Something went wery bad.");
        if (typeof($0) === 'undefined' || $0 == null || $0.childs === 'undefined') {
            callback({
                message: 'No nodes returned after IttfEvaluation.', 
                document: composedIttfModel.uri
            });
        }
        composedIttfModel.nodes = [];
        var i, i_len=$0.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = $0.childs[i];
            item.parent = null;
            composedIttfModel.nodes.push(item);
        }
        composedIttfModel.data = {
            createdAt: ctx.startTime
        };
        callback(null, composedIttfModel);
    });
};

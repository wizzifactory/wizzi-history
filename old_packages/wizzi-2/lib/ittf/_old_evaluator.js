var util = require('util');
var path = require('path');
var assert = require('assert');
var log = require('../util/log')(module);
var verify = require('../util/verify');
var wizziJsRunner = require('../esprima/wizziJsRunner');
var WizziJsEvalHelper = require('../esprima/wizziJsEvalHelper');
var WizziJsContext = require('../esprima/wizziJsContext');
var dateUtil = require('../esprima/functions/dateutil');
var JsScriptCoder = require('../esprima/JsScriptCoder');
/**
     summary of IttfCommands executed in this step
     $ alias $+      statements block to be executed in the ModelEvalContext of a single IttfModel
     $global         statements block to be executed in the GlobalContext
     $.              literal block to be appended to the value of the parent node
     $if             'if (condition) then' node selection statemnt
     $elif           'else if (condition) then' node selection statemnt
     $else           'else' node selection statemnt
     $while          'while (condition)' node replication statemnt
     $for            'for (condition)' node replication statemnt
     $foreach        'foreach (condition)' node replication statemnt
     $backeach       'backeach (condition)' node replication statemnt
*/
module.exports = function (primaryIttfModel, requestContext) {
    this.productionContext = requestContext.productionContext;
    // console.log('IttfEvaluator.ctor.modelContext', util.inspect(requestContext.modelContext, { depth: 1 }));
    // dataInfo object
    var ctx = { modelKey: null, counter: 0, startTime: dateUtil.now_GMYHMS() };
    // Create the IttfLoading evaluation script
    var jsScriptCoder = new JsScriptCoder();
    jsScriptCoder.w('// ' + ctx.startTime + '  by ' + __filename);
    // first write a call to set the WizziJsContext state to NodeContext
    jsScriptCoder.w('$.n(); // set the context state to NodeContext first');
    // write the root node of the IttfModel buildup
    jsScriptCoder.w('var $0 = {}; // the root node of the IttfModel buildup');
    var i, i_len = primaryIttfModel.nodes.length, item;
    for (i = 0; i < i_len; i++) {
        item = primaryIttfModel.nodes[i];
        codify(item, 0, jsScriptCoder, ctx);
    }
    // notify the productionContext of the new evaluation
    this.productionContext.addIttfModelBuildUpScript(
        primaryIttfModel.uri, jsScriptCoder
        );
    // Create the WizziJsEvalHelper
    var wizziJsEvalHelper = new WizziJsEvalHelper(primaryIttfModel);
    // Create the jsWizziContext
    var jsWizziContext = new WizziJsContext(wizziJsEvalHelper);
    // Initialize the global values with the
    // modelContext object passed to this evaluator.
    jsWizziContext.setGlobalValues(requestContext.modelContext);
    // Set the $ function on the jsWizziContext.
    // VIA jsWizziContext.setValue('$', new helper.evalHelper(jsWizziContext, primaryIttfModel));
    // Execute the build-up and evaluation of the Ittf model.
    try {
        // the BIG JOB
        wizziJsRunner.run(jsScriptCoder.toCode(), jsWizziContext);
    } catch (ex) {
        // console.log('wizzi-core/ittf/lib/ittf/evaluator', ex);
        if (!ex) { ex = new Error(); } // TODO ??? why ex can be undefined
        this.productionContext.raiseIttfEvaluationScriptError(primaryIttfModel.uri, ex);
    }
    // retrieve result ( the final, re-built and evaluated Ittf model ) from jsWizzi jscontext values
    jsWizziContext.set_NodeContext();
    var $0 = jsWizziContext.getValue('$0');
    assert($0, "wizzi-core/evaluator the wizziJsRunner did not return the $0 root object. Something went wery badly.");
    if (typeof $0 === 'undefined' || $0 == null || $0.childs === 'undefined' || $0 == null) {
        throw new Error('No nodes returned after IttfEvaluation. Uri: ' + primaryIttfModel.uri);
    }
    // on the primary ittfModel replace old nodes with evaluated nodes
    primaryIttfModel.nodes = [];
    $0.childs.forEach(function (item) {
        item.parent = null;
        primaryIttfModel.nodes.push(item);
    });
    // set statistic data
    primaryIttfModel.data = {};
    primaryIttfModel.data.createdAt = ctx.startTime;
    return primaryIttfModel;
};
function codify(node, nparent, jsScriptCoder, ctx) {
    var nnode = ++ctx.counter, closeBlock = null;
    if (node.name == '$' || node.name == '$+') { // Template statement line
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        codeBlock(node, jsScriptCoder);
    } else if (node.name == '$global') { // 
        setWizziJsContext(ctx, 'global', jsScriptCoder);
        codeBlock(node, jsScriptCoder);
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
    } else if (node.name == '$.') { // 
        // console.log("IttfEvaluator.node.value", node.value);
        setWizziJsContext(ctx, null, jsScriptCoder); // Is a node only operation, uses baseContext
        // TODO interpolate?
        var vparent = '$' + nparent;
        var value = codifyValue(node.model.modelKey, node.value, 'string', jsScriptCoder.length + 1);
        jsScriptCoder.w(vparent + ".v = " + vparent + ".v ? " + vparent + ".v : ''" + ' //' + node.id);
        jsScriptCoder.w(vparent + '.v += ($.textSep + ' + value + ');' + ' //' + node.id);
    } else if (node.name == '$if') {
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        jsScriptCoder.if(node.value, node);
        closeBlock = '}';
    } else if (node.name == '$else') {
        jsScriptCoder.else(node);
        ctx.modelKey = -1; // force set context on next statement
        closeBlock = '}';
    } else if (node.name == '$elif') {
        // No this raises an error. TODO (many tests here). setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        jsScriptCoder.elif(node.value, node);
        ctx.modelKey = -1; // force set context on next statement
        closeBlock = '}';
    } else if (node.name == '$while') {
        jsScriptCoder.while(node.value, node);
        ctx.modelKey = -1; // force set context on next statement
        closeBlock = '}';
    } else if (node.name == '$for') {
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        var items = node.value.split(' ');
        // TODO Verify format
        var namevalue = items[0].split(',');
        var name = namevalue[0];
        var value = namevalue[1];
        jsScriptCoder.w('var ' + name + ', ' + value + ';' + ' //' + node.id);
        jsScriptCoder.for(name + ' in ' + items[2] + ' //' + node.id);
        jsScriptCoder.w(value + ' = ' + items[2] + '[' + name + '];' + ' //' + node.id);
        closeBlock = '}';
    } else if (node.name == '$foreach') {
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        var items = node.value.split(' ');
        // TODO Verify format
        jsScriptCoder.for('var i' + nnode + '=0, l' + nnode + ' = ' + items[2] + '.length; i' + nnode + '<l' + nnode + '; i' + nnode + '++', node);
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + ' //' + node.id);
        jsScriptCoder.w('var _index = i' + nnode + ';' + ' //' + node.id);
        jsScriptCoder.w('var _count = ' + items[2] + '.length;' + ' //' + node.id);
        closeBlock = '}';
    } else if (node.name == '$backeach') {
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        var items = node.value.split(' ');
        // TODO Verify format
        jsScriptCoder.for('var i' + nnode + '=' + items[2] + '.length-1; i' + nnode + '>-1; i' + nnode + '--', node);
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + ' //' + node.id);
        jsScriptCoder.w('var _index = i' + nnode + ';' + ' //' + node.id);
        jsScriptCoder.w('var _count = ' + items[2] + '.length;' + ' //' + node.id);
        closeBlock = '}';
    } else if (node.name == '$virtual') {
            ; // Do nothing, evaluate childs only
    } else {
        setWizziJsContext(ctx, null, jsScriptCoder);
        jsScriptCoder.w('var $' + nnode + ' = { ' +
            'n: "' + verify.escapename(node.name) + '", ' +
            (node.source ? 'source: ' + verify.escape(node.source) + ', ' : '') +
            'v: ' + codifyValue(node.model.modelKey, node.value, 'string', jsScriptCoder.length + 1) + ', ' +
            'r: ' + node.row + ', ' +
            'c: ' + node.col + ', ' +
            's: "' + node.model.modelKey + '", ' +
            'u: "' + node.sourceKey + '", ' +
            ' };' + ' //' + node.id);
        var vparent = '$' + nparent;
        jsScriptCoder.w('$.a(' + vparent + ', $' + nnode + ', ' + (jsScriptCoder.length + 1) + ');');
        nparent = nnode;
    }
    if (node.name !== '$' && node.name !== '$+') { // Template statement line
        node.childs.forEach(function (item) {
            codify(item, nparent, jsScriptCoder, ctx);
        });
        if (closeBlock) {
            jsScriptCoder.end();
            ctx.modelKey = -1; // force set context on next statement
        }
    }
}
function setWizziJsContext(ctx, modelKey, jsScriptCoder) {
    if (ctx.modelKey === modelKey) return;
    if (modelKey === null) {
        jsScriptCoder.w('$.n();');
    } else if (modelKey === 'global') {
        jsScriptCoder.w('$.g();');
    } else {
        jsScriptCoder.w('$.s("' + modelKey + '");');
    }
    ctx.modelKey = modelKey;
}
function codifyValue(modelKey, value, type, line) {
    if (typeof value === 'undefined' || value == null) return '""';
    if (type === 'string') {
        if (value.indexOf('${') > -1) return '$.ip("' + modelKey + '", ' + verify.escape(value) + ', "' + type + '", ' + line + ')';
        return verify.escape(value);
    }
    return value;
}
function codeBlock(node, jsScriptCoder) {
    if (node.name == '$' || node.name == '$+') { // Template statement line
        if (node.value && node.value.trim().length > 0) {
            jsScriptCoder.w(node.value);
        }
    } else {
        if (node.name && node.name.trim().length > 0) {
            jsScriptCoder.w(node.name + ' ' + (node.value || '') + ' //' + node.id);
        }
    }
    node.childs.forEach(function (item) {
        codeBlock(item, jsScriptCoder);
    });
}

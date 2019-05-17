/*
    artifact generator: C:\My\wizzi\v4\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\main.js.ittf
    utc time: Wed, 11 Oct 2017 11:27:49 GMT
*/
'use strict';
var util = require('util');
var verify = require('../../../util/verify');
var codegen = require('wizzi-legacy-codegen');
var module_es6 = codegen.js_v4_Module_es6;
var statement = codegen.js_v4_Statement;
var wzIife = codegen.js_v4_WzIife;
var preprocess = require('./preprocess');

var md = module.exports = {};
var myname = 'v4-wizzi-js.artifacts.js.module.main';

md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback)
            );
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model)
            )
        ;
    }
    if (model.wzElement !== 'module') {
        console.log('v4-wizzi-js', 'artifact', 'model', model);
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "module". Received: ' + model.wzElement)
        );
    }
    try {
        preprocess.exec(model, ctx);
        ctx.__jskind = model.kind;
        ctx.__ecma = model.ecma;
        if (model.kind === 'nodejs.bin') {
            ctx.w('#!/usr/bin/env node');
        }
        ctx.w('/*');
        ctx.w('    artifact generator: ' + __filename);
        ctx.w('    primary source IttfDocument: ' + model.wzSourceFilepath('f1'));
        ctx.w('    utc time: ' + new Date().toUTCString());
        ctx.w('*/');
        emitResources(model.resources, ctx);
        if (!model.no_strict) {
            ctx.w("'use strict';");
        }
        module_es6.gen(model, ctx);
        if (model.hasFeature('argument-check')) {
            ctx.w("var verify = require('wizzi-utils').verify;");
        }
        if (ctx.__wzItems && ctx.__wzItems.length > 0) {
            emit_Iife_WzModule(model, ctx);
        }
        var i, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            if (item.wzElement === 'wzIife') {
                wzIife.gen(item, ctx);
                ctx.w("");
            }
            else {
                statement.gen(item, ctx);
            }
        }
        if (ctx.__wzModule && ctx.__wzModule.seen) {
            emit_top_WzModule(model, ctx);
        }
        if (model.hasFeature('argument-check')) {
            ctx.w('/**');
            ctx.w('  params');
            ctx.w('    string code');
            ctx.w('      # the error name or number');
            ctx.w('    string method');
            ctx.w('    string message');
            ctx.w('      # optional');
            ctx.w('    { innerError');
            ctx.w('      # optional');
            ctx.w('*/');
            ctx.w('function error(code, method, message, innerError) {');
            ctx.w('    var parameter = null;');
            ctx.w('    if (verify.isObject(message)) {');
            ctx.w('        parameter = message.parameter;');
            ctx.w('        message = message.message;');
            ctx.w('    }');
            ctx.w("    return verify.error(innerError, {");
            ctx.w("        name: ( verify.isNumber(code) ? 'Err-' + code : code ),");
            ctx.w("        method: '" + model.wzName + ".' + method,");
            ctx.w("        parameter: parameter,");
            ctx.w("        sourcePath: __filename");
            ctx.w("    }, message || 'Error message unavailable');");
            ctx.w('}');
        }
    } catch (ex) {
        return callback(ex);
    }
    if (ctx.artifactGenerationErrors.length > 0) {
        return callback(ctx.artifactGenerationErrors);
    }
    else {
        return callback(null, ctx);
    }
};
function emitResources(requestedResources, ctx) {
    if (requestedResources && requestedResources.length > 0 && ctx.values.jsResources) {
        var resourceRepo = ctx.values.jsResources;
        resourceRepo.clearJsDependencies();
        var i, i_len=requestedResources.length, item;
        for (i=0; i<i_len; i++) {
            item = requestedResources[i];
            resourceRepo.addJsDependency(item.wzName);
        }
        resourceRepo.emitJsDependencies(ctx);
    }
}
function emit_top_WzModule(model, ctx) {
    ctx.w('');
    ctx.w('module.exports = {');
    ctx.indent();
    var seen = false;
    var i, i_len=ctx.__wzModule.vars.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzModule.vars[i];
        if (seen) {
            ctx.w(',');
        }
        var ss = item.wzName.split(' ');
        ctx.write(ss[0] + ': ' + ss[0]);
        seen = true;
    }
    var i, i_len=ctx.__wzModule.consts.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzModule.consts[i];
        if (seen) {
            ctx.w(',');
        }
        var ss = item.wzName.split(' ');
        ctx.write(ss[0] + ': ' + ss[0]);
        seen = true;
    }
    var i, i_len=ctx.__wzModule.functions.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzModule.functions[i];
        if (seen) {
            ctx.w(',');
        }
        ctx.write(item.wzName + ': ' + item.wzName);
        seen = true;
    }
    var i, i_len=ctx.__wzModule.classes.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzModule.classes[i];
        if (seen) {
            ctx.w(',');
        }
        ctx.write(item.wzName + ': ' + item.wzName);
        seen = true;
    }
    if (seen) {
        ctx.w('');
    }
    ctx.deindent();
    ctx.w('};');
}
function emit_Iife_WzModule(model, ctx) {
    ctx.w('var __wz = (function() {');
    ctx.indent();
    ctx.w('var res = {};');
    var i, i_len=ctx.__wzItems.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzItems[i];
        var j, j_len=item.requires.length, require;
        for (j=0; j<j_len; j++) {
            require = item.requires[j];
            var from = require.from ? require.from : require.wzName;
            ctx.w('res["' + require.wzName + '"] = require("' + from + '");');
        }
    }
    ctx.w('return {');
    ctx.w('    require: function(name) {');
    ctx.w('        return res[name];');
    ctx.w('    }');
    ctx.w('}');
    ctx.deindent();
    ctx.w('})();');
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
    return verify.error(innerError, {
            name: ( verify.isNumber(code) ? 'Err-' + code : code ), 
            method: 'v4-wizzi-js/lib/artifacts/js/module/main.' + method, 
            sourcePath: __filename
        }, message || 'Error message unavailable')
    ;
}

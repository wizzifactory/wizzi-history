/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var util = require('util');
var _ = require('lodash');
var errors = require('../../../../errors');
var preprocess = require('./preprocess');
var statement = require('./statement');
var xfunction = require('./function');
var xclass = require('./class');
var wzIife = require('./wzIife');
var module_es6 = require('./kinds/es6/module');
var xclass_es6 = require('./kinds/es6/class');
var xclass_react = require('./kinds/react/class');
var md = module.exports = {};
var myname = 'js.module.main';
md.gen = function(model,ctx,callback) {
    try {
        if (model.wzElement != 'module') {
            errors.NodeError(myname + '.gen. Model wzElement must be "module". Found: ' + model.wzElement, model);
        }
        preprocess.exec(model, ctx);
        // log 'model.kind, ecma', model.kind, model.ecma
        ctx.__jskind = model.kind;
        ctx.__ecma = model.ecma;
        // log 'model', util.inspect(model, { depth: 1 })
        // log 'model.wzModelState', util.inspect(model.wzModelState)
        if (model.kind === 'nodejs.bin') {
            ctx.w('#!/usr/bin/env node');
        }
        ctx.w('/*');
        ctx.w('    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js');
        ctx.w('    primary source IttfDocument: ' + model.wzSourceFilepath('f1'));
        ctx.w('    utc time: ' + new Date().toUTCString());
        ctx.w('*/');
        emitResources(model.resources, ctx);
        if (!model.no_strict) {
            ctx.w("'use strict';");
        }
        if (ctx.__wzItems && ctx.__wzItems.length > 0) {
            emit_Iife_WzModule(model, ctx);
        }
        module_es6.gen(model, ctx);
        var i, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            if (item.wzElement === 'xclass') {
                // log 'ctx.__jskind', ctx.__jskind
                if (ctx.__jskind === 'react') {
                    // log 'model.kind', model.kind
                    xclass_react.gen(item, ctx);
                }
                else if (ctx.__ecma === 'es6') {
                    xclass_es6.gen(item, ctx);
                }
                else {
                    xclass.gen(item, ctx);
                }
                ctx.w("");
            }
            else if (item.wzElement === 'xfunction') {
                new xfunction.gen(item, ctx);
                ctx.w("");
            }
            else if (item.wzElement === 'wzIife') {
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
    } catch (ex) {
        return callback(ex);
    }
    callback(null, ctx);
};
function emitResources(requestedResources,ctx) {
    if (requestedResources.length > 0 && ctx.values.jsResources) {
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

function emit_top_WzModule(model,ctx) {
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

function emit_Iife_WzModule(model,ctx) {
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


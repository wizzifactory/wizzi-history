/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\wziife.js.ittf
*/
'use strict';
var _ = require('lodash');
var codegen = require('wizzi-codegen');
var statement = codegen.jsStatement;
var md = module.exports = {};
var myname = 'js.wziife.function';
md.gen = function(model, ctx) {
    var parameters = _.concat([
        '__'
    ], model.paramNames);
    ctx.w('var ' + model.wzName + ' = (function(' + parameters.join(',') + ') {');
    // constraints
    ctx.indent();
    generateParamConstraints(iife ? 'iife' : aster + name, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx);
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        statement.gen(item, ctx);
    }
    var seen = false;
    ctx.w('return {');
    var i, i_items=model.__wzItems.vars, i_len=model.__wzItems.vars.length, item;
    for (i=0; i<i_len; i++) {
        item = model.__wzItems.vars[i];
        if (seen) {
            ctx.w(',');
        }
        var ss = item.wzName.split(' ');
        ctx.write('    ' + ss[0] + ': ' + ss[0]);
        seen = true;
    }
    var i, i_items=model.__wzItems.consts, i_len=model.__wzItems.consts.length, item;
    for (i=0; i<i_len; i++) {
        item = model.__wzItems.consts[i];
        if (seen) {
            ctx.w(',');
        }
        var ss = item.wzName.split(' ');
        ctx.write('    ' + ss[0] + ': ' + ss[0]);
        seen = true;
    }
    var i, i_items=model.__wzItems.functions, i_len=model.__wzItems.functions.length, item;
    for (i=0; i<i_len; i++) {
        item = model.__wzItems.functions[i];
        if (seen) {
            ctx.w(',');
        }
        ctx.write('    ' + item.wzName + ': ' + item.wzName);
        seen = true;
    }
    var i, i_items=model.__wzItems.classes, i_len=model.__wzItems.classes.length, item;
    for (i=0; i<i_len; i++) {
        item = model.__wzItems.classes[i];
        if (seen) {
            ctx.w(',');
        }
        ctx.write('    ' + item.wzName + ': ' + item.wzName);
        seen = true;
    }
    if (seen) {
        ctx.w('');
    }
    ctx.w('};');
    ctx.deindent();
    var args = _.concat([
        '__wz'
    ], model.getArgs());
    ctx.w('})(' + args.join(',') + ');');
};

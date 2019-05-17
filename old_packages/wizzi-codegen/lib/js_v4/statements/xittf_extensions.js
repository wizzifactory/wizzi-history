/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\xittf_extensions.js.ittf
*/
'use strict';
var util = require('util');
var u = require('../util/stm');

var myname = 'wizzi-codegen.js.statements.xittf_extensions';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.expr = function(model, ctx) {
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
    };
    cnt.stm.number = function(model, ctx) {
        ctx.write(model.wzName);
    };
    cnt.stm.percent = function(model, ctx) {
        ctx.write(model.wzName + '%');
    };
    cnt.stm.singleQuoteLiteral = function(model, ctx) {
        ctx.write("'" + model.wzName + "'");
    };
    cnt.stm.doubleQuoteLiteral = function(model, ctx) {
        ctx.write('"' + model.wzName + '"');
    };
    cnt.stm.color = function(model, ctx) {
        ctx.write('#' + model.wzName);
    };
    cnt.stm.cssLength = function(model, ctx) {
        var f = ctx.__functionProvider ? ctx.__functionProvider + '.' : '';
        ctx.write(f + 'dim("' + model.wzName + '")');
    };
    cnt.stm.xnull = function(model, ctx) {
        ctx.write('null');
    };
    cnt.stm.false = function(model, ctx) {
        ctx.write('false');
    };
    cnt.stm.true = function(model, ctx) {
        ctx.write('true');
    };
};

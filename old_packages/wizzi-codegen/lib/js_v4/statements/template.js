/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\template.js.ittf
*/
'use strict';
var util = require('util');
var u = require('../util/stm');

var myname = 'wizzi-codegen.js.statements.template';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.template = function(model, ctx) {
        ctx.write('`');
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.w('`');
    };
    cnt.stm.macro = function(model, ctx) {
        ctx.write('${');
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.write('}');
    };
};

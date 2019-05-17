/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js\statements\template.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var util = require('util');
var u = require('../util/stm');

var myname = 'wizzi.codegen.js.statements.template';
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

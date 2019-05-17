/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js\statements\exceptions.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var util = require('util');
var u = require('../util/stm');

var myname = 'wizzi.codegen.js.statements.exceptions';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.xtry = function(model, ctx) {
        ctx.w('try {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.write('} ');
    };
    cnt.stm.xcatch = function(model, ctx) {
        ctx.w('catch (' + model.wzName + ') {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('}');
    };
    cnt.stm.xfinally = function(model, ctx) {
        ctx.w('finally {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('}');
    };
    cnt.stm.xthrow = function(model, ctx) {
        if (model.statements && (model.statements.length > 0)) {
            ctx.write('throw ' + (model.wzName || ''));
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            ctx.w(';');
        }
        else {
            ctx.w('throw ' + model.wzName + u.semicolon(model.wzName));
        }
    };
};

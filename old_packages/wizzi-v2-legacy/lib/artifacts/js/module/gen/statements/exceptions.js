/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\exceptions.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var u = require('./util');

var myname = 'js.module.statements.exceptions';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.xtry = function(model,ctx) {
        ctx.w('try {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.write('} ');
    };
    cnt.stm.xcatch = function(model,ctx) {
        ctx.w('catch (' + model.wzName + ') {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('}');
    };
    cnt.stm.xfinally = function(model,ctx) {
        ctx.w('finally {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('}');
    };
    cnt.stm.xthrow = function(model,ctx) {
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

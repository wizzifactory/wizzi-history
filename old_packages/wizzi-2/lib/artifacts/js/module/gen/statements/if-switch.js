/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\if-switch.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var u = require('./util');

var myname = 'js.module.statements.if-switch';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.xif = function(model,ctx) {
        u.emitBlock(cnt, 'if', model, model.statements, model.statements.length, ctx);
    };
    cnt.stm.elif = function(model,ctx) {
        u.emitBlock(cnt, 'else if', model, model.statements, model.statements.length, ctx);
    };
    cnt.stm.xelse = function(model,ctx) {
        if (model.wzParent.wzElement === 'iif') {
            if (model.statements.length > 0) {
                cnt.genItems(model.statements, ctx, {
                    indent: true
                });
            }
            else {
                ctx.write(model.wzName);
            }
        }
        else {
            u.emitBlock(cnt, 'else', model, model.statements, model.statements.length, ctx);
        }
    };
    cnt.stm.xswitch = function(model,ctx) {
        ctx.w('switch (' + u.unparen(model.wzName) + ') {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('}');
    };
    cnt.stm.xcase = function(model,ctx) {
        var items = model.statements,
            count = model.statements.length,
            tag = 'case';
        if (count === 0) {
            ctx.w(tag + ' ' + model.wzName + ':');
            return ;
        }
        if (ctx.values.__preserveBlock) {
            if (count > 0 && items[0].wzElement === 'block') {
                ctx.w(tag + ' ' + model.wzName + ': {');
            }
            else {
                ctx.w(tag + ' ' + model.wzName + ':');
            }
        }
        else {
            ctx.w(tag + ' ' + model.wzName + ': {');
        }
        cnt.genItems(items, ctx, {
            indent: true
        });
        if (ctx.values.__preserveBlock) {
            if (count > 0 && items[0].wzElement === 'block') {
                ctx.w('}');
            }
            else {
                ;
            }
        }
        else {
            ctx.w('}');
        }
    };
    cnt.stm.xdefault = function(model,ctx) {
        var items = model.statements,
            count = model.statements.length,
            tag = 'default';
        if (ctx.values.__preserveBlock) {
            if (count > 0 && items[0].wzElement === 'block') {
                ctx.w(tag + ': {');
            }
            else {
                ctx.w(tag + ':');
            }
        }
        else {
            ctx.w(tag + ': {');
        }
        cnt.genItems(items, ctx, {
            indent: true
        });
        if (ctx.values.__preserveBlock) {
            if (count > 0 && items[0].wzElement === 'block') {
                ctx.w('}');
            }
            else {
                ;
            }
        }
        else {
            ctx.w('}');
        }
    };
};

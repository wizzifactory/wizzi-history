/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\loops.js.ittf
*/
'use strict';
var util = require('util');
var u = require('../util/stm');

var myname = 'wizzi-codegen.js.statements.loops';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.xfor = function(model, ctx) {
        u.emitBlock(cnt, 'for', model, model.statements, model.statements.length, ctx);
    };
    cnt.stm.foreach = function(model, ctx) {
        var ss = model.wzName.trim().split(' ')
        ;
        if (ss.length != 3 || ss[1] !== 'in') {
            throw ctx.error("Malformed foreach. Should be: foreach <item> in <coll>. Is " + model.wzName, model);
        }
        var item = ss[0],
            coll = ss[2];
        var nidif = (ctx.__for_nidif || 0);
        if (nidif >= max_for_nidif) {
            throw ctx.error(myname + '. Maximum number of nested foreach loop is ' + max_for_nidif, model);
        }
        var letter = forloopLetters[nidif];
        var items = (letter + '_items');
        var len = (letter + '_len');
        ctx.__for_nidif = (nidif + 1);
        ctx.w('var ' + letter + ', ' + items + '=' + coll + ', ' + len + '=' + coll + '.length, ' + item + ';');
        ctx.w('for (' + letter + '=0; ' + letter + '<' + len + '; ' + letter + '++) {');
        ctx.w('    ' + item + ' = ' + coll + '[' + letter + '];');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('}');
        ctx.__for_nidif = (ctx.__for_nidif - 1);
    };
    cnt.stm.backeach = function(model, ctx) {
        var ss = model.wzName.trim().split(' ')
        ;
        if (ss.length != 3 || ss[1] !== 'in') {
            throw ctx.error("Malformed backeach. Should be: backeach <item> in <coll>. Is " + model.wzName, model);
        }
        var item = ss[0],
            coll = ss[2];
        var nidif = (ctx.__for_nidif || 0);
        if (nidif >= max_for_nidif) {
            throw ctx.error(myname + '. Maximum number of nested backeach loop is ' + max_for_nidif, model);
        }
        var letter = forloopLetters[nidif];
        var len = (letter + '_len');
        ctx.__for_nidif = (nidif + 1);
        ctx.w('var ' + letter + ', ' + len + '=' + coll + '.length, ' + item + ';');
        ctx.w('for (' + letter + '= (' + len + '-1); ' + letter + '>-1; ' + letter + '--) {');
        ctx.w('    ' + item + ' = ' + coll + '[' + letter + '];');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('}');
        ctx.__for_nidif = ctx.__for_nidif - 1;
    };
    cnt.stm.xbreak = function(model, ctx) {
        ctx.write('break');
        ctx.write((model.wzName || '').trim().length > 0 ? (' ' + model.wzName) : '');
        ctx.w(';');
    };
    cnt.stm.xcontinue = function(model, ctx) {
        ctx.write('continue');
        ctx.write((model.wzName || '').trim().length > 0 ? (' ' + model.wzName) : '');
        ctx.w(';');
    };
    cnt.stm.xwhile = function(model, ctx) {
        u.emitBlock(cnt, 'while', model, model.statements, model.statements.length, ctx);
    };
    cnt.stm.xdo = function(model, ctx) {
        var items = model.statements;
        var count = model.statements.length;
        ctx.write('do');
        if (ctx.values.__preserveBlock) {
            if ((count > 1) || (count == 1 && items[0].wzElement === 'block')) {
                ctx.w(' {');
            }
            else {
                ctx.w('');
            }
        }
        else {
            ctx.w(' {');
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        if (ctx.values.__preserveBlock) {
            if ((count > 1) || (count == 1 && items[0].wzElement === 'block')) {
                ctx.write('}');
            }
        }
        else {
            ctx.write('}');
        }
        ctx.w(' while (' + u.unparen(model.wzName) + ')');
    };
    cnt.stm.xlabel = function(model, ctx) {
        ctx.w(model.wzName + ':');
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
    };
    var forloopLetters = "ijklmn";
    var max_for_nidif = forloopLetters.length;
};

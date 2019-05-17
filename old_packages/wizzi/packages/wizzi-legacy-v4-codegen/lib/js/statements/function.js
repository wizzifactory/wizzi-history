/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js\statements\function.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var util = require('util');
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi.codegen.js.statements.function';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.exportfunction = function(model, ctx) {
        var xdefault = model.__default ? 'default ' : '';
        var name = (model.__name || '');
        var prms = checkedGenParams(model);
        ctx.w('export ' + xdefault + 'function ' + name + '(' + prms.join(', ') + ') {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.write('}');
    };
    cnt.stm.xfunction = function(model, ctx) {
        var prms = checkedGenParams(model),
            name = '',
            aster = ctx.__aster || '';
        if (prms.length > 0) {
            name = model.wzName.trim();
        }
        else {
            var p = lineParser.parse(model.wzName, model)
            ;
            if (p.tokens.length > 0) {
                var state = 0;
                for (var i = 0; i < p.tokens.length; i++) {
                    var text = p.tokens[i].text;
                    if (text === '(') {
                        state = 1;
                    }
                    else if (text === ')') {
                        ;
                    }
                    else if (i == 0 && state == 0) {
                        name = text;
                        state = 1;
                    }
                    else {
                        prms = prms.push(text);
                    }
                }
            }
        }
        var f,
            iifeInvoke,
            iife = model.statements.length > 0 && model.statements[(model.statements.length - 1)].wzElement === 'memberCall';
        if (iife) {
            f = '(' + (name.length > 0 ? ('function' + aster + ' ' + name) : 'function');
            iifeInvoke = model.statements[(model.statements.length - 1)];
            iifeInvoke.wzParent = {
                wzElement: 'call'
            };
            model.statements.splice((model.statements.length - 1), 1);
        }
        else {
            f = name.length > 0 ? ('function' + aster + ' ' + name) : 'function' + aster;
        }
        ctx.w(f + '(' + prms.join(', ') + ') {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.write('}');
        if (iife) {
            cnt.genItems([
                iifeInvoke
            ], ctx, {
                indent: false
            });
            ctx.write(')');
        }
        if (u.isTopStatement(model)) {
            ctx.w('');
        }
    };
    cnt.stm.iife = function(model, ctx) {
        var item;
        if (model.unary_prefix) {
            ctx.write(model.unary_prefix);
        }
        ctx.write('(');
        if (model.statements.length != 1 && model.statements[0].wzElement !== 'function') {
            var i = 0,
                test = model.statements[0].wzElement;
            while (test === 'comment') {
                i++;
                test = model.statements[i].wzElement;
            }
            if (test !== 'xfunction') {
                throw new Error(('First statement of a an iife node must be a function. Instead is ' + model.statements[0].wzElement));
            }
        }
        cnt.genItem(model.statements[0], ctx);
        ctx.write(')');
        if (model.statements.length === 2 && model.statements[1].wzElement === 'memberCall') {
            cnt.genItem(model.statements[1], ctx);
        }
        else if ((model.wzName || '').length > 0) {
            ctx.write(u.encloseParen(model.wzName)
            );
        }
        else {
            ctx.write('(');
            var first = true;
            for (var i = 1; i < model.statements.length; i++) {
                item = model.statements[i];
                if (item.wzElement === 'callOnValue') {
                    ctx.write(')');
                    break;
                }
                if (! (first)) {
                    ctx.write(', ');
                }
                first = false;
                cnt.genItem(item, ctx);
            }
            ctx.write(')');
        }
        for (var i = 1; i < model.statements.length; i++) {
            item = model.statements[i];
            if (item.wzElement === 'callOnValue') {
                cnt.genItem(item, ctx);
            }
        }
        if (u.isTopStatement(model)) {
            ctx.w(';');
        }
    };
    cnt.stm.generatorfunction = function(model, ctx) {
        ctx.__aster = '*';
        cnt.stm.xfunction(model, ctx);
        ctx.__aster = null;
    };
    cnt.stm.xyield = function(model, ctx) {
        var name = model.wzName.trim();
        if (model.statements.length > 0) {
            ctx.write('yield ');
            cnt.genItems(model.statements, ctx);
        }
        else {
            ctx.w('yield ' + name + u.semicolon(name));
        }
    };
    cnt.stm.arrowfunction = function(model, ctx) {
        var prms = checkedGenParams(model);
        if (ctx.__is_react_class && model.wzParent.wzElement == 'reactComponent') {
            ctx.w(model.wzName + ' = (' + prms.join(', ') + ') => {');
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            ctx.w('}');
        }
        else if (u.onlyChildIs(model, 'callOnValue')) {
            ctx.w('(' + prms.join(', ') + ') => ');
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
        }
        else {
            ctx.w('(' + prms.join(', ') + ') => {');
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            ctx.write('}');
        }
    };
    cnt.stm.xreturn = function(model, ctx) {
        if (model.statements && model.statements.length > 0) {
            ctx.write('return ');
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            if (model.statements.length == 1) {
                ctx.w(';');
            }
        }
        else {
            ctx.w('return ' + (model.wzName || '') + u.semicolon(model.wzName));
        }
    };
    function checkedGenParams(model) {
        if (model.getParams) {
            return (model.getParams() || '');
        }
        else {
            // TODO probably these were never executed: VIA
            // log 'checkedGenParams.model', model
            var ret = [];
            var newStatements = [];
            for (var i = 0; i < model.statements.length; i++) {
                var item = model.statements[i];
                // log 'checkedGenParams.item', item
                if (item.wzTag === 'param') {
                    ret.push(item.wzName);
                }
                else {
                    newStatements.push(item);
                }
            }
            model.statements = newStatements;
            return ret;
        }
    }
};

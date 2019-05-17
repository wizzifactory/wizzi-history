/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\call.js.ittf
*/
'use strict';
var util = require('util');
var u = require('../util/stm');

var myname = 'wizzi-codegen.js.statements.call';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.call = function(model, ctx) {
        var name = (model.wzName || '').trim();
        var hasParens = u.hasArguments(name);
        // log hasParens, ctx.__artifact, ctx.__functionNames
        if (hasParens == false && ctx.__artifact === 'xittf/document') {
            if (ctx.__functionNames.indexOf(name) < 0) {
                name = ctx.__functionProvider + '.' + name;
            }
        }
        if (model.statements.length > 0) {
            doCallChildStatements(model, name, hasParens, ctx);
        }
        else {
            name = hasParens ? name : (name + '()');
            ctx.write(name);
            if (u.isTopStatement(model) && u.isDescendentOf(model, 'iif') == false) {
                ctx.w(u.semicolon(name));
            }
        }
    };
    cnt.stm.memberCall = function(model, ctx) {
        var name = (model.wzName || '').trim();
        var hasParens = u.hasArguments(name);
        if (model.statements.length > 0) {
            doCallChildStatements(model, ('.' + name), hasParens, ctx);
        }
        else {
            name = hasParens ? ('.' + name) : ('.' + name) + '()';
            ctx.write(name);
            if (u.isTopStatement(model)) {
                ctx.w(u.semicolon(name));
            }
        }
    };
    cnt.stm.decoratorCall = function(model, ctx) {
        var name = ('@' + model.wzName).trim();
        var hasParens = u.hasArguments(name);
        if (model.statements.length > 0) {
            doCallChildStatements(model, name, hasParens, ctx);
        }
        else {
            name = hasParens ? name : (name + '()');
            ctx.write(name);
            if (u.isTopStatement(model) && (u.isDescendentOf(model, 'iif') == false)) {
                ctx.w(u.semicolon(name));
            }
        }
    };
    cnt.stm.callOnValue = function(model, ctx) {
        var hasParens = false;
        if (model.statements.length > 0) {
            doCallChildStatements(model, '', hasParens, ctx);
        }
        else {
            ctx.write('()');
        }
    };
    function doCallChildStatements(model, name, hasParens, ctx) {
        var childrenAreMemberExpr = hasParens;
        ctx.write(name);
        if (childrenAreMemberExpr === false) {
            ctx.write('(');
        }
        for (var i = 0; i < model.statements.length; i++) {
            var item = model.statements[i];
            if ((u.isCallArgument(item) && childrenAreMemberExpr) || u.isMemberAccess(item)) {
                if ((hasParens === false) && u.isMemberAccess(item)) {
                    ctx.write(')');
                }
                if (u.isCallArgument(item)) {
                    ctx.write('.');
                }
                cnt.genItem(item, ctx);
                for (var j = (i + 1); j < model.statements.length; j++) {
                    var item = model.statements[j];
                    if (u.isCallArgument(item)) {
                        ctx.write('.');
                    }
                    cnt.genItem(item, ctx);
                }
                if (u.isTopStatement(model) && u.isDescendentOf(model, 'iif') == false && model.wzElement !== 'decoratorCall' && !u.parentIs(model, 'arrowfunction')) {
                    ctx.w(';');
                }
                else {
                    ctx.w();
                }
                return ;
            }
            if (i > 0) {
                ctx.write(', ');
            }
            cnt.genItem(item, ctx);
        }
        ;
        if (childrenAreMemberExpr === false) {
            ctx.write(')');
        }
        if (u.isTopStatement(model) && model.wzElement !== 'decoratorCall' && u.isDescendentOf(model, 'iif') == false) {
            ctx.w(';');
        }
        else {
            // 2/11/17 _ ctx.w()
        }
    }
    cnt.stm.memberAccess = function(model, ctx) {
        if (ctx.__inside_html || (model.wzParent.wzElement === 'xreturn' && ctx.__jskind === 'react')) {
            var classTag = ctx.__jskind === 'react' ? 'className' : 'class';
            model.statements.unshift({
                wzElement: 'jsPropertyOrValue', 
                wzName: classTag + ' ' + model.wzName, 
                wzParent: model
            });
            model.wzElement = 'div';
            model.wzName = '';
            cnt.stm.div(model, ctx);
        }
        else {
            ctx.write(('.' + model.wzName));
        }
    };
    cnt.stm.memberAccessComputed = function(model, ctx) {
        if (model.statements && model.statements.length > 0) {
            ctx.write('[');
            var first = true;
            for (var i = 0; i < model.statements.length; i++) {
                var item = model.statements[i];
                if (u.isMemberAccess(item)) {
                    ctx.write(']');
                    cnt.genItem(item, ctx);
                    if (u.isTopStatement(model) && u.isDescendentOf(model, 'iif') == false) {
                        ctx.w(';');
                    }
                    return ;
                }
                if (!first) {
                    ctx.write(', ');
                }
                cnt.genItem(item, ctx);
                ctx.first = false;
            }
            ctx.write(']');
        }
        else {
            ctx.write('[' + model.wzName + ']');
        }
    };
};

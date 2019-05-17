/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\call.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var u = require('./util');

var myname = 'js.module.statements.call';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.call = function(model,ctx) {
        var name = (model.wzName || '').trim();
        var hasParens = u.hasArguments(name);
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
    cnt.stm.memberCall = function(model,ctx) {
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
    cnt.stm.decoratorCall = function(model,ctx) {
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
    cnt.stm.callOnValue = function(model,ctx) {
        var hasParens = false;
        if (model.statements.length > 0) {
            doCallChildStatements(model, '', hasParens, ctx);
        }
        else {
            ctx.write('()');
        }
    };
    function doCallChildStatements(model,name,hasParens,ctx) {
        var childsAreMemberExpr = hasParens;
        ctx.write(name);
        if (childsAreMemberExpr === false) {
            ctx.write('(');
        }
        for (var i = 0; i < model.statements.length; i++) {
            var item = model.statements[i];
            if ((u.isCallArgument(item) && childsAreMemberExpr) || u.isMemberAccess(item)) {
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
        if (childsAreMemberExpr === false) {
            ctx.write(')');
        }
        if (u.isTopStatement(model) && model.wzElement !== 'decoratorCall' && !u.parentIs(model, 'arrowfunction') && u.isDescendentOf(model, 'iif') == false) {
            ctx.w(';');
        }
        else {
            ctx.w();
        }
    }
    cnt.stm.memberAccess = function(model,ctx) {
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
    cnt.stm.memberAccessComputed = function(model,ctx) {
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

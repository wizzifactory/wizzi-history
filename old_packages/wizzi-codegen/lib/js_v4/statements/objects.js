/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\objects.js.ittf
*/
'use strict';
var util = require('util');
var u = require('../util/stm');
var lineParser = require('../util/lineParser');
var jstparser = require('./jsonStatementTree');

var myname = 'wizzi-codegen.js.statements.objects';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.jsonStatementTree = function(model, ctx) {
        var statements = jstparser.getStatements(model);
        cnt.genItems(statements, ctx, {
            indent: false
        });
    };
    cnt.stm.jsPropertyOrValue = function(model, ctx) {
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ';
        if (u.hasStatementChildren(model)) {
            if (u.parentIsHtmlElement(model)) {
                // Attributes have been already processed
            }
            else if (model.isDslCall) {
                ctx.write(model.wzName + '(');
                cnt.genItems(model.statements, ctx, {
                    indent: true
                });
                ctx.write(')');
            }
            else if (u.isObjectProperty(model) || u.isParamValue(model) || u.isValue(model)) {
                ctx.write(model.wzName + colon);
                cnt.genItems(model.statements, ctx, {
                    indent: false
                });
            }
            else if (ctx.__ecma === 'es6') {
                ctx.w('@' + model.wzName + '(');
                cnt.genItems(model.statements, ctx, {
                    indent: true
                });
                ctx.w(')');
            }
            else {
                throw ctx.error(myname + '. Invalid jsPropertyOrValue: ' + model.wzName, model);
            }
        }
        else {
            if (u.isParamValue(model) || u.isValue(model)) {
                ctx.write(model.wzName);
            }
            else if (u.isObjectProperty(model)) {
                var tk,
                    p = lineParser.parseNameValueRaw(model.wzName, model);
                if (p.hasValue()) {
                    ctx.write(p.name() + colon);
                    ctx.write(p.value());
                }
                else {
                    if (ctx.__ecma === 'es5') {
                        console.log(ctx.error(myname + '. Invalid object property: ' + model.wzName, model));
                        throw ctx.error(myname + '. Invalid object property: ' + model.wzName, model);
                    }
                    else {
                        ctx.write(p.name());
                    }
                }
                cnt.genItems(model.statements, ctx, {
                    indent: false
                });
            }
            else if (u.parentIsHtmlElement(model)) {
            }
            else {
                if (ctx.__ecma === 'es6') {
                    ctx.w('@' + model.wzName);
                }
                else if (ctx.__artifact === 'xittf/document') {
                    ctx.write(model.wzName);
                }
                else {
                    throw ctx.error(myname + '. Invalid jsPropertyOrValue: ' + model.wzName, model);
                }
            }
        }
    };
    cnt.stm.jsObject = function(model, ctx) {
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ',
            first = true,
            comma = true;
        if (model.isDslCall) {
            ctx.w(model.wzName + '(');
            ctx.indent();
            var i, i_items=model.statements, i_len=model.statements.length, item;
            for (i=0; i<i_len; i++) {
                item = model.statements[i];
                if (item.wzElement == 'namedCallParam') {
                    if (comma && !first) {
                        ctx.w(', ');
                    }
                    first = false;
                    cnt.genItem(item, ctx);
                }
            }
            ctx.w('');
            ctx.deindent();
            ctx.w(')');
            ctx.w('{');
            ctx.indent();
        }
        else {
            if (model.wzName && model.wzName.length > 0) {
                // is an object property
                ctx.w(model.wzName + colon + '{');
            }
            else {
                if (model.statements.length == 0) {
                    ctx.write('{}');
                    return ;
                }
                ctx.w('{');
            }
            ctx.indent();
        }
        first = true;
        comma = true;
        for (var i = 0; i < model.statements.length; i++) {
            var item = model.statements[i];
            if (model.isDslCall && item.wzElement == 'namedCallParam') {
                // skip
            }
            else {
                if (u.isMemberAccessOrCall(item)) {
                    ctx.w('');
                    ctx.deindent();
                    ctx.write('}');
                    cnt.genItem(item, ctx);
                    for (var j = (i + 1); j < model.statements.length; j++) {
                        var item = model.statements[j];
                        if (u.isCallArgument(item)) {
                            ctx.write('.');
                        }
                        cnt.genItem(item, ctx);
                    }
                    return ;
                }
                if (comma && !first) {
                    ctx.w(', ');
                }
                first = false;
                cnt.genItem(item, ctx);
                comma = item.wzElement !== 'comment';
            }
        }
        ;
        ctx.w('');
        ctx.deindent();
        ctx.write('}');
    };
    cnt.stm.jsArray = function(model, ctx) {
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ';
        if (model.wzName && model.wzName.length > 0) {
            // is an array property
            ctx.w(model.wzName + colon + '[');
        }
        else {
            if (model.statements.length == 0) {
                ctx.write('[' + (model.wzName || '') + ']');
                return ;
            }
            ctx.w('[');
        }
        ctx.indent();
        var first = true;
        for (var i = 0; i < model.statements.length; i++) {
            var item = model.statements[i];
            if (u.isMemberAccessOrCall(item)) {
                ctx.w('');
                ctx.deindent();
                ctx.write(']');
                cnt.genItem(item, ctx);
                for (var j = (i + 1); j < model.statements.length; j++) {
                    var item = model.statements[j];
                    if (u.isCallArgument(item)) {
                        ctx.write('.');
                    }
                    cnt.genItem(item, ctx);
                }
                return ;
            }
            if (!first) {
                ctx.w(', ');
            }
            first = false;
            cnt.genItem(item, ctx);
        }
        ;
        ctx.w('');
        ctx.deindent();
        ctx.write(']');
    };
    cnt.stm.get = function(model, ctx) {
        ctx.w('get ' + model.wzName + '() {');
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            cnt.genItem(item, ctx);
        }
        ctx.deindent();
        ctx.write('}');
    };
};

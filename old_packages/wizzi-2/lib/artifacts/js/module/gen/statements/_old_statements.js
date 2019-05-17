var u = require('./util');
var lineParser = require('../../../../../util/lineParser');
var md = module.exports = {};
md.load = function (cnt) {
    cnt.stm.statement = function (model, ctx) {
        if (ctx.__inside_html == true)
        {
            var text = model.wzName.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push(" + ip.join() + ");");
        }
        else
            ctx.w(model.wzName);
        cnt.genItems(model.statements, ctx, { indent: true });
    }
    cnt.stm.statementmultiline = function (model, ctx) {
        if (ctx.__inside_html == true) {
            var text = model.wzName.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push('\\n' + " + ip.join() + ");");
        }
        else
            ctx.w(model.wzName);
        cnt.genItems(model.statements, ctx, { indent: true });
    }
    cnt.stm.usestrict = function (model, ctx) {
        ctx.w("'use strict';");
    }
    cnt.stm.require = function (model, ctx) {
        var items = model.wzName.split(' ');
        var seenwizzi = false;
        items.forEach(function (item) {
            if (item === 'wizzi') {
                seenwizzi = true;
                ctx.w("var wizzi = require('wizzi');");
            }
            else if (item === 'log') {
                if (seenwizzi)
                    ctx.w("var log = wizzi.log(module);");
                else
                    ctx.w("var log = require('wizzi').log(module);");
            }
            else if (item === 'verify') {
                if (seenwizzi)
                    ctx.w("var verify = wizzi.log(module);");
                else
                    ctx.w("var verify = require('wizzi').verify;");
            } else {
                ctx.w("var " + item + " = require('" + item + "');");
            }
        });
    }
    cnt.stm.ximport = function (model, ctx) {
        if (ctx.__ecma === 'es5') {
            var nv = lineParser.parseNameValueRaw(model.wzName, model);
            if (nv.value()) {
                var nv2 = lineParser.parseNameValueRaw(nv.value());
                ctx.w("var " + nv.name() + " = require('" + nv2.value() + "');");
            } else {
                ctx.w("var " + nv.name() + " = require('" + nv.name() + "');");
            }
        } else {
            ctx.w("import " + model.wzName + u.semicolon(model.wzName));
        }
    }
    cnt.stm.xexport = function (model, ctx) {
        if (ctx.__ecma === 'es5') {
            ctx.ArtifactGenerationError(
                'export statement invalid in ecma 5',
                'js/module',
                model
                );
        } else {
            if (model.statements && model.statements.length > 0) {
                if (model.__function) {
                    cnt.stm.exportfunction(model, ctx);
                } else {
                    ctx.__inside_expr = true;
                    ctx.write('export ');
                    if (model.wzName && model.wzName.length > 0) ctx.write(model.wzName + ' ');
                    var indented, item = model.statements[0];
                    cnt.genItem(item, ctx);
                    for (var i = 1; i < model.statements.length; i++) {
                        if (ctx.__needs_comma) { ctx.write(','); ctx.__needs_comma = false; }
                        if (ctx.__needs_crlf) { ctx.w(); ctx.__needs_crlf = false; }
                        if (i == 1) { ctx.indent(); indented = true }
                        item = model.statements[i];
                        cnt.genItem(item, ctx);
                    }
                    ctx.w(';');
                    if (indented) ctx.deindent();
                    ctx.__needs_crlf = ctx.__needs_comma = ctx.__inside_expr = false;
                }
            } else {
                ctx.w("export " + model.wzName + u.semicolon(model.wzName));
            }
        }
    }
    cnt.stm.comment = function (model, ctx) {
        if (model.statements && model.statements.length > 0) {
            ctx.w('/**');
            ctx.indent();
            if (model.wzName.length > 0) {
                ctx.w(model.wzName);
            }
            ctx.__inside_comment = true;
            cnt.genItems(model.statements, ctx, { indent: false });
            ctx.__inside_comment = false;
            ctx.deindent();
            ctx.w('*/');
        } else {
            if (ctx.__inside_comment)
                ctx.w((model.wzName ? ' ' + model.wzName : ''));
            else
                ctx.w('//' + (model.wzName ? ' ' + model.wzName : ''));
        }
        ctx.__needs_crlf = false;
    }
    cnt.stm.commentmultiline = function (model, ctx) {
        ctx.w('/**');
        ctx.w('    ' + model.wzName);
        ctx.w('*/');
    }
    cnt.stm.xdelete = function (model, ctx) {
        ctx.w(' delete ' + model.wzName);
    }
    cnt.stm.set = function (model, ctx) {
        if (model.statements && model.statements.length > 0) {
            if (model.statements[0].wzEntity === 'function') {
                ctx.w('');
            }
            ctx.write(u.setOperator(model.wzName, model.statements));
            cnt.genItems(model.statements, ctx, { indent: false });
            if (u.isTopStatement(model)) {
                ctx.w(';');
            }
        } else {
            if (u.isDeclare(model)) {
                ctx.write(model.wzName);
                //ctx.__needs_semicolon = true;
                //ctx.__needs_crlf = true;
            } else {
                ctx.write(model.wzName);
                if (u.isTopStatement(model)) {
                    ctx.w(u.semicolon(model.wzName));
                }
            }
        }
    }
    cnt.stm.block = function (model, ctx) {
        model.statements.forEach(function (item) {
            cnt.genItem(item, ctx);
        });
    }
}

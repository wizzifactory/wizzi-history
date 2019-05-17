/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\var.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var u = require('./util');

var myname = 'js.module.statements.var';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.xlet = function(model,ctx) {
        cnt.stm._letvarconst(model, ctx, 'let');
    };
    cnt.stm.xconst = function(model,ctx) {
        cnt.stm._letvarconst(model, ctx, 'const');
    };
    cnt.stm.xvar = function(model,ctx) {
        cnt.stm._letvarconst(model, ctx, 'var');
    };
    cnt.stm._letvarconst = function(model,ctx,symbol) {
        if (model.statements && (model.statements.length > 0)) {
            ctx.__inside_expr = true;
            ctx.write(symbol + ' ');
            if (model.wzName && model.wzName.length > 0) {
                ctx.write((model.wzName + ' = '));
            }
            var indented,
                item = model.statements[0];
            cnt.genItem(item, ctx);
            for (var i = 1; i < model.statements.length; i++) {
                if (ctx.__needs_comma) {
                    ctx.write(',');
                    ctx.__needs_comma = false;
                }
                if (ctx.__needs_crlf) {
                    ctx.w();
                    ctx.__needs_crlf = false;
                }
                if (i == 1) {
                    ctx.indent();
                    indented = true;
                }
                item = model.statements[i];
                cnt.genItem(item, ctx);
            }
            ctx.w(';');
            if (indented) {
                ctx.deindent();
            }
            ctx.__needs_crlf = ctx.__needs_comma = ctx.__inside_expr = false;
        }
        else {
            ctx.w(symbol + ' ' + model.wzName + u.semicolon(model.wzName));
        }
    };
    cnt.stm.decl = function(model,ctx) {
        ctx.write(model.wzName);
        if (model.statements.length > 0) {
            ctx.write(' = ');
            var i, i_len=model.statements.length, item;
            for (i=0; i<i_len; i++) {
                item = model.statements[i];
                cnt.genItem(item, ctx);
            }
        }
        ctx.__needs_comma = true;
        ctx.__needs_crlf = true;
    };
    cnt.stm.xnew = function(model,ctx) {
        if (model.statements.length > 0) {
            ctx.write('new ');
            var startArg = 0;
            if (model.statements[0].wzElement === 'type') {
                ctx.write('(');
                cnt.genItem(model.statements[0], ctx);
                ctx.write(')');
                startArg = 1;
            }
            else {
                ctx.write(model.wzName);
            }
            var openParen = false;
            for (var i = startArg; i < model.statements.length; i++) {
                var item = model.statements[i];
                if (u.isMemberAccess(item)) {
                    if (openParen) {
                        ctx.write(')');
                    }
                    cnt.genItem(item, ctx);
                    if (u.isTopStatement(model)) {
                        ctx.w(';');
                    }
                    return ;
                }
                if (i == startArg) {
                    ctx.write('(');
                    openParen = true;
                }
                if (i > startArg) {
                    ctx.write(', ');
                }
                cnt.genItem(model.statements[i], ctx);
            }
            if (openParen) {
                ctx.write(')');
            }
        }
        else {
            ctx.write('new ' + model.wzName);
        }
        if (u.isTopStatement(model)) {
            ctx.w(';');
        }
    };
    cnt.stm.type = function(model,ctx) {
        var i, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            cnt.genItem(item, ctx);
        }
    };
};

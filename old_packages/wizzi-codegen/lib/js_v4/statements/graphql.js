/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\graphql.js.ittf
*/
'use strict';
var util = require('util');
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi-codegen.js.statements.graphql';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.graphqlQuery = function(model, ctx) {
        ctx.isGraphql = true;
        if (u.isArgumentOfCall(model)) {
            ctx.w("`");
            ctx.w("{");
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            ctx.w("");
            ctx.w("}");
            ctx.write("`");
        }
        else {
            ctx.w("graphql`");
            ctx.indent();
            ctx.w("query " + (model.wzName || "") + " {");
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            ctx.w("}");
            ctx.deindent();
            ctx.w("`");
        }
        ctx.isGraphql = false;
    };
    cnt.stm.graphqlMutation = function(model, ctx) {
        ctx.isGraphql = true;
        ctx.w("graphql`");
        ctx.indent();
        ctx.w("mutation " + (model.wzName || "") + " {").cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w("}");
        ctx.deindent();
        ctx.w("`");
        ctx.isGraphql = false;
    };
    cnt.stm.namedCallParam = function(model, ctx) {
        ctx.isNamedCallParam = true;
        if (model.statements.length > 0) {
            ctx.write( model.wzName + ': ');
            cnt.genItems(model.statements, ctx, {
                indent: false
            });
        }
        else {
            var p = lineParser.parseNameValueRaw(model.wzName, model);
            ctx.write(p.name() + ': ');
            ctx.write(p.value());
        }
        ctx.isNamedCallParam = false;
    };
};

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\html.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var statement = require('./statement');
var md = module.exports = {};
var myname = 'js.module.html';
md.gen = function(model,ctx) {
    var clazz = model.wzParent.wzName,
        method = model.wzName;
    ctx.w(clazz + '.prototype.' + method + ' = function(ctx) {');
    ctx.indent();
    ctx.w('var __html = [];');
    ctx.__inside_html = true;
    var i, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        statement.gen(item, ctx);
    }
    ctx.__inside_html = false;
    ctx.w("return __html.join('');");
    ctx.deindent();
    ctx.w('}');
};

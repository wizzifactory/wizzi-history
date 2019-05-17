/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js\method.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var statement = require('./statement');
var md = module.exports = {};
var myname = 'wizzi.codegen.js.method';
md.gen = function(model, ctx) {
    var clazz = model.wzParent.wzName,
        method = model.wzName,
        args = model.getParams() || '';
    if (ctx.__is_react_class) {
        ctx.w(method + '(' + args + ') {');
    }
    else if (model.static) {
        ctx.w(clazz + '.' + method + ' = function(' + args + ') {');
    }
    else {
        ctx.w(clazz + '.prototype.' + method + ' = function(' + args + ') {');
    }
    ctx.indent();
    var i, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        statement.gen(item, ctx);
    }
    ctx.deindent();
    ctx.w('}');
};

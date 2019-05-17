/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js\function.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var statement = require('./statement');
var md = module.exports = {};
var myname = 'wizzi.codegen.js.function';
md.gen = function(model, ctx) {
    var func = model.wzName,
        args = model.getParams() || '';
    ctx.w('function ' + func + '(' + args + ') {');
    ctx.indent();
    var i, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        statement.gen(item, ctx);
    }
    ctx.deindent();
    ctx.w('}');
};
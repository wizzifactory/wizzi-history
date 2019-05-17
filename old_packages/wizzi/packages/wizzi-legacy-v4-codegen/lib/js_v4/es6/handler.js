/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\es6\handler.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.codegen.js.es2015.handler';
md.gen = function(model, ctx) {
    var method = model.wzName,
        args = model.getParams() || '';
    ctx.w(method + ' = (' + args + ') => {');
    ctx.indent();
    var i, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        statement.gen(item, ctx);
    }
    ctx.deindent();
    ctx.w('}');
};

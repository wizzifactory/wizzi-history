/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\kinds\es6\method.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var statement = require('../../statement');
var md = module.exports = {};
var myname = 'js.module.es2015.method';
md.gen = function(model,ctx) {
    var method = model.wzName,
        args = model.getParams() || '';
    if (model.static) {
        ctx.w('static ' + method + '(' + args + ') {');
    }
    else {
        ctx.w(method + '(' + args + ') {');
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
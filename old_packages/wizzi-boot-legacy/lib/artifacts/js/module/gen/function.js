// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:39 GMT
'use strict';
var statement = require('./statement');
var md = module.exports = {};
var myname = 'js.module.function';
md.gen = function(model,ctx) {
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

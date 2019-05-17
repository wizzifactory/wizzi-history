// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:41 GMT
'use strict';
var _ = require('lodash');
var statement = require('./statement');
var md = module.exports = {};
var myname = 'js.wziife.function';
md.gen = function(model,ctx) {
    var parameters = _.concat([
        '__'
    ], model.getParams())
    ;
    ctx.w('var ' + model.wzName + ' = (function(' + parameters.join(',') + ') {');
    ctx.indent();
    var i, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        statement.gen(item, ctx);
    }
    var seen = false;
    ctx.w('return {');
    var i, i_len=model.__wzItems.vars.length, item;
    for (i=0; i<i_len; i++) {
        item = model.__wzItems.vars[i];
        if (seen) {
            ctx.w(',');
        }
        var ss = item.wzName.split(' ');
        ctx.write('    ' + ss[0] + ': ' + ss[0]);
        seen = true;
    }
    var i, i_len=model.__wzItems.functions.length, item;
    for (i=0; i<i_len; i++) {
        item = model.__wzItems.functions[i];
        if (seen) {
            ctx.w(',');
        }
        ctx.write('    ' + item.wzName + ': ' + item.wzName);
        seen = true;
    }
    var i, i_len=model.__wzItems.classes.length, item;
    for (i=0; i<i_len; i++) {
        item = model.__wzItems.classes[i];
        if (seen) {
            ctx.w(',');
        }
        ctx.write('    ' + item.wzName + ': ' + item.wzName);
        seen = true;
    }
    if (seen) {
        ctx.w('');
    }
    ctx.w('};');
    ctx.deindent();
    var args = _.concat([
        '__wz'
    ], model.getArgs())
    ;
    ctx.w('})(' + args.join(',') + ');');
};

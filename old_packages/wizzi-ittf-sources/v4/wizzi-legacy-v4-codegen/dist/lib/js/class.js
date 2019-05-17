/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js\class.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var statement = require('./statement');
var method = require('./method');
var html = require('./html');
var md = module.exports = {};
var myname = 'js.module.class';
md.gen = function(model, ctx) {
    var zclass = model.wzName,
        zsuper = model.super,
        zsuperw = zsuper || '',
        ctor = model.findCtor(),
        ctorArgs = ctor == null ? '' : (ctor.getParams() || ''),
        ctorBaseArgs = ctor == null ? '' : (ctor.getBaseArgs() || ''),
        superArgs = ctorBaseArgs.length > 0 ? ', ' + ctorBaseArgs : '';
    ctx.w('var ' + zclass + ' = (function (' + zsuperw + ') {');
    ctx.indent();
    if (zsuper) {
        ctx.w('_inherits(' + zclass + ', ' + zsuperw + ');');
    }
    ctx.w('function ' + zclass + '(' + ctorArgs + ') {');
    ctx.indent();
    if (zsuper) {
        ctx.w("_get(Object.getPrototypeOf(" + zclass + ".prototype), 'constructor', this).call(this" + superArgs + ");");
    }
    ctx.w('_classCallCheck(this, ' + zclass + ');');
    if (ctor) {
        var i, i_len=ctor.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = ctor.statements[i];
            statement.gen(item, ctx);
        }
    }
    ctx.deindent();
    ctx.w('}');
    var i, i_len=model.statements.length, member;
    for (i=0; i<i_len; i++) {
        member = model.statements[i];
        if (member.wzElement === 'method') {
            new method.gen(member, ctx);
        }
        else if (member.wzElement === 'ctor') {
            // done already
        }
        else if (member.wzElement === 'tohtml') {
            new html.gen(member, ctx);
        }
        else {
            statement.gen(member, ctx);
            // throw ctx.error(myname + '.gen. Member element not implemented: ' + member.wzElement)
        }
    }
    ctx.w('return ' + zclass + ';');
    ctx.deindent();
    ctx.w('})(' + zsuperw + ');');
    ctx.w('');
};

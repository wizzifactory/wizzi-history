// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:39 GMT
'use strict';
var statement = require('../../statement');
var method = require('./method');
var property = require('./property');
var html = require('./html');
var md = module.exports = {};
var myname = 'js.module.es2015.class';
md.gen = function(model,ctx) {
    var zclass = model.wzName,
        zsuper = model.super,
        ctor = model.findCtor(),
        ctorArgs = ctor == null ? '' : (ctor.getParams() || ''),
        superArgs = ctor == null ? '' : (ctor.getBaseArgs() || '');
    if (zsuper) {
        ctx.w('class ' + zclass + ' extends ' + zsuper + ' {');
    }
    else {
        ctx.w('class ' + zclass + ' {');
    }
    ctx.indent();
    if (zsuper || ctor) {
        ctx.w('constructor(' + ctorArgs + ') {');
        ctx.indent();
    }
    if (zsuper) {
        ctx.w('super(' + superArgs + ');');
    }
    if (ctor) {
        var i, i_len=ctor.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = ctor.statements[i];
            statement.gen(item, ctx);
        }
    }
    if (zsuper || ctor) {
        ctx.deindent();
        ctx.w('}');
    }
    ctx.w('');
    var i, i_len=model.statements.length, member;
    for (i=0; i<i_len; i++) {
        member = model.statements[i];
        if (member.wzElement === 'method') {
            new method.gen(member, ctx);
        }
        else if (member.wzElement === 'property') {
            new property.gen(member, ctx);
        }
        else if (member.wzElement === 'html') {
            new html.gen(member, ctx);
        }
        else if (member.wzElement === 'ctor') {
            // done already
        }
        else {
            throw ctx.error(myname + '.gen. Member element not implemented: ' + member.wzElement, member);
        }
    }
    ctx.deindent();
    ctx.w('}');
};

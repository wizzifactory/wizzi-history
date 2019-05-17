/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\kinds\es6\class.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var statement = require('../../statement');
var method = require('./method');
var handler = require('./handler');
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
        else if (member.wzElement === 'arrowfunction') {
            new handler.gen(member, ctx);
        }
        else if (member.wzElement === 'property' || member.wzElement === 'p') {
            new property.gen(member, ctx);
        }
        else if (member.wzElement === 'p') {
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

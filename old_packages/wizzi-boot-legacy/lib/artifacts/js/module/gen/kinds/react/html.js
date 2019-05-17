// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:39 GMT
'use strict';
var u = require('../../statements/util');
var md = module.exports = {};
var myname = 'js.module.react.html';
md.htmlelement = function(cnt,model,tag,text,ctx,attrs) {
    var attrs_string = [];
    var i, i_len=attrs.length, a;
    for (i=0; i<i_len; i++) {
        a = attrs[i];
        if (a.value.length == 0) {
            attrs_string.push(' ' + a.name);
        }
        else {
            var quote = a.value.indexOf('{') >= 0 || u.isQuoted(a.value) ? '' : '"';
            attrs_string.push(' ' + a.name + '=' + quote + a.value + quote);
        }
    }
    if (u.parentIsHtmlElement(model) == false) {
        if (u.isArgumentOfCall(model)) {
            ctx.w();
        }
        else {
            ctx.write(' (');
            ctx.w();
        }
    }
    ctx.indent();
    ctx.w("<" + tag + attrs_string.join('') + ">");
    if (text) {
        ctx.w(text);
    }
    cnt.genItems(model.statements, ctx, { indent: false });
    ctx.w("</" + tag + ">");
    ctx.deindent();
    if (u.parentIsHtmlElement(model)) {
        ctx.w();
    }
    else {
        if (u.isArgumentOfCall(model)) {
            // _ ctx.write(')')
        }
        else {
            ctx.w(');');
        }
    }
};

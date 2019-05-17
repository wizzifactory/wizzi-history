/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\kinds\react\html.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var u = require('../../statements/util');
var md = module.exports = {};
var myname = 'js.module.react.html';
md.htmlelement = function(cnt,model,tag,text,ctx,attrs) {
    if (u.isGraphEnclosed(tag)) {
        ctx.w(tag);
        return ;
    }
    // @style/_style is used as an attribute in react
    // see /statements/html for attrs extraction
    if (model.wzElement === '_style') {
        return ;
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
    // begin open tag and write attributes
    ctx.write("<" + tag);
    var i, i_len=attrs.length, a;
    for (i=0; i<i_len; i++) {
        a = attrs[i];
        if (a.statements && a.statements.length > 0) {
            ctx.write(' ' + a.name + '={');
            cnt.genItems(a.statements, ctx, { indent: false });
            ctx.write('}');
        }
        else if (a.value.length || a.value.length == 0) {
            if (a.value.length == 0) {
                ctx.write(' ' + a.name);
            }
            else {
                var quote = a.value.indexOf('{') >= 0 || u.isQuoted(a.value) ? '' : '"';
                ctx.write(' ' + a.name + '=' + quote + a.value + quote);
            }
        }
        else {
            ctx.write(' ' + a.name + '="' + a.value + '"');
        }
    }
    ctx.w(">");
    // end of open tag
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
            // _ ctx.w(');') // 7/4/2017
            ctx.w(')');
        }
    }
};

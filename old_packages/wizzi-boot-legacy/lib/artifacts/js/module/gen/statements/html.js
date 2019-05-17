var lineParser = require('../../../../../util/lineParser');
var verify = require('../../../../../util/verify');
var u = require('./util');
var html_react = require('../kinds/react/html');
var md = module.exports = {};
// Those of facebook react see https://facebook.github.io/react/docs/tags-and-attributes.html
var _tags = "a abbr address area article aside audio b base bdi bdo big blockquote body br" +
    " button canvas caption cite code col colgroup data datalist dd del details dfn" +
    " dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5" +
    " h6 head header hr html i iframe img input ins kbd keygen label legend li link" +
    " main map mark menu menuitem meta meter nav noscript object ol optgroup option" +
    " output p param picture pre progress q rp rt ruby s samp script section select" +
    " small source span strong style sub summary sup table tbody td textarea tfoot th" +
    " thead time title tr track u ul var video wbr";
html_supported_tags = _tags.split(' ');
md.load = function (cnt) {
    cnt.stm.htmlelement = function (model, ctx) {
        var p = lineParser.parseNameValueRaw(model.wzName, model),
            tag = p.name(),
            text = p.value();
        md._htmlelement(cnt, model, tag, text, ctx);
    }
    html_supported_tags.forEach(function (item) {
        cnt.stm[item] = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    });
    /*
    cnt.stm.a = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.body = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.br = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.button = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.h1 = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.h2 = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.h3 = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.a = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.br = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.button = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.div = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.form = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.head = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.html = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.h1 = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.h2 = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.h3 = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.h4 = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.i = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.img = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.input = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.label = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.legend = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.li = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.option = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.p = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.select = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.span = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.table = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.tbody = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.td = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.textarea = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.th = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.thead = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.tr = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    cnt.stm.ul = function (model, ctx) { md._htmlelement(cnt, model, ctx); }
    */
    cnt.stm.js = function (model, ctx) {
        ctx.w("__html.push('<script src=\"" + model.wzName + "\"></script>')");
    }
    cnt.stm.css = function (model, ctx) {
        ctx.w("__html.push('<link href=\"" + model.wzName + "\" rel=\"stylesheet\">')");
    }
    cnt.stm.doctype = function (model, ctx) {
        ctx.w("__html.push('<doctype " + model.wzName + ">')");
    }
    cnt.stm.ready = function (model, ctx) {
        if (model.kind === 'jquery') {
            ctx.w('$(function() {');
            cnt.genItems(model.statements, ctx, { indent: true });
            ctx.w('});');
        } else {
            ctx.w('window.onload = function() {');
            cnt.genItems(model.statements, ctx, { indent: true });
            ctx.w('};');
        }
    }
    cnt.stm.tohtml = function (model, ctx) {
        if (model.kind === 'dom')
            cnt.stm.html_dom(model, ctx);
        else if (model.kind === 'nh')
            cnt.stm.html_ng(model, ctx);
        else if (model.kind === 'hb')
            cnt.stm.html_hb(model, ctx);
        else
            cnt.stm.html_f(model, ctx);
    }
    cnt.stm.html_f = function (model, ctx) {
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        cnt.genItems(model.statements, ctx, { indent: false });
        ctx.__inside_html = false;
        ctx.w("return __html.join('');")
        ctx.deindent();
        ctx.w("}")
    }
    cnt.stm.html_dom = function (model, ctx) {
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        cnt.genItems(model.statements, ctx, { indent: false });
        ctx.__inside_html = false;
        ctx.w("return $(__html.join(''));")
        ctx.deindent();
        ctx.w("}")
    }
    cnt.stm.html_hb = function (model, ctx) {
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        ctx.__inside_handlebar = true;
        cnt.genItems(model.statements, ctx, { indent: false });
        ctx.__inside_handlebar = false;
        ctx.__inside_html = false;
        ctx.w("return Handlebars.compile(__html.join(''));");
        ctx.deindent();
        ctx.w("}");
    }
}
md._htmlelement = function (cnt, model, tag, text, ctx) {
    if (typeof ctx === 'undefined') {
        ctx = tag;
        text = model.wzName;
        tag = model.wzElement;
    }
    var attrs = getAttrs(model, ctx);
    for (var i = 0; i < model.statements.length; i++) {
        var s = model.statements[i];
        if (s.wzElement === 'jsPropertyOrValue') {
            var p = lineParser.parseNameValueRaw(s.wzName, s),
                name = p.name(),
                value = p.value();
            if (value) {
                if (ctx.__jskind === 'react') {
                    ;
                } else {
                    var ip = lineParser.parseInterpolation(value, model, ctx.__inside_handlebar, ctx.__inside_ng);
                    value = ip.join();
                }
            }
            attrs.push({ name: name, value: value.trim() });
        }
    }
    if (ctx.__jskind === 'react') {
        var save___inside_html = ctx.__inside_html;
        ctx.__inside_html = true;
        html_react.htmlelement(cnt, model, tag, text, ctx, attrs);
        ctx.__inside_html = save___inside_html;
    } else {
        var attrs_string = []
        attrs.forEach(function (a) {
            if (['multiple'].indexOf(a.name) >= 0)
                attrs_string.push('\' + ( ' + a.value + ' ? \' ' + a.name + '\' : \'\' ) + \'');
            else if (a.value !== '@@null') {
                if (a.value.length == 0) {
                    attrs_string.push(' ' + a.name);
                } else {
                    attrs_string.push(' ' + a.name + '="\' + ' + a.value + ' + \'"');
                }
            }
        });
        var isCode = ['script', 'style'].indexOf(tag) >= 0;
        var lf = isCode ? '\\n' : '';
        if (isCode) ctx.__incode = true;
        ctx.w("__html.push('" + lf + "<" + tag + attrs_string.join('') + ">" + lf + "');");
        if (text) {
            text = text.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push(" + ip.join() + ");");
        }
        cnt.genItems(model.statements, ctx, { indent: false });
        ctx.w("__html.push('</" + tag + ">" + lf + "');");
        if (isCode) ctx.__incode = false;
    }
}
function getAttrs(model, ctx)
{
    var name, value, retval = [];
    for (var a in model) {
        value = null;
        if (isAttrValue(a, model[a])) {
            name = verify.replaceAll(a, '_', '-');
            value = model[a];
        } else if( a.substr(0, 3) === 'ng-') {
            name = a;
            value = model[a];
        } else if (a.substr(0, 5) === 'data-') {
            name = a;
            value = model[a];
        } else if (a.substr(0, 5) === 'aria-') {
            name = a;
            value = model[a];
        }
        if (value) {
            if (ctx.__jskind === 'react') {
                ;
            } else {
                var ip = lineParser.parseInterpolation(value, model, ctx.__inside_handlebar, ctx.__inside_ng);
                value = ip.join();
            }
            console.log('******', ctx.__jskind, name, value);
            retval.push({ name: name, value: value })
        }
    }
    return retval
}
function isAttrValue(a, v) {
    if (noattrs.indexOf(a) > -1)
        return false;
    if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v))
        return false;
    return true
}
var noattrs = [
    'wzTag',
    'wzName',
	'wzElement',
	'wzParent',
	'wzSourceLineInfo',
	'___exportName'
];

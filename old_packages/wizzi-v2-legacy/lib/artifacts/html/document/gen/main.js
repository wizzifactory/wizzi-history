/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\html\document\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var wizzi = require('../../../../../index');
var css_rule = require('./css_rule');
var js_statement = require('./js_statement');
var verify = wizzi.verify;
var utilNode = wizzi.utilNode;
var lineParser = wizzi.lineParser;
var md = module.exports = {};
var myname = 'htm1.document.main';
md.gen = function(model,ctx,callback) {
    // log 'model', util.inspect(model, { depth: 1 })
    this.genItem(model, ctx);
    callback(null, ctx);
};
md.gen.prototype.genItems = function(items,ctx,options) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    for (var i = from; i < items.length; i++) {
        var item = items[i];
        this.genItem(item, ctx);
    }
    if (indent) {
        ctx.deindent();
    }
};
md.gen.prototype.genItem = function(model,ctx) {
    if (['_text','_textLF'].indexOf(model.wzElement) >= 0) {
        // model.wzName is a TEXTNODE
        // preserve a blank first char (coded between single hyphens)
        var text = verify.startsWith(model.wzName, "' '") ? '&nbsp;' + model.wzName.substr(3) : model.wzName;
        if (ctx.__iscode || model.wzElement === '_textLF') {
            ctx.w(text);
        }
        else {
            ctx.write(text);
        }
        this.genItems(model.elements, ctx);
        return ;
    }
    if (this[model.wzElement]) {
        // known element
        if (this[model.wzElement](model, ctx)) {
            // ok, processed
            return ;
        }
    }
    this.preprocess(model, ctx);
    var voidEl = (model.wzTag in voidElements);
    ctx.write('<' + model.wzTag);
    var i, i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || a.value && a.value.length > 0) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    ctx.write('>');
    if (voidEl) {
        ctx.w();
        this.postprocess(model, ctx);
        return ;
    }
    // check if the element has text line coded as children of the $. ittf command
    var lt = utilNode.lineToText(model.wzName);
    if (lt.text) {
        // preserve a blank first char (coded between single hyphens)
        var text = verify.startsWith(lt.text, "' '") ? '&nbsp;' + lt.text.substr(3) : lt.text;
        ctx.write(text);
    }
    if (lt.lines) {
        ctx.w();
        var saveIndent;
        if (ctx.__ispre) {
            // we are inside a pre element, temporaly reset
            // to 0 the indentation depending from the node depth
            saveIndent = ctx.forceIndent(0);
        }
        else {
            ctx.indent();
        }
        var i, i_len=lt.lines.length, line;
        for (i=0; i<i_len; i++) {
            line = lt.lines[i];
            ctx.w(line);
        }
        if (ctx.__ispre) {
            // restore indentation
            ctx.forceIndent(saveIndent);
        }
        else {
            ctx.deindent();
        }
    }
    if (model.elements && model.elements.length > 0) {
        if (ctx.__ispre && !ctx.__ispre_started) {
            ctx.w('');
            ctx.__ispre_started = true;
            var saveIndent = ctx.forceIndent(0);
            this.genItems(model.elements, ctx);
            ctx.forceIndent(saveIndent);
            ctx.__ispre_started = false;
        }
        else {
            var noinline = inline.indexOf(model.wzTag) < 0;
            if (noinline) {
                ctx.w('');
            }
            this.genItems(model.elements, ctx, { indent: noinline});
        }
    }
    ctx.w('</' + model.wzTag + '>');
    this.postprocess(model, ctx);
};
md.gen.prototype.preprocess = function(model,ctx) {
    if (model.wzTag == '.') {
        model.wzTag = 'div';
        model.class = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == '#') {
        model.wzTag = 'div';
        model.id = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == '<') {
        model.wzTag = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == 'js') {
        model.wzTag = 'script';
        model.src = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag === 'css') {
        model.wzTag = 'link';
        model.href = model.wzName;
        model.rel = 'stylesheet';
        model.wzName = null;
    }
    else if (model.wzTag === '@title') {
        model.wzTag = 'title';
    }
    else if (model.wzTag === '@style') {
        model.wzTag = 'style';
    }
    if (incode.indexOf(model.wzTag) > -1) {
        ctx.__iscode = true;
    }
    if (['pre'].indexOf(model.wzTag) > -1) {
        ctx.__ispre = true;
    }
};
md.gen.prototype.postprocess = function(model,ctx) {
    if (incode.indexOf(model.wzTag) > -1) {
        ctx.__iscode = false;
    }
    if (['pre'].indexOf(model.wzTag) > -1) {
        ctx.__ispre = false;
    }
};
md.gen.prototype.html = function(model,ctx) {
    if (model.doctype) {
        ctx.w('<!doctype ' + model.doctype + '>');
    }
    else {
        ctx.w('<!doctype html>');
    }
    ctx.write('<html');
    var i, i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if (a.name != 'doctype') {
            if ((a.name in attrsneedsvalue) || a.value && a.value.length > 0) {
                ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
            }
            else {
                ctx.write(' ' + a.name);
            }
        }
    }
    ctx.w('>');
    this.genItems(model.elements, ctx);
    ctx.w();
    ctx.w('</html>');
    return true;
};
md.gen.prototype._css = function(model,ctx) {
    if (model.rules.length === 0) {
        // is link to a stylesheet not a style element
        return false;
    }
    ctx.w("<style>");
    css_rule.genItems(model.rules, ctx);
    ctx.w("</style>");
    return true;
};
md.gen.prototype._js = function(model,ctx) {
    if (model.statements.length === 0) {
        // is link to a js file not a script element
        return false;
    }
    ctx.w("<script>");
    js_statement.genItems(model.statements, ctx);
    ctx.w("</script>");
    return true;
};
md.gen.prototype.ready = function(model,ctx) {
    ctx.w("<script>");
    ctx.indent();
    if (model.kind === 'jquery') {
        ctx.w('$(function() {');
        js_statement.genItems(model.statements, ctx, { indent: true });
        ctx.w('});');
    }
    else {
        ctx.w('window.onload = function() {');
        js_statement.genItems(model.statements, ctx, { indent: true });
        ctx.w('};');
    }
    ctx.deindent();
    ctx.w("</script>");
    return true;
};
md.gen.prototype.comment = function(model,ctx) {
    if (ctx.__iscode) {
        ctx.w("// " + model.wzName);
    }
    else {
        ctx.w("<!-- " + model.wzName + " -->");
    }
    return true;
};
var noattrs = [
    'wzTag', 
    'wzName', 
    'wzElement', 
    'wzParent', 
    'wzSourceLineInfo', 
    '___exportName'
];
function isAttrValue(a,v) {
    if (noattrs.indexOf(a) > -1) {
        return false;
    }
    if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
        return false;
    }
    return true;
}

function getAttrs(e) {
    var retval = [];
    for (var a in e) {
        if (isAttrValue(a, e[a])) {
            retval.push({ name: verify.replaceAll(a, '_', '-'), value: e[a] });
        }
        else if (a.substr(0, 3) === 'ng-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'data-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'aria-') {
            retval.push({ name: a, value: e[a] });
        }
    }
    if (e.attributes) {
        var i, i_len=e.attributes.length, a;
        for (i=0; i<i_len; i++) {
            a = e.attributes[i];
            var p = lineParser.parseNameValueRaw(a.wzName, a);
            if (p.hasValue()) {
                retval.push({ name: p.name(), value: p.value() });
            }
            else {
                retval.push({ name: p.name() });
            }
        }
    }
    return retval;
}

var inline = [
    'a', 
    'img', 
    'input', 
    'li', 
    'textarea'
];
var incode = [
    'js', 
    'css', 
    'script', 
    'style', 
    'ready'
];
var attrsneedsvalue = {
    __proto__: null
};
var voidElements = {
    __proto__:  null, 
    area:  true, 
    base:  true, 
    basefont:  true, 
    br:  true, 
    col:  true, 
    command:  true, 
    embed:  true, 
    frame:  true, 
    hr:  true, 
    img:  true, 
    input:  true, 
    isindex:  true, 
    keygen:  true, 
    link:  true, 
    meta:  true, 
    param:  true, 
    source:  true, 
    track:  true, 
    wbr:  true, 
    // common self closing svg elements
    path:  true, 
    circle:  true, 
    ellipse:  true, 
    line:  true, 
    rect:  true, 
    use:  true, 
    stop:  true, 
    polyline:  true, 
    polygone:  true
};

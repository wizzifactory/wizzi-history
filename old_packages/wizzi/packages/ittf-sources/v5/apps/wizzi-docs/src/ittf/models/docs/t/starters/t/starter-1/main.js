// generator: wizzi-lab-artifatcs/lib/js/module/gen/main.js, utc time: Thu, 22 Oct 2015 21:00:42 GMT
var util = require('util');
var verify = require('wizzi-core').verify;
var utilnode = require('wizzi-ittf').utilnode;
var lineparser = require('wizzi-core').lineparser;
var md = module.exports = {};
var myname = 'myhtml.document.main';

md.gen = function(model, ctx) {
    console.log(myname+'.model', util.inspect(model, { depth: 1 }));
    this.element(model, ctx);
};

md.gen.prototype.elements = function(items, ctx, options) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    for (var i = from; i < items.length; i++) {
        var item = items[i];
        this.element(item, ctx);
    }
    if (indent) {
        ctx.deindent();
    }
};

md.gen.prototype.element = function(model, ctx) {
    var tag, textnode;
    if (model.wzElement === 'html') {
        ctx.w('<!DOCTYPE html>');
        tag = 'html';
    }
    else {
        var p = lineparser.parseNameValueRaw(model.wzName, model);
        tag = p.name();
        if (p.hasValue()) {
            textnode = p.value();
        }
    }
    var voidEl = (tag in voidElements);
    ctx.write('<' + tag);
    var i, i_len=getAttrs(model).length, attr;
    for (i=0; i<i_len; i++) {
        attr = getAttrs(model)[i];
        if (attr.value && attr.value.length > 0) {
            ctx.write(' ' + attr.name + '="' + verify.unquote(attr.value || '') + '"');
        }
        else {
            ctx.write(' ' + attr.name);
        }
    }
    ctx.write('>');
    if (voidEl) {
        ctx.w();
        return ;
    }
    if (textnode) {
        ctx.write(textnode);
    }
    if (model.elements.length > 0) {
        var noinline = inline.indexOf(tag) < 0;
        if (noinline) {
            ctx.w('');
        }
        this.elements(model.elements, ctx, { indent: noinline});
    }
    ctx.w('</' + tag + '>');
};
function getAttrs(e) {
    var retval = [];
    var i, i_len=e.attributes.length, a;
    for (i=0; i<i_len; i++) {
        a = e.attributes[i];
        var p = lineparser.parseNameValueRaw(a.wzName, a);
        if (p.hasValue()) {
            retval.push({ name: p.name(), value: p.value() });
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
var voidElements = {
    __proto__: null, 
    area: true, 
    base: true, 
    basefont: true, 
    br: true, 
    col: true, 
    command: true, 
    embed: true, 
    frame: true, 
    hr: true, 
    img: true, 
    input: true, 
    isindex: true, 
    keygen: true, 
    link: true, 
    meta: true, 
    param: true, 
    source: true, 
    track: true, 
    wbr: true, 
    // common self closing svg elements
    path: true, 
    circle: true, 
    ellipse: true, 
    line: true, 
    rect: true, 
    use: true, 
    stop: true, 
    polyline: true, 
    polygone: true
};

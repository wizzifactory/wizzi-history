/*
    artifact generator: C:\My\wizzi\v4\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-docs\src\ittf\lib\artifacts\md\document\gen\main.js.ittf
    utc time: Mon, 23 Oct 2017 10:07:40 GMT
*/
'use strict';
var util = require('util');
var verify = require('../../../../util/verify');
var md = module.exports = {};
var myname = 'md.document.main';
md.gen = function(model, ctx, callback) {
    // log 'model', util.inspect(model, { depth: 1 })
    if (this.genItem) {
        this.genItem(model, ctx);
        callback(null, ctx);
    }
    else {
        new md.gen(model, ctx, callback);
    }
};
md.gen.prototype.genItems = function(items, ctx, options) {
    var opt = options || {},
        from = opt.from || 0;
    for (var i = from; i < items.length; i++) {
        var item = items[i];
        this.genItem(item, ctx);
    }
};
md.gen.prototype.genItem = function(model, ctx) {
    if (this[model.wzElement]) {
        // known element
        if (this[model.wzElement](model, ctx)) {
            // ok, processed
            return ;
        }
    }
    else {
        console.log(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
        throw ctx.error(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
    }
};
md.gen.prototype.mdx = function(model, ctx) {
    this.genItems(model.elements, ctx);
    return true;
};
md.gen.prototype.h1 = function(model, ctx) {
    ctx.w("# " + model.wzName);
    return true;
};
md.gen.prototype.h2 = function(model, ctx) {
    ctx.w("## " + model.wzName);
    return true;
};
md.gen.prototype.h3 = function(model, ctx) {
    ctx.w("### " + model.wzName);
    return true;
};
md.gen.prototype.h4 = function(model, ctx) {
    ctx.w("#### " + model.wzName);
    return true;
};
md.gen.prototype.h5 = function(model, ctx) {
    ctx.w("##### " + model.wzName);
    return true;
};
md.gen.prototype.h6 = function(model, ctx) {
    ctx.w("##### " + model.wzName);
    return true;
};
md.gen.prototype.a = function(model, ctx) {
    ctx.write('[' + model.wzName + ']');
    ctx.write('(' + model.href);
    if (verify.isString(model.title)) {
        ctx.write(' "' + model.title + '"');
    }
    ctx.w(')');
};
md.gen.prototype.ul = function(model, ctx) {
    this.genItems(model.elements, ctx);
};
md.gen.prototype.li = function(model, ctx) {
    ctx.write('* ');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(model.wzName + ' ' );
    }
    this.genItems(model.elements, ctx);
    ctx.w('');
};
md.gen.prototype.ol = function(model, ctx) {
    this.genItems(model.elements, ctx);
};
md.gen.prototype.img = function(model, ctx) {
    ctx.write('![' + model.wzName + ']');
    ctx.write('(' + model.src);
    if (verify.isString(model.title)) {
        ctx.write(' "' + model.title + '"');
    }
    ctx.w(')');
};
md.gen.prototype.video = function(model, ctx) {
};
md.gen.prototype.table = function(model, ctx) {
    ctx.w('<table>');
    this.genItems(model.elements, ctx);
    ctx.w('</table>');
};
md.gen.prototype.tr = function(model, ctx) {
    ctx.w('<tr>');
    this.genItems(model.elements, ctx);
    ctx.w('</tr>');
};
md.gen.prototype.tbody = function(model, ctx) {
    ctx.w('<tbody>');
    this.genItems(model.elements, ctx);
    ctx.w('</tbody>');
};
md.gen.prototype.td = function(model, ctx) {
    ctx.write('<td>');
    if (model.wzName) {
        ctx.write(model.wzName);
    }
    if (model.elements && model.elements.length > 0) {
        ctx.w();
        this.genItems(model.elements, ctx);
    }
    else {
        ctx.w('</td>');
    }
};
md.gen.prototype.th = function(model, ctx) {
    ctx.write('<th>');
    if (model.wzName) {
        ctx.write(model.wzName);
    }
    if (model.elements && model.elements.length > 0) {
        ctx.w();
        this.genItems(model.elements, ctx);
    }
    else {
        ctx.w('</th>');
    }
};
md.gen.prototype.quote = function(model, ctx) {
};
md.gen.prototype.hr = function(model, ctx) {
    ctx.w('* * *');
};
md.gen.prototype.p = function(model, ctx) {
    ctx.w(model.wzName);
    if (ctx.isCode) {
        ctx.indent();
    }
    this.genItems(model.elements, ctx);
    if (ctx.isCode) {
        ctx.deindent();
    }
    return true;
};
md.gen.prototype.span = function(model, ctx) {
    ctx.write(verify.replaceAll(model.wzName, '&nbsp;', ' '));
    this.genItems(model.elements, ctx);
    return true;
};
md.gen.prototype.br = function(model, ctx) {
    ctx.w();
    return true;
};
md.gen.prototype.i = function(model, ctx) {
    ctx.write('*' + model.wzName);
    this.genItems(model.elements, ctx);
    ctx.write('*');
    return true;
};
md.gen.prototype.b = function(model, ctx) {
    ctx.write('**' + model.wzName);
    this.genItems(model.elements, ctx);
    ctx.write('**');
    return true;
};
md.gen.prototype.span = function(model, ctx) {
    ctx.write(model.wzName);
    this.genItems(model.elements, ctx);
    return true;
};
md.gen.prototype.blank = function(model, ctx) {
    ctx.write(' ' + model.wzName);
    this.genItems(model.elements, ctx);
    return true;
};
md.gen.prototype.code = function(model, ctx) {
    ctx.w("`" + model.wzName + "`");
    return true;
};
md.gen.prototype.js = function(model, ctx) {
    ctx.w("```javascript");
    ctx.isCode = true;
    this.genItems(model.elements, ctx);
    ctx.isCode = false;
    ctx.w("```");
    return true;
};
md.gen.prototype.bash = function(model, ctx) {
    ctx.w("```bash");
    ctx.isCode = true;
    this.genItems(model.elements, ctx);
    ctx.isCode = false;
    ctx.w("```");
    return true;
};
md.gen.prototype.imgRef = function(model, ctx) {
    ctx.write('![' + model.alt + ']');
    ctx.w('[' + model.wzName + ']');
};
md.gen.prototype.ref = function(model, ctx) {
    ctx.write('[' + model.wzName + ']');
    ctx.write(' ' + model.href);
    ctx.w(' "' + model.title + '"');
};
md.isLineTag = function(model) {
    return ['p', 'br'].indexOf(model.wzElement) > -1;
};

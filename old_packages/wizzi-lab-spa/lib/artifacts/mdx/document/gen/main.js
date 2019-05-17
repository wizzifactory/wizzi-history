/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v2\sources\plugins\wizzi-lab-spa\ittf\lib\artifacts\mdx\document\gen\main.js.ittf
    utc time: Mon, 17 Jul 2017 15:07:32 GMT
*/
'use strict';
var util = require('util');
var wizzi = require('wizzi');
var verify = wizzi.verify;
var utilnode = wizzi.utilnode;
var lineParser = wizzi.lineParser;
var md = module.exports = {};
var myname = 'mdx.document.main';
md.gen = function(model, ctx, callback) {
    // log 'model', util.inspect(model, { depth: 1 })
    this.genItem(model, ctx);
    callback(null, ctx);
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
md.isLineTag = function(model) {
    return ['p', 'br'].indexOf(model.wzElement) > -1;
};

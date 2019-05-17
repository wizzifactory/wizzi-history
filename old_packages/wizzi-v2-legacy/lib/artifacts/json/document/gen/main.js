/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\json\document\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var lineParser = require('../../../../util/lineParser');
var md = module.exports = {};
var myname = 'json.document.main';
md.gen = function(model,ctx,callback) {
    md.genItem(model, ctx);
    callback(null, ctx);
};
md.genItem = function(model,ctx) {
    var n = model.n.trim();
    if (n === '#') {
        return false;
    }
    if (model.childs.length > 0) {
        if (n === '{' || n === '[') {
            ctx.w(n);
            md.genItems(model.childs, ctx, { parent: n });
        }
        else {
            ctx.w('"' + model.n + '":');
            md.genItems(model.childs, ctx, { parent: null });
        }
        if (n === '{') {
            ctx.write('}');
        }
        else if (n === '[') {
            ctx.write(']');
        }
    }
    else {
        if (n === '{') {
            ctx.w('{}');
        }
        else if (n === '[') {
            ctx.w('[]');
        }
        else {
            if (model.parent === '{') {
                if (model.n === '@') {
                    var nv = lineParser.parseNameValueRaw(model.v)
                    ;
                    ctx.write('"' + nv.name() + '": ' + nv.value());
                }
                else {
                    ctx.write('"' + model.n + '": ' + model.v);
                }
            }
            else if (model.parent === '[') {
                if (model.n === '@') {
                    var nv = lineParser.parseNameValueRaw(model.v)
                    ;
                    ctx.write(model.v);
                }
                else {
                    ctx.write(model.n);
                }
            }
            else {
                ctx.write(model.n);
            }
        }
    }
    return true;
};
md.genItems = function(items,ctx,options) {
    ctx.indent();
    var first = true;
    var written = false;
    var i, i_len=items.length, item;
    for (i=0; i<i_len; i++) {
        item = items[i];
        if (!first && written) {
            ctx.w(',');
        }
        first = false;
        if (options.parent) {
            item.parent = options.parent;
        }
        written = md.genItem(item, ctx);
    }
    ctx.w('');
    ctx.deindent();
};

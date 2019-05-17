var util = require('util');
var lineParser = require('../../../../util/lineParser');
var md = module.exports = {};
var myname = 'json.document.main';
md.gen = function (model, ctx, callback) {
    md.genItem(model, ctx);
    callback(null, ctx);
}
md.genItem = function (model, ctx) {
    // console.log('json/document.model' + util.inspect(model, { depth: 2 }));
    var n = model.n.trim();
    if (n === '#') return false;
    if (model.childs.length > 0) {
        if (n === '{' || n === '[') {
            ctx.w(n);
            md.genItems(model, ctx, n);
        } else {
            // must be an object preperty
            ctx.w('"' + model.n + '":');
            md.genItems(model, ctx, null);
        }
        if (n === '{') {
            ctx.write('}');
        } else if (n === '[') {
            ctx.write(']');
        }
    } else {
        if (n === '{') {
            ctx.w('{}');
        } else if (n === '[') {
            ctx.w('[]');
        } else {
            if (model.parent === '{')
                if (model.n === '@') {
                    var nv = lineParser.parseNameValueRaw(model.v)
                    ctx.write('"' + nv.name() + '": ' + nv.value());
                } else {
                    ctx.write('"' + model.n + '": ' + model.v);
                }
            else if (model.parent === '[')
                if (model.n === '@') {
                    var nv = lineParser.parseNameValueRaw(model.v)
                    ctx.write(model.v);
                } else {
                    ctx.write(model.n);
                }
            else
                ctx.write(model.n); // array element
        }
    }
    return true;
}
md.genItems = function (model, ctx, parent) {
    ctx.indent();
    var first = true;
    var written = false;
    model.childs.forEach(function (item) {
        if (!first && written) ctx.w(',');
        first = false;
        if (parent) item.parent = parent;
        written = md.genItem(item, ctx);
    });
    ctx.w('');
    ctx.deindent();
}

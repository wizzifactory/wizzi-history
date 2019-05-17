var util = require('util');
var errors = require('../../../../errors');
var md = module.exports = {};
var myname = 'text.document.main';
md.gen = function (model, ctx, callback) {
    // console.log('text/document.model.nodes' + util.inspect(model.nodes, { depth: 3 }));
    model.childs.forEach(function (item) {
        md.genItem(item, ctx);
    });
    callback(null, ctx);
}
md.genItem = function (model, ctx) {
    ctx.w(model.v);
    ctx.indent();
    model.childs.forEach(function (item) {
        md.genItem(item, ctx);
    });
    ctx.deindent();
}

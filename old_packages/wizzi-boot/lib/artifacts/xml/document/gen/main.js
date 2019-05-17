var toxml = require('./ittf-to-xml');
var md = module.exports = {};
var myname = 'xml.document.main';
md.gen = function (model, ctx) {
    var xml = toxml(model);
    md.element(xml, ctx);
}
md.element = function (node, ctx, callback) {
    console.log('node', node);
    ctx.write('<' + node.tag);
    if (node.attribs.length > 0) {
        node.attribs.forEach(function (item) {
            ctx.write(' ' + item.name + '="');
            ctx.write(item.value); // TODO escape
            ctx.write('"');
        });
    }
    if (node.elements.length > 0) {
        ctx.w('>');
        ctx.indent();
        node.elements.forEach(function (item) {
            md.element(item, ctx);
        });
        ctx.deindent();
        ctx.w('</' + node.tag + '>');
    } else {
        ctx.w(' />');
    }
    callback(null, ctx);
}

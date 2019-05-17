/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\xml\document\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var toxml = require('./ittf_to_xml');
var md = module.exports = {};
var myname = 'xml.document.main';
md.gen = function(model,ctx,callback) {
    var xml = toxml(model);
    md.element(xml, ctx);
    callback(null, ctx);
};
md.genItem = function(model,ctx) {
    ctx.write('<' + model.tag);
    var i, i_len=model.attribs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.attribs[i];
        ctx.write(' ' + item.name + '="');
        ctx.write(item.value);
        ctx.write('"');
    }
    if (model.elements.length > 0) {
        ctx.w('>');
        ctx.indent();
        var i, i_len=model.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.elements[i];
            md.element(item, ctx);
        }
        ctx.deindent();
        ctx.w('</' + model.tag + '>');
    }
    else {
        ctx.w(' />');
    }
};

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\html\document\gen\css_rule.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';

var myname = 'html.document.css_rule';

var rule = require('../../../css/document/gen/rule');

var md = module.exports = {};
md.stm = {};

rule.load(md);

md.genItem = function(model,ctx) {
    var stm = md.stm[model.wzElement];
    if (stm) {
        stm(model, ctx);
    }
    else {
        throw ctx.error(myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model);
    }
};
md.genItems = function(items,ctx,options) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var i, i_len=items.length, item;
    for (i=0; i<i_len; i++) {
        item = items[i];
        md.genItem(item, ctx);
    }
    if (indent) {
        ctx.deindent();
    }
};

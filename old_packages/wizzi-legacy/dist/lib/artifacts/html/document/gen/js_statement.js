/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-html\src\ittf\lib\artifacts\html\document\gen\js_statement.js.ittf
    utc time: Wed, 11 Oct 2017 11:41:46 GMT
*/
'use strict';
var codegen = require('wizzi-legacy-codegen');
var statement = codegen.jsStatement;

var myname = 'html.document.js_statement';

var md = module.exports = {};
md.genItem = function(model, ctx) {
    var stm = md.stm[model.wzElement];
    if (stm) {
        stm(model, ctx);
    }
    else {
        throw ctx.error(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
    }
};
md.genItems = function(items, ctx, options) {
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
md.stm.codeline = function(model, ctx) {
    ctx.w(model.wzName);
    md.genItems(model.items, ctx);
};

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\html\document\gen\js_statement.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';

var myname = 'html.document.js_statement';

var zvar = require('../../../js/module/gen/statements/var');
var objects = require('../../../js/module/gen/statements/objects');
var zfunction = require('../../../js/module/gen/statements/function');
var zclass = require('../../../js/module/gen/statements/class');
var ifswitch = require('../../../js/module/gen/statements/if-switch');
var statements = require('../../../js/module/gen/statements/statements');
var expressions = require('../../../js/module/gen/statements/expressions');
var call = require('../../../js/module/gen/statements/call');
var loops = require('../../../js/module/gen/statements/loops');
var exceptions = require('../../../js/module/gen/statements/exceptions');
var html = require('../../../js/module/gen/statements/html');
var debug = require('../../../js/module/gen/statements/debug');

var md = module.exports = {};
md.stm = {};

zvar.load(md);
objects.load(md);
zfunction.load(md);
zclass.load(md);
ifswitch.load(md);
statements.load(md);
expressions.load(md);
call.load(md);
loops.load(md);
exceptions.load(md);
html.load(md);
debug.load(md);

md.genItem = function(model,ctx) {
    var stm = md.stm[model.wzElement];
    if (stm) {
        stm(model, ctx);
    }
    else {
        throw ctx.error(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
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
md.stm.codeline = function(model,ctx) {
    ctx.w(model.wzName);
    md.genItems(model.items, ctx);
};

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\text\document\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var errors = require('../../../../errors');
var md = module.exports = {};
var myname = 'text.document.main';
md.gen = function(model,ctx,callback) {
    var i, i_len=model.childs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.childs[i];
        md.genItem(item, ctx);
    }
    callback(null, ctx);
};
md.genItem = function(model,ctx) {
    ctx.w(model.v);
    ctx.indent();
    var i, i_len=model.childs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.childs[i];
        md.genItem(item, ctx);
    }
    ctx.deindent();
};

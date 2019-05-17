/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\css\document\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var wizzi = require('../../../../../index');
var verify = wizzi.verify;
var myname = 'css.document.main';
var md = module.exports = {};
md.stm = {};
var rule = require('./rule');
rule.load(md);
md.gen = function(model,ctx,callback) {
    // log 'model', util.inspect(model, { depth: 3 })
    md.genItem(model, ctx);
    callback(null, ctx);
};
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
    for (var i = from; i < items.length; i++) {
        var item = items[i];
        md.genItem(item, ctx);
    }
    if (indent) {
        ctx.deindent();
    }
};
md.stm.css = function(model,ctx) {
    // css is container only
    emitResources(model.resources, ctx);
    md.genItems(model.rules, ctx, { indent:false });
};
function emitResources(requestedResources,ctx) {
    if (requestedResources.length > 0 && ctx.values.cssResources) {
        var resourceRepo = ctx.values.cssResources;
        resourceRepo.clearCssDependencies();
        var i, i_len=requestedResources.length, item;
        for (i=0; i<i_len; i++) {
            item = requestedResources[i];
            resourceRepo.addCssDependency(item.wzName);
        }
        resourceRepo.emitCssDependencies(ctx);
    }
}


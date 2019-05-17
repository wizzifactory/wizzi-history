/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-web\src\ittf\lib\artifacts\css\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var myname = 'css.document.main';
var md = module.exports = {};
md.stm = {};
var rule = require('./rule');
rule.load(md);
md.gen = function(model, ctx, callback) {
    // log 'model', util.inspect(model, { depth: 3 })
    console.log('enter', myname);
    ctx.__comment_level = 0;
    md.getGenItem(ctx)(model, function() {
        console.log('exit', myname);
        callback(null, ctx);
    });
};
md.getGenItem = function(ctx) {
    return function(model, callback) {
            var stm = md.stm[model.wzElement];
            if (stm) {
                stm(model, ctx, function() {
                    callback();
                });
            }
            else {
                // this is an abnormal end
                throw ctx.error(myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model);
            }
        };
};
md.genItems = function(items, ctx, options, callback) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, md.getGenItem(ctx), function() {
        if (indent) {
            ctx.deindent();
        }
        callback();
    });
};
md.stm.css = function(model, ctx, callback) {
    // css is container only
    if (model.charset) {
        ctx.write('@charset "' + model.charset + '";');
    }
    emitResources(model.resources, ctx);
    md.genItems(model.rules, ctx, {
        indent: false
    }, function() {
        callback();
    });
};
function emitResources(requestedResources, ctx) {
    if (requestedResources.length > 0 && ctx.values.cssResources) {
        var resourceRepo = ctx.values.cssResources;
        resourceRepo.clearCssDependencies();
        var i, i_items=requestedResources, i_len=requestedResources.length, item;
        for (i=0; i<i_len; i++) {
            item = requestedResources[i];
            resourceRepo.addCssDependency(item.wzName);
        }
        resourceRepo.emitCssDependencies(ctx);
    }
}

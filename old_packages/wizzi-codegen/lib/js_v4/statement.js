/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\statement.js.ittf
*/
'use strict';

var myname = 'wizzi.codegen.js4.statement';

var zvar = require('./statements/var');
var objects = require('./statements/objects');
var xfunction = require('./statements/function');
var xclass = require('./statements/class');
var ifswitch = require('./statements/if-switch');
var statements = require('./statements/statements');
var expressions = require('./statements/expressions');
var call = require('./statements/call');
var loops = require('./statements/loops');
var exceptions = require('./statements/exceptions');
var wz = require('./statements/wz');
var html = require('./statements/html');
var debug = require('./statements/debug');
var test = require('./statements/test');
var template = require('./statements/template');
var react = require('./statements/react');
var xittf = require('./statements/xittf_extensions');
var graphql = require('./statements/graphql');

var md = module.exports = {};
md.stm = {};

zvar.load(md);
objects.load(md);
xfunction.load(md);
xclass.load(md);
ifswitch.load(md);
statements.load(md);
expressions.load(md);
call.load(md);
loops.load(md);
exceptions.load(md);
wz.load(md);
html.load(md);
debug.load(md);
test.load(md);
template.load(md);
react.load(md);
xittf.load(md);
graphql.load(md);

md.gen = function(model, ctx) {
    md.genItem(model, ctx);
};
md.genItem = function(model, ctx) {
    var key = model.wzElement;
    if (key === 'wzVar') {
        key = 'xvar';
    }
    else if (key === 'wzConst') {
        key = 'xconst';
    }
    else if (key === 'wzFunction') {
        key = 'xfunction';
    }
    var stm = md.stm[key];
    if (stm) {
        stm(model, ctx);
    }
    else {
        console.log(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
        throw ctx.error(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
    }
};
md.genItemAs = function(model, asWzElement, ctx) {
    var save = model.wzElement;
    model.wzElement = asWzElement;
    md.genItem(model, ctx);
    model.wzElement = save;
};
md.genItems = function(statements, ctx, options) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    for (var i = from; i < statements.length; i++) {
        var item = statements[i];
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
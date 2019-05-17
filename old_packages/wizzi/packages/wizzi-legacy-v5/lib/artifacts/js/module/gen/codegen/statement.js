/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\codegen\statement.js.ittf
*/
'use strict';

var myname = 'wizzi.js.artifacts.module.gen.codegen.statement';

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

var include_writers = require('./include_writers');

var u = require('./util/stm');

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

md.gen = function(model, ctx, callback) {
    md.genItem(model, ctx, callback);
};
md.genMany = function(models, ctx, callback) {
    // log 131
    var len_1 = models.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = models[index_1];
        md.genItem(item_1, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            });
        });
    }
    repeater_1(0);
    function next_1() {
        // log 134, 'genMany'
        return callback(null, null);
    }
};
md.genItem = function(model, ctx, callback) {
    var key = model.wzElement;
    if (['styleJsx'].indexOf(key) >= 0 && model.get_css) {
        ctx.w("<style jsx>{`");
        include_writers.writeIncludeCss(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("`}</style>");
            return callback(null, null);
        });
    }
    else {
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
        // log 132, key
        if (stm) {
            // log 133, key
            stm(model, ctx, callback);
        }
        else {
            console.log(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
            throw ctx.error(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
        }
    }
};
md.genItemAs = function(model, asWzElement, ctx, callback) {
    var save = model.wzElement;
    model.wzElement = asWzElement;
    md.genItem(model, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        model.wzElement = save;
        return callback(null, null);
    });
};
md.genItems = function(statements, ctx, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var len_1 = statements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = statements[index_1];
        md.genItem(item_1, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            });
        });
    }
    repeater_1(from);
    function next_1() {
        if (indent) {
            ctx.deindent();
        }
        return callback(null, null);
    }
};
md.stm.codeline = function(model, ctx, callback) {
    // console.log('codeline ', model.wzName);
    if (u.isTopStatement(model)) {
        // _ ctx.w(model.wzName)
        ctx.write(model.wzName);
    }
    else {
        ctx.write(model.wzName);
    }
    md.genItems(model.items, ctx, callback);
};

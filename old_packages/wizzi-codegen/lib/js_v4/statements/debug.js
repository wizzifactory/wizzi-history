/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\debug.js.ittf
*/
'use strict';
var util = require('util');
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi-codegen.js.statements.debug';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.inspect = function(model, ctx) {
        var ss = model.wzName.split(','), name, value;
        if (ss.length == 2) {
            name = u.unquote(ss[0].trim());
            value = ss[1].trim();
        }
        else {
            var nv = lineParser.parseNameValueRaw(ss[0], model);
            if (nv.name() && nv.value()) {
                name = u.unquote(nv.name().trim());
                value = nv.value().trim();
            }
            else {
                name = ss[0];
                value = ss[0];
            }
        }
        ctx.w('console.log("' + name + '" + " " +util.inspect(' + value + ', { depth: null } ))');
    };
    cnt.stm.debug = function(model, ctx) {
        ctx.w('debug(' + model.wzName + ')' + u.semicolon(model.wzName));
    };
    cnt.stm.log = function(model, ctx) {
        ctx.w('console.log(' + model.wzName + ')' + u.semicolon(model.wzName));
    };
    cnt.stm.warn = function(model, ctx) {
        ctx.w('console.warn(' + model.wzName + ')' + u.semicolon(model.wzName));
    };
    cnt.stm.error = function(model, ctx) {
        ctx.w('console.error(' + model.wzName + ')' + u.semicolon(model.wzName));
    };
    cnt.stm.chalk = function(model, ctx) {
        var sw = [];
        var i, i_items=model.wzName.split(','), i_len=model.wzName.split(',').length, item;
        for (i=0; i<i_len; i++) {
            item = model.wzName.split(',')[i];
            var nv = lineParser.parseNameValueRaw(item, model);
            sw.push('chalk.' + nv.name() + '(' + nv.value() + ')');
        }
        ctx.w('console.log(' + sw.join(', ') + ')');
    };
};

/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js\statements\debug.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var util = require('util');
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi.codegen.js.statements.debug';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.inspect = function(model, ctx) {
        ctx.w('console.log("' + model.wzName + '" + " " +util.inspect(' + model.wzName + ', { depth: null } ))');
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
        var nv = lineParser.parseNameValueRaw(model.wzName, model);
        ctx.w('console.log(chalk.' + nv.name() + '(' + nv.value() + '))' + u.semicolon(nv.value()));
    };
};

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\debug.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var u = require('./util');
var lineParser = require('../../../../../util/lineParser');

var myname = 'js.module.statements.debug';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.inspect = function(model,ctx) {
        ctx.w('console.log("' + model.wzName + '" + " " +util.inspect(' + model.wzName + ', { depth: null } ))');
    };
    cnt.stm.debug = function(model,ctx) {
        ctx.w('debug(' + model.wzName + ')' + u.semicolon(model.wzName));
    };
    cnt.stm.log = function(model,ctx) {
        ctx.w('console.log(' + model.wzName + ')' + u.semicolon(model.wzName));
    };
    cnt.stm.warn = function(model,ctx) {
        ctx.w('console.warn(' + model.wzName + ')' + u.semicolon(model.wzName));
    };
    cnt.stm.error = function(model,ctx) {
        ctx.w('console.error(' + model.wzName + ')' + u.semicolon(model.wzName));
    };
    cnt.stm.chalk = function(model,ctx) {
        var nv = lineParser.parseNameValueRaw(model.wzName, model);
        ctx.w('console.log(chalk.' + nv.name() + '(' + nv.value() + '))' + u.semicolon(nv.value()));
    };
};

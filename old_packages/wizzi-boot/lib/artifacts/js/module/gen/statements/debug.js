// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:41 GMT
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

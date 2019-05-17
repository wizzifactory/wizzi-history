/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\wz.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var u = require('../util/stm');
var md = module.exports = {};
var myname = 'wizzi.codegen.js.statements.wz';
md.load = function(cnt) {
    cnt.stm.wzRequire = function(model, ctx) {
        ctx.w('var ' + model.wzName + ' = __.require("' + model.wzName + '");');
    };
    cnt.stm.wzVar = function(model, ctx) {
        cnt.stm.var(model, ctx);
    };
    cnt.stm.wzConst = function(model, ctx) {
        cnt.stm.const(model, ctx);
    };
    cnt.stm.wzFunction = function(model, ctx) {
        cnt.stm.xfunction(model, ctx);
    };
    cnt.stm.wzClass = function(model, ctx) {
        cnt.stm.xclass(model, ctx);
    };
};

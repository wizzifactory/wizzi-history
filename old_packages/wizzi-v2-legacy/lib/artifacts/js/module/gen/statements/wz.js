/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\wz.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var u = require('./util');
var md = module.exports = {};
var myname = 'js.module.statements.wz';
md.load = function(cnt) {
    cnt.stm.wzRequire = function(model,ctx) {
        ctx.w('var ' + model.wzName + ' = __.require("' + model.wzName + '");');
    };
    cnt.stm.wzVar = function(model,ctx) {
        cnt.stm.var(model, ctx);
    };
    cnt.stm.wzConst = function(model,ctx) {
        cnt.stm.const(model, ctx);
    };
    cnt.stm.wzFunction = function(model,ctx) {
        cnt.stm.xfunction(model, ctx);
    };
    cnt.stm.wzClass = function(model,ctx) {
        cnt.stm.xclass(model, ctx);
    };
};

// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:41 GMT
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
    cnt.stm.wzFunction = function(model,ctx) {
        cnt.stm.xfunction(model, ctx);
    };
    cnt.stm.wzClass = function(model,ctx) {
        cnt.stm.xclass(model, ctx);
    };
};

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\template.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var u = require('./util');

var myname = 'js.module.statements.template';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.template = function(model,ctx) {
        ctx.write('`');
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.w('`');
    };
    cnt.stm.macro = function(model,ctx) {
        ctx.write('${');
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.write('}');
    };
};

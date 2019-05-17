/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\kinds\es6\property.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var statement = require('../../statement');
var md = module.exports = {};
var myname = 'js.module.es2015.property';
md.gen = function(model,ctx) {
    var hasChildren = model.statements.length > 0;
    if (hasChildren) {
        if (model.static) {
            ctx.write('static ' + model.wzName + ' = ');
        }
        else {
            ctx.write(model.wzName + ' = ');
        }
        if (hasChildren) {
            ctx.indent();
            model.wzElement = 'jsObject';
            statement.gen(model, ctx);
            model.wzElement = 'p';
            ctx.deindent();
        }
        else {
            ctx.w('');
        }
    }
    else {
        if (model.static) {
            ctx.write('static ' + model.wzName + ';');
        }
        else {
            ctx.write(model.wzName + ';');
        }
    }
    ctx.w('');
};

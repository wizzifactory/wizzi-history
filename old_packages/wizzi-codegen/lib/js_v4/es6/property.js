/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-codegen\src\ittf\lib\js_v4\es6\property.js.ittf
*/
'use strict';
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.codegen.js4.es2015.property';
md.gen = function(model, ctx) {
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

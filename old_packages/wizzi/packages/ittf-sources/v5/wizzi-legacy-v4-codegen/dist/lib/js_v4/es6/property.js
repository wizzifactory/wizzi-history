/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\es6\property.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.codegen.js.es2015.property';
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

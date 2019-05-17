/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\test.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var u = require('./util');
var verify = require('../../../../../util/verify');
var lineParser = require('../../../../../util/lineParser');

var myname = 'js.module.statements.test';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.describe = function(model,ctx) {
        ctx.w('describe("' + escapename(model.wzName) + '", function() {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('});');
    };
    cnt.stm.it = function(model,ctx) {
        ctx.w('it("' + escapename(model.wzName) + '", function() {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('});');
    };
    cnt.stm.itAsync = function(model,ctx) {
        ctx.w('it("' + escapename(model.wzName) + '", function(done) {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        });
        ctx.w('});');
    };
    cnt.stm.before = function(model,ctx) {
        embedFunction('before', ctx, model.statements, cnt);
    };
    cnt.stm.beforeAsync = function(model,ctx) {
        embedFunctionAsync('before', ctx, model.statements, cnt);
    };
    cnt.stm.beforeEach = function(model,ctx) {
        embedFunction('beforeEach', ctx, model.statements, cnt);
    };
    cnt.stm.after = function(model,ctx) {
        embedFunction('after', ctx, model.statements, cnt);
    };
    cnt.stm.afterAsync = function(model,ctx) {
        embedFunctionAsync('after', ctx, model.statements, cnt);
    };
    cnt.stm.afterEach = function(model,ctx) {
        embedFunction('afterEach', ctx, model.statements, cnt);
    };
    function embedFunction(name,ctx,items,cnt) {
        ctx.w((name + '(function() {'));
        cnt.genItems(items, ctx);
        ctx.w('});');
    }
    function embedFunctionAsync(name,ctx,items,cnt) {
        ctx.w(name + '(function(done) {');
        cnt.genItems(items, ctx);
        ctx.w('});');
    }
    function escapename(value) {
        if (verify.isNotEmpty(value)) {
            return verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"')
            ;
        }
        else {
            return value;
        }
    }
};

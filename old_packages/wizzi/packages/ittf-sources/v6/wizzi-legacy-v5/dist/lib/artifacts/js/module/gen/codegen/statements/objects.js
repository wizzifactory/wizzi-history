/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\codegen\statements\objects.js.ittf
*/
'use strict';
var util = require('util');
var node = require('wizzi-utils').node;
var u = require('../util/stm');
var lineParser = require('../util/lineParser');
var jstparser = require('./jsonStatementTree');

var myname = 'wizzi-codegen.js.statements.objects';
var md = module.exports = {};

function hasStatements(model) {
    return model.statements && model.statements.length > 0;
}
md.load = function(cnt) {
    cnt.stm.jsonStatementTree = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsonStatementTree');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsonStatementTree. Got: ' + callback);
        }
        var statements = jstparser.getStatements(model);
        cnt.genItems(statements, ctx, {
            indent: false
        }, function () {
            callback();
        });
    };
    cnt.stm.jsPropertyOrValue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsPropertyOrValue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsPropertyOrValue. Got: ' + callback);
        }
        if (model.__templateChild) {
            ctx.write('${' + (model.wzName || ''));
            cnt.genItems(model.statements, ctx, {
                indent: false
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.write('}');
                return callback(null, null);
            });
        }
        else {
            if (u.hasStatementChildren(model)) {
                jsPropertyOrValue_with_stm_children(model, ctx, callback);
            }
            else {
                jsPropertyOrValue_no_stm_children(model, ctx, callback);
            }
        }
    };
    function jsPropertyOrValue_with_stm_children(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.jsPropertyOrValue_with_stm_children');
        }
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ';
        if (u.parentIsHtmlElement(model)) {
            // Attributes have been already processed
            return callback(null, null);
        }
        else if (model.isDslCall) {
            ctx.write(model.wzName + '(');
            cnt.genItems(model.statements, ctx, {
                indent: true
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                return callback(null, null);
            });
        }
        else if (u.isObjectProperty(model) || u.isParamValue(model) || u.isValue(model)) {
            ctx.write(model.wzName + colon);
            cnt.genItems(model.statements, ctx, {
                indent: false
            }, callback);
        }
        else if (ctx.__ecma === 'es6') {
            ctx.w('@' + model.wzName + '(');
            cnt.genItems(model.statements, ctx, {
                indent: true
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w(')');
                return callback(null, null);
            });
        }
        else {
            throw ctx.error(myname + '. Invalid jsPropertyOrValue: ' + model.wzName, model);
        }
    }
    function jsPropertyOrValue_no_stm_children(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.jsPropertyOrValue_no_stm_children');
        }
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ';
        if (u.isParamValue(model) || u.isValue(model)) {
            ctx.write(model.wzName);
            return callback(null, null);
        }
        else if (u.isObjectProperty(model)) {
            var tk,
                p = lineParser.parseNameValueRaw(model.wzName, model, {
                    objectProperty: true
                });
            if (p.hasValue()) {
                ctx.write(p.name() + colon);
                ctx.write(p.value());
            }
            else {
                if (ctx.__ecma === 'es5') {
                    console.log(ctx.error(myname + '. Invalid object property: ' + model.wzName, model));
                    throw ctx.error(myname + '. Invalid object property: ' + model.wzName, model);
                }
                else {
                    ctx.write(p.name());
                }
            }
            cnt.genItems(model.statements, ctx, {
                indent: false
            }, callback);
        }
        else if (u.parentIsHtmlElement(model)) {
            return callback(null, null);
        }
        else {
            if (ctx.__ecma === 'es6') {
                ctx.w('@' + model.wzName);
            }
            else if (ctx.__artifact === 'xittf/document') {
                ctx.write(model.wzName);
            }
            else {
                throw ctx.error(myname + '. Invalid jsPropertyOrValue: ' + model.wzName, model);
            }
            return callback(null, null);
        }
    }
    cnt.stm.jsObject = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsObject');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsObject. Got: ' + callback);
        }
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ';
        if (model.isDslCall) {
            jsObject_is_dslCall(model, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                jsObject_close(model, ctx, callback);
            });
        }
        else {
            if (model.wzName && model.wzName.length > 0) {
                // is an object property
                ctx.w(model.wzName + colon + '{');
            }
            else {
                if (model.statements.length == 0) {
                    ctx.write('{}');
                    return callback(null, null);
                }
                ctx.w('{');
            }
            ctx.indent();
            if (ctx.__ecma === 'es6') {
                ctx.__is_react_class = true;
            }
            jsObject_close(model, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                if (ctx.__ecma === 'es6') {
                    ctx.__is_react_class = false;
                }
                return callback(null, null);
            });
        }
    };
    function jsObject_is_dslCall(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.jsObject_is_dslCall');
        }
        var first = true,
            comma = true;
        ctx.w(model.wzName + '(');
        ctx.indent();
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (item_1.wzElement == 'namedCallParam') {
                if (comma && !first) {
                    ctx.w(', ');
                }
                first = false;
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
            else {
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            }
        }
        repeater_1(0);
        function next_1() {
            ctx.w('');
            ctx.deindent();
            ctx.w(')');
            ctx.w('{');
            ctx.indent();
            return callback(null, null);
        }
    }
    function jsObject_close(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.jsObject_close');
        }
        var first = true,
            comma = true;
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (model.isDslCall && item_1.wzElement == 'namedCallParam') {
                // skip
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            }
            else {
                if (u.isMemberAccessOrCall(item_1)) {
                    ctx.w('');
                    ctx.deindent();
                    ctx.write('}');
                    cnt.genItem(item_1, ctx, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        var len_2 = model.statements.length;
                        function repeater_2(index_2) {
                            if (index_2 === len_2) {
                                return next_2();
                            }
                            var item_2 = model.statements[index_2];
                            if (u.isCallArgument(item_2)) {
                                ctx.write('.');
                            }
                            cnt.genItem(item_2, ctx, function(err, notUsed) {
                                if (err) {
                                    return callback(err);
                                }
                                process.nextTick(function() {
                                    repeater_2(index_2 + 1);
                                });
                            });
                        }
                        repeater_2(index_1 + 1);
                        function next_2() {
                            return callback(null, null);
                        }
                    });
                }
                if (comma && !first) {
                    ctx.w(', ');
                }
                first = false;
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    comma = item_1.wzElement !== 'comment';
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
        }
        repeater_1(0);
        function next_1() {
            ;
            ctx.w('');
            ctx.deindent();
            ctx.write('}');
            return callback(null, null);
        }
    }
    cnt.stm.jsArray = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsArray');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsArray. Got: ' + callback);
        }
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ';
        // log '600 jsArray'
        if (model.wzName && model.wzName.length > 0) {
            // is an array property
            ctx.w(model.wzName + colon + '[');
        }
        else {
            if (model.statements.length == 0) {
                ctx.write('[' + (model.wzName || '') + ']');
                // log '601 jsArray'
                return callback(null, null);
            }
            ctx.w('[');
        }
        ctx.indent();
        var first = true;
        // log '602 jsArray'
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            // log '607 jsArray'
            if (u.isMemberAccessOrCall(item_1)) {
                ctx.w('');
                ctx.deindent();
                ctx.write(']');
                // log '605 jsArray'
                return cnt.genItem(item_1, ctx, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        // log '603 jsArray'
                        var len_2 = model.statements.length;
                        function repeater_2(index_2) {
                            if (index_2 === len_2) {
                                return next_2();
                            }
                            var item_2 = model.statements[index_2];
                            if (u.isCallArgument(item_2)) {
                                ctx.write('.');
                            }
                            cnt.genItem(item_2, ctx, function(err, notUsed) {
                                if (err) {
                                    return callback(err);
                                }
                                process.nextTick(function() {
                                    repeater_2(index_2 + 1);
                                });
                            });
                        }
                        repeater_2(index_1 + 1);
                        function next_2() {
                            return callback(null, null);
                        }
                    });
            }
            // log '606 jsArray'
            if (!first) {
                ctx.w(', ');
            }
            first = false;
            cnt.genItem(item_1, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                // log '604 jsArray'
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            });
        }
        repeater_1(0);
        function next_1() {
            ;
            ctx.w('');
            ctx.deindent();
            ctx.write(']');
            return callback(null, null);
        }
    };
    cnt.stm.get = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.get');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.get. Got: ' + callback);
        }
        ctx.w('get ' + model.wzName + '() {');
        ctx.indent();
        cnt.genItems(model.statements, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.write('}');
            return callback(null, null);
        });
    };
};

/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\codegen\statements\statements.js.ittf
*/
'use strict';
var util = require('util');
var node = require('wizzi-utils').node;
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi-codegen.js.statements.statements';
var md = module.exports = {};

function hasStatements(model) {
    return model.statements && model.statements.length > 0;
}
md.load = function(cnt) {
    cnt.stm.statement = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.statement');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.statement. Got: ' + callback);
        }
        if (model.__templateChild) {
            ctx.write(model.wzName);
            return callback(null, null);
        }
        else if (ctx.__inside_html == true && ctx.__jskind !== 'react') {
            var text = model.wzName.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push(" + ip.join() + ");");
        }
        else {
            if (u.isTopStatement(model)) {
                ctx.write(model.wzName);
            }
            else {
                ctx.write(model.wzName);
            }
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, callback);
    };
    cnt.stm.statementmultiline = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.statementmultiline');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.statementmultiline. Got: ' + callback);
        }
        if (ctx.__inside_html == true) {
            var text = model.wzName.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push('\\n' + " + ip.join() + ");");
        }
        else {
            ctx.w(model.wzName);
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, callback);
    };
    cnt.stm.require = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.require');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.require. Got: ' + callback);
        }
        var items = model.wzName.split(' ');
        var seenwizzi = false;
        var i, i_items=items, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            if (item === 'wizzi') {
                seenwizzi = true;
                ctx.w("var wizzi = require('wizzi');");
            }
            else if (item === 'log') {
                if (seenwizzi) {
                    ctx.w("var log = wizzi.log(module);");
                }
                else {
                    ctx.w("var log = require('wizzi').log(module);");
                }
            }
            else {
                ctx.w("var " + item + " = require('" + item + "');");
            }
        }
        return callback(null, null);
    };
    cnt.stm.ximport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.ximport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.ximport. Got: ' + callback);
        }
        if (ctx.__ecma === 'es5') {
            var nv = lineParser.parseNameValueRaw(model.wzName, model);
            if (nv.value()) {
                var nv2 = lineParser.parseNameValueRaw(nv.value());
                ctx.w("var " + nv.name() + " = require(" + nv2.value() + ");");
            }
            else {
                ctx.w("var " + nv.name() + " = require('" + nv.name() + "');");
            }
        }
        else {
            ctx.write("import " + ( model.wzName || '' ));
            if (model.specifiers.length > 0) {
                if (model.wzName.length > 0) {
                    ctx.write(', ');
                }
                ctx.write('{');
                var i, i_items=model.specifiers, i_len=model.specifiers.length, item;
                for (i=0; i<i_len; i++) {
                    item = model.specifiers[i];
                    if (i > 0) {
                        ctx.write(', ');
                    }
                    ctx.write(item.wzName);
                }
                ctx.write('}');
                ctx.write(' from ' + model.from);
            }
            else {
                if (model.from && model.from.length > 0) {
                    if (model.wzName.trim().length > 0) {
                        ctx.write(' from');
                    }
                    ctx.write(' ' + model.from);
                }
            }
            ctx.w(u.semicolon(model.wzName));
        }
        return callback(null, null);
    };
    cnt.stm.exportDefault = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.exportDefault');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.exportDefault. Got: ' + callback);
        }
        if (ctx.__ecma === 'es5') {
            // log 'wizzi-codegen.js2.statements.ecma,jskind', ctx.__ecma, ctx.__jskind
            ctx.artifactGenerationError('export statement invalid in ecma 5', 'js/module', model);
            return callback(null, null);
        }
        if (hasStatements(model) == false) {
            ctx.w("export default " + model.wzName + u.semicolon(model.wzName));
            return callback(null, null);
        }
        else {
            ctx.write('export default ');
            return cnt.genItems(model.statements, ctx, {
                    indent: true
                }, callback);
        }
        if (model.__function) {
            cnt.stm.exportfunction(model, ctx, callback);
            return callback(null, null);
        }
        return callback(null, null);
    };
    cnt.stm.xexport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xexport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xexport. Got: ' + callback);
        }
        if (ctx.__ecma === 'es5') {
            // log 'wizzi-codegen.js2.statements.ecma,jskind', ctx.__ecma, ctx.__jskind
            ctx.artifactGenerationError('export statement invalid in ecma 5', 'js/module', model);
            return callback(null, null);
        }
        if (hasStatements(model) == false) {
            ctx.w("export " + model.wzName + u.semicolon(model.wzName));
            return callback(null, null);
        }
        if (model.__function) {
            cnt.stm.exportfunction(model, ctx, callback);
            return callback(null, null);
        }
        ctx.__inside_expr = true;
        ctx.write('export ');
        if (model.wzName && (model.wzName.length > 0)) {
            ctx.write((model.wzName + ' '));
        }
        var indented,
            item = model.statements[0];
        cnt.genItem(item, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            var len_1 = model.statements.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.statements[index_1];
                if (ctx.__needs_comma) {
                    ctx.write(',');
                    ctx.__needs_comma = false;
                }
                if (ctx.__needs_crlf) {
                    ctx.w();
                    ctx.__needs_crlf = false;
                }
                if (index_1 == 1) {
                    ctx.indent();
                    indented = true;
                }
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
            repeater_1(1);
            function next_1() {
                ctx.w(';');
                if (indented) {
                    ctx.deindent();
                }
                ctx.__needs_crlf = ctx.__needs_comma = ctx.__inside_expr = false;
                return callback(null, null);
            }
        });
    };
    cnt.stm.comment = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.comment');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.comment. Got: ' + callback);
        }
        if (hasStatements(model) == false) {
            if (ctx.__inside_comment) {
                ctx.w(model.wzName ? (' ' + model.wzName) : '');
            }
            else {
                ctx.w('//' + (model.wzName ? (' ' + model.wzName) : ''));
            }
            ctx.__needs_crlf = false;
            return callback(null, null);
        }
        // log 'ctx.__inside_comment', ctx.__inside_comment
        var enter_inside_comment = ctx.__inside_comment;
        if (!ctx.__inside_comment) {
            ctx.w('/**');
        }
        ctx.indent();
        if (model.wzName.length > 0) {
            ctx.w(model.wzName);
        }
        ctx.__inside_comment = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.__inside_comment = enter_inside_comment;
            ctx.deindent();
            if (!enter_inside_comment) {
                ctx.w('*/');
            }
            ctx.__needs_crlf = false;
            return callback(null, null);
        });
    };
    cnt.stm.commentmultiline = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.commentmultiline');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.commentmultiline. Got: ' + callback);
        }
        ctx.w('/**');
        ctx.w(('    ' + model.wzName));
        ctx.w('*/');
        return callback(null, null);
    };
    cnt.stm.xdelete = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xdelete');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdelete. Got: ' + callback);
        }
        ctx.w('delete ' + model.wzName);
        return callback(null, null);
    };
    cnt.stm.set = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.set');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.set. Got: ' + callback);
        }
        var text;
        // FIXME this hack require refactoring
        if (model.wzName === 'work.textSep = "__TS__"') {
            text = model.wzName;
        }
        else {
            text = node.inlinedTextToTextLines(model.wzName, {
                singleLine: true
            });
        }
        if (hasStatements(model) == false) {
            if (u.isDeclare(model)) {
                ctx.write(text);
            }
            else {
                ctx.write(text);
                if (u.isTopStatement(model)) {
                    ctx.w(u.semicolon(text));
                }
            }
            return callback(null, null);
        }
        if (model.statements[0].wzEntity === 'function') {
            ctx.w('');
        }
        ctx.write(u.setOperator(text, model.statements));
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (u.isTopStatement(model)) {
                ctx.w(';');
            }
            return callback(null, null);
        });
    };
    cnt.stm.block = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.block');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.block. Got: ' + callback);
        }
        cnt.genItems(model.statements, ctx, callback);
    };
};

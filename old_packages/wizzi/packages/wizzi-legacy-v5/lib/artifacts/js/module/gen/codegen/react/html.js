/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\codegen\react\html.js.ittf
*/
'use strict';
var u = require('../util/stm');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.react.html';
md.htmlelement = function(cnt, model, tag, text, ctx, attrs, callback) {
    // log 'enter in react/html *****************', tag
    if (u.isGraphEnclosed(tag)) {
        ctx.w(tag);
        return callback(null, null);
    }
    // @style/_style is used as an attribute in react
    // see /statements/html for attrs extraction
    if (model.wzElement === '_style') {
        return callback(null, null);
    }
    if (u.parentIsHtmlElement(model) == false) {
        if (u.isArgumentOfCall(model)) {
            ctx.w();
        }
        else {
            ctx.write(' (');
            ctx.w();
        }
    }
    htmlelement_open(cnt, model, ctx, tag, attrs, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        htmlelement_end(cnt, model, ctx, tag, text, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            // log 'exit from react/html *****************', tag
            // @ callback
            return callback(null, null);
        });
    });
};
function htmlelement_open(cnt, model, ctx, tag, attrs, callback) {
    ctx.indent();
    // begin open tag and write attributes
    ctx.write("<" + tag);
    var len_1 = attrs.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = attrs[index_1];
        htmlelement_attribute(cnt, item_1, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            });
        });
    }
    repeater_1(0);
    function next_1() {
        ctx.w(">");
        // end of open tag
        return callback(null, null);
    }
}
function htmlelement_attribute(cnt, a, ctx, callback) {
    if (a.statements && a.statements.length > 0) {
        ctx.write(' ' + a.name + '={');
        cnt.genItems(a.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.write('}');
            return callback(null, null);
        });
    }
    else if (a.value.length || a.value.length == 0) {
        if (a.value.length == 0) {
            ctx.write(' ' + a.name);
        }
        else {
            var quote = a.value.indexOf('{') >= 0 || u.isQuoted(a.value) ? '' : '"';
            ctx.write(' ' + a.name + '=' + quote + a.value + quote);
        }
        return callback(null, null);
    }
    else {
        ctx.write(' ' + a.name + '="' + a.value + '"');
        return callback(null, null);
    }
}
function htmlelement_end(cnt, model, ctx, tag, text, callback) {
    if (text) {
        ctx.w(text);
    }
    cnt.genItems(model.statements, ctx, {
        indent: false
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w("</" + tag + ">");
        ctx.deindent();
        if (u.parentIsHtmlElement(model)) {
            ctx.w();
        }
        else {
            if (u.isArgumentOfCall(model)) {
                // _ ctx.write(')')
            }
            else {
                // _ ctx.w(');') // 7/4/2017
                ctx.w(')');
            }
        }
        return callback(null, null);
    });
}

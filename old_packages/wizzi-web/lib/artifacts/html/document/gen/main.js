/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-web\src\ittf\lib\artifacts\html\document\gen\main.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var util = require('util');
var async = require('async');
var include_writers = require('./include_writers');
var verify = require('../../../util/verify');
var utilNode = require('../../../util/utilNode');
var lineParser = require('../../../util/lineParser');
var myname = 'wizzi-html.htm1.document.main';
var md = module.exports = {};
md.stm = {};
md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(model) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'model', message: 'The model parameter must be an object. Received: ' + model }
        ));
    }
    if (verify.isObject(ctx) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'ctx', message: 'The ctx parameter must be an object. Received: ' + ctx }
        ));
    }
    console.log(myname, 'enter', 'ctx.values', ctx.values);
    // log 'model', util.inspect(model, { depth: 1 })
    md.getGenItem(ctx)(model, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        console.log('exit', myname, 'err', err);
        return callback(null, ctx);
    });
};
md.genItems = function(items, ctx, options, callback) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, md.getGenItem(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        return callback();
    });
};
md.getGenItem = function(ctx) {
    return function(model, callback) {
            if (['_text','_textLF'].indexOf(model.wzElement) >= 0) {
                // model.wzName is a TEXTNODE
                // preserve a blank first char (coded between single hyphens)
                var text = verify.startsWith(model.wzName, "' '") ? '&nbsp;' + model.wzName.substr(3) : model.wzName;
                if (ctx.__iscode || model.wzElement === '_textLF') {
                    ctx.w(text);
                }
                else {
                    ctx.write(text);
                }
                return md.genItems(model.elements, ctx, {
                        indent: false
                    }, callback);
            }
            else if (['_style'].indexOf(model.wzElement) >= 0 && model.get_css) {
                include_writers.writeIncludeCss(ctx, model, callback);
            }
            else if (md.stm[model.wzElement]) {
                console.log('***** known element', model.wzElement);
                md.stm[model.wzElement](model, ctx, function(err, done) {
                    if (err) {
                        return callback(err);
                    }
                    if (done) {
                        // ok, processed
                        return callback();
                    }
                    else {
                        return md.stm.standardElement(model, ctx, callback);
                    }
                });
            }
            else {
                return md.stm.standardElement(model, ctx, callback);
            }
        };
};
md.stm.standardElement = function(model, ctx, callback) {
    // log myname, 'model.wzTag', model.wzTag
    preprocess(model, ctx);
    var voidEl = (model.wzTag in voidElements);
    ctx.write('<' + model.wzTag);
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    if (voidEl) {
        ctx.w(' />');
        postprocess(model, ctx);
        return callback();
    }
    ctx.write('>');
    // check if the element has text line coded as children of the $. ittf command
    var lt = utilNode.lineToText(model.wzName);
    if (lt.text) {
        // preserve a blank first char (coded between single hyphens)
        var text = verify.startsWith(lt.text, "' '") ? '&nbsp;' + lt.text.substr(3) : lt.text;
        ctx.write(text);
    }
    if (lt.lines) {
        ctx.w();
        var saveIndent;
        if (ctx.__ispre) {
            // we are inside a pre element, temporaly reset
            // to 0 the indentation depending from the node depth
            saveIndent = ctx.forceIndent(0);
        }
        else {
            ctx.indent();
        }
        var i, i_items=lt.lines, i_len=lt.lines.length, line;
        for (i=0; i<i_len; i++) {
            line = lt.lines[i];
            ctx.w(line);
        }
        if (ctx.__ispre) {
            // restore indentation
            ctx.forceIndent(saveIndent);
        }
        else {
            ctx.deindent();
        }
    }
    if (model.elements && model.elements.length > 0) {
        if (ctx.__ispre && !ctx.__ispre_started) {
            ctx.w('');
            ctx.__ispre_started = true;
            var saveIndent = ctx.forceIndent(0);
            md.genItems(model.elements, ctx, {
                indent: false
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.forceIndent(saveIndent);
                ctx.__ispre_started = false;
                ctx.w('</' + model.wzTag + '>');
                postprocess(model, ctx);
                return callback();
            });
        }
        else {
            var noinline = inline.indexOf(model.wzTag) < 0;
            if (noinline) {
                ctx.w('');
            }
            md.genItems(model.elements, ctx, {
                indent: noinline
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w('</' + model.wzTag + '>');
                postprocess(model, ctx);
                return callback();
            });
        }
    }
    else {
        ctx.w('</' + model.wzTag + '>');
        postprocess(model, ctx);
        return callback();
    }
};
md.stm.html = function(model, ctx, callback) {
    if (model.doctype) {
        ctx.w('<!doctype ' + model.doctype + '>');
    }
    else {
        ctx.w('<!doctype html>');
    }
    ctx.write('<html');
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if (a.name != 'doctype') {
            if ((a.name in attrsneedsvalue) || a.value && a.value.length > 0) {
                ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
            }
            else {
                ctx.write(' ' + a.name);
            }
        }
    }
    ctx.w('>');
    async.mapSeries(model.elements, md.getGenItem(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w();
        ctx.w('</html>');
        return callback(null, true);
    });
};
md.stm.jsBabel = function(model, ctx, callback) {
    if (model.statements.length === 0) {
        // is link to a js file not a script element
        return callback(null, false);
    }
    ctx.w("<script>");
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        js_statement.gen(item, ctx);
    }
    ctx.w("</script>");
    callback(null, true);
};
md.stm.script = function(model, ctx, callback) {
    // log myname, 'enter script, model.get_js', model.get_js
    ctx.write('<' + model.wzTag);
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    ctx.w('>');
    if (model.get_js) {
        include_writers.writeIncludeJs(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("</script>");
            return callback(null, true);
        });
    }
    else {
        md.genItems(model.elements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("</script>");
            return callback(null, true);
        });
    }
};
md.stm.img = function(model, ctx, callback) {
    console.log('***** known element', model.wzElement, model.get_svg);
    if (model.get_svg) {
        return include_writers.writeIncludeSvg(ctx, model, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                return callback(null, true);
            });
    }
    else {
        return callback(null, false);
    }
};
md.stm.json = function(model, ctx, callback) {
    console.log('***** known element', model.wzElement, model.get_json);
    if (model.get_json) {
        ctx.w('<script type="application/json" id="' + model.wzName + '" >');
        include_writers.writeIncludeJson(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('</script>');
            return callback(null, true);
        });
    }
    else {
        return callback(null, false);
    }
};
md.stm.ready = function(model, ctx, callback) {
    ctx.w("<script>");
    ctx.indent();
    if (model.kind === 'jquery') {
        ctx.w('$(function() {');
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            js_statement.gen(item, ctx);
        }
        ctx.deindent();
        ctx.w('});');
    }
    else {
        ctx.w('window.onload = function() {');
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            js_statement.gen(item, ctx);
        }
        ctx.deindent();
        ctx.w('};');
    }
    ctx.deindent();
    ctx.w("</script>");
    callback(null, true);
};
md.stm.comment = function(model, ctx, callback) {
    if (ctx.__iscode) {
        ctx.w("// " + model.wzName);
    }
    else {
        ctx.w("<!-- " + model.wzName + " -->");
    }
    callback(null, true);
};
function preprocess(model, ctx) {
    if (model.wzTag == '.') {
        model.wzTag = 'div';
        model.class = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == '#') {
        model.wzTag = 'div';
        model.id = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == '<') {
        model.wzTag = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == 'js') {
        model.wzTag = 'script';
        model.src = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag === 'css') {
        model.wzTag = 'link';
        model.href = model.wzName;
        model.rel = 'stylesheet';
        model.wzName = null;
    }
    else if (model.wzTag === '@title') {
        model.wzTag = 'title';
    }
    else if (model.wzTag === '@style') {
        model.wzTag = 'style';
    }
    else if (model.wzTag === 'js-babel') {
        model.wzTag = 'script';
        model.src = model.wzName;
        model.type = 'text/babel';
    }
    if (incode.indexOf(model.wzTag) > -1) {
        ctx.__iscode = true;
    }
    if (['pre'].indexOf(model.wzTag) > -1) {
        ctx.__ispre = true;
    }
}
function postprocess(model, ctx) {
    if (incode.indexOf(model.wzTag) > -1) {
        ctx.__iscode = false;
    }
    if (['pre'].indexOf(model.wzTag) > -1) {
        ctx.__ispre = false;
    }
}
var noattrs = [
    'wzTag', 
    'wzName', 
    'wzElement', 
    'wzParent', 
    'wzSourceLineInfo', 
    '___exportName'
];
function isAttrValue(a, v) {
    if (noattrs.indexOf(a) > -1) {
        return false;
    }
    if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
        return false;
    }
    return true;
}
function getAttrs(e) {
    var retval = [];
    for (var a in e) {
        if (isAttrValue(a, e[a])) {
            retval.push({ name: verify.replaceAll(a, '_', '-'), value: e[a] });
        }
        else if (a.substr(0, 3) === 'ng-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'data-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'aria-') {
            retval.push({ name: a, value: e[a] });
        }
    }
    if (e.attributes) {
        var i, i_items=e.attributes, i_len=e.attributes.length, a;
        for (i=0; i<i_len; i++) {
            a = e.attributes[i];
            var p = lineParser.parseNameValueRaw(a.wzName, a);
            if (p.hasValue()) {
                retval.push({ name: p.name(), value: p.value() });
            }
            else {
                retval.push({ name: p.name() });
            }
        }
    }
    return retval;
}
var inline = [
    'a', 
    'img', 
    'input', 
    'li', 
    'textarea'
];
var incode = [
    'js', 
    'css', 
    'script', 
    'style', 
    'ready'
];
var attrsneedsvalue = {
    __proto__: null
};
var voidElements = {
    __proto__: null, 
    area: true, 
    base: true, 
    basefont: true, 
    br: true, 
    col: true, 
    command: true, 
    embed: true, 
    frame: true, 
    hr: true, 
    img: true, 
    input: true, 
    isindex: true, 
    keygen: true, 
    link: true, 
    meta: true, 
    param: true, 
    source: true, 
    track: true, 
    wbr: true, 
    // common self closing svg elements
    path: true, 
    circle: true, 
    ellipse: true, 
    line: true, 
    rect: true, 
    use: true, 
    stop: true, 
    polyline: true, 
    polygone: true
};
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}

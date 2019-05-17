/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\util\stm.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var verify = require('./verify');
var md = module.exports = {};
// parents of top statements
var parents_of_top_statements = [
    'xfunction', 
    'arrowfunction', 
    'generatorfunction', 
    'ctor', 
    'method', 
    'module', 
    'ready', 
    'html_f', 
    'html_dom', 
    'html_hb', 
    'block', 
    'xfor', 
    'foreach', 
    'xwhile', 
    'xdo', 
    'xif', 
    'xelse', 
    'elif', 
    'xtry', 
    'xfinally', 
    'xcatch', 
    'xcase', 
    'xdefault', 
    'describe', 
    'iife', 
    'it', 
    'before', 
    'itAsync', 
    'beforeAsync', 
    'afterAsync', 
    'beforeEach', 
    'after', 
    'afterEach', 
    'xlabel', 
    'wzIife', 
    'wzFunction', 
    'render', 
    'willMount', 
    'didMount', 
    'willUnmount', 
    'shouldUpdate', 
    'didUpdate', 
    'willUpdate', 
    'willReceiveProps', 
    '_js', 
    '_css'
];
md.isDescendentOf = function(model, ancestor) {
    if (!model.wzParent) {
        return false;
    }
    if (model.wzParent.wzElement == ancestor) {
        return true;
    }
    return md.isDescendentOf(model.wzParent, ancestor)
    ;
};
md.isTopStatement = function(model) {
    if (!model.wzParent) {
        return true;
    }
    var prnElement = model.wzParent.wzElement;
    return parents_of_top_statements.indexOf(prnElement) > - 1;
};
md.isDeclare = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['xvar'].indexOf(model.wzParent.wzElement) > -1;
};
md.isObjectProperty = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['jsObject', 'state'].indexOf(model.wzParent.wzElement) > -1;
};
md.isMemberAccess = function(model) {
    if (['memberAccess', 'memberAccessComputed', 'memberCall', 'decoratorCall', 'callOnValue'].indexOf(model.wzElement) > -1) {
        return true;
    }
};
md.isMemberAccessOrCall = function(model) {
    if (['memberAccess', 'memberAccessComputed', 'memberCall', 'decoratorCall', 'callOnValue'].indexOf(model.wzElement) > -1) {
        return true;
    }
    if (!model.wzParent) {
        return false;
    }
    if (model.wzElement === 'call' && model.wzParent.wzElement === 'call') {
        return true;
    }
    return false;
};
md.isCallArgument = function(model) {
    return model.wzElement === 'call' && model.wzParent && model.wzParent.wzElement === 'call';
};
md.isArgumentOfCall = function(model) {
    return model.wzParent && ['call', 'memberCall', 'decoratorCall', 'callOnValue'].indexOf(model.wzParent.wzElement) > -1;
};
md.onlyChildIs = function(model, element) {
    return model.statements && model.statements.length == 1 && model.statements[0].wzElement === element;
};
md.hasStatementChildren = function(model) {
    if (model.statements && model.statements.length > 0) {
        var i, i_len=model.statements.length, stm;
        for (i=0; i<i_len; i++) {
            stm = model.statements[i];
            if (stm.wzElement != 'comment') {
                return true;
            }
        }
    }
    return false;
};
md.parentIs = function(model, element) {
    return model.wzParent && model.wzParent.wzElement === element;
};
md.parentIsHtmlElement = function(model) {
    if (! (model.wzParent)) {
        return false;
    }
    return ['htmlelement', 'a', 'br', 'button', 'div', 'form', 'h1', 'h2', 'h3', 'h4', 'i', 'img', 'input', 'label', 'legend', 'li', 'option', 'p', 'select', 'span', 'table', 'tbody', 'td', 'textarea', 'th', 'thead', 'tr', 'ul'].indexOf(model.wzParent.wzElement) > - (1);
};
md.isValue = function(model) {
    if (! (model.wzParent)) {
        return false;
    }
    return ['jsArray', 'jsPropertyOrValue', 'memberAccessComputed', 'or', 'and'].indexOf(model.wzParent.wzElement) > -1;
};
md.isParamValue = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['call', 'memberCall', 'decoratorCall', 'callOnValue', 'iife', 'xnew', 'arrayOf'].indexOf(model.wzParent.wzElement) > -1;
};
md.semicolon = function(text) {
    return verify.endsWith(text, ';') ? '' : ';';
};
md.unparen = function(text) {
    if (verify.isEmpty(text)) {
        return text;
    }
    var s = text.trim();
    return md.isParenEnclosed(s) ? s.substr(1, s.length - 2) : text;
};
md.setOperator = function(text, statements) {
    if (verify.isEmpty(text)) {
        return '';
    }
    text = text.trim();
    if (statements.length === 1 && statements[0].wzElement === 'memberAccessComputed') {
        return text + '';
    }
    var t1 = text.substr(-1, 1);
    var t2 = text.substr(-2, 2);
    if (op1.indexOf(t1) > -1) {
        return text + ' ';
    }
    if (op2.indexOf(t2) > -1) {
        return text + ' ';
    }
    return text + ' = ';
};
md.encloseParen = function(text) {
    var s = text.trim();
    if (md.isParenEnclosed(s) === false) {
        if (s.substr(0, 1) !== '(') {
            s = '(' + s;
        }
        if (s.substr(-1, 1) !== ')' && s.substr(-2, 2) !== ');') {
            s = s + ')';
        }
        return s;
    }
    else {
        return text;
    }
};
md.isGraphEnclosed = function(text) {
    if (verify.isEmpty(text)) {
        return false;
    }
    text = text.trim();
    return text.substr(0, 1) === '{' && text.substr(-1, 1) === '}';
};
md.isParenEnclosed = function(text) {
    if (verify.isEmpty(text)) {
        return false;
    }
    text = text.trim();
    var hasEndParens = text.substr(-1, 1) === ')' || text.substr(-2, 2) === ');';
    if (!hasEndParens || text.substr(0, 1) !== '(') {
        return false;
    }
    var count = 1,
        quote = null;
    for (var ch, i = 1; i < text.length; i++) {
        ch = text[i];
        if (ch === '"' || ch === "'") {
            if (quote === ch) {
                quote = null;
            }
            else if (quote === null) {
                quote = ch;
            }
        }
        else if (quote !== null) {
            ;
        }
        else if (ch === '(') {
            count++;
        }
        else if (ch === ')') {
            count--;
        }
        if (i < (text.length - 1) && count === 0) {
            return false;
        }
    }
    return true;
};
md.isQuoted = function(text) {
    if (verify.isEmpty(text) || text.length < 2) {
        return false;
    }
    return (text.substr(0, 1) === '"' && text.substr(-1, 1) === '"') || (text.substr(0, 1) === '\'' && text.substr(-1, 1) === '\'');
};
md.unquote = function(text) {
    if (verify.isEmpty(text) || text.length < 2) {
        return text;
    }
    if (md.isQuoted(text)) {
        return text.substr(1, text.length-2);
    }
    else {
        return text;
    }
};
var op1 = [
    '='
];
var op2 = [
    '+=', 
    '-=', 
    '/=', 
    '*='
];
var parenOp = [
    '||', 
    '>>>', 
    '>>'
];
md.getOpenParen = function(oper) {
    return parenOp.indexOf(oper) > -1 ? '(' : '';
};
md.getCloseParen = function(oper) {
    return parenOp.indexOf(oper) > -1 ? ')' : '';
};
md.getParentOfType = function(model, type) {
    var prn = model.wzParent;
    while (prn != null && prn.wzElement !== type) {
        prn = prn.wzParent;
    }
    return prn;
};
md.hasArguments = function(callText) {
    if (typeof(callText) !== 'string') {
        return false;
    }
    callText = callText.trim();
    var hasEndParens = ((callText.substr(- (1), 1) === ')') || (callText.substr(- (2), 2) === ');'));
    if (!hasEndParens) {
        return false;
    }
    var namecount = 0;
    var enclosedcount = 0;
    var seen = false;
    var count = 0,
        quote = null;
    for (var ch, i = 0; i < callText.length; i++) {
        ch = callText[i];
        if ((ch === '"') || (ch === "'")) {
            if (quote === ch) {
                quote = null;
            }
            else if (quote === null) {
                quote = ch;
            }
        }
        else if (quote !== null) {
            ;
        }
        else if (ch === '(') {
            seen = true;
            count++;
        }
        else if (ch === ')') {
            count--;
            if (count === 0) {
                enclosedcount++;
            }
        }
        else if (! (seen)) {
            namecount++;
        }
    }
    return seen && (namecount > 0 || enclosedcount > 1) && count == 0;
};
md.emitBlock = function(cnt, tag, model, items, count, ctx) {
    var blockIndex = items.length > 0 && items[0].wzElement === 'test' ? 1 : 0;
    if (ctx.values.__preserveBlock) {
        if (count > blockIndex && items[blockIndex].wzElement === 'block') {
            if (tag === 'case') {
                ctx.w(tag + ' ' + model.wzName + ': {');
            }
            else if (tag === 'else') {
                ctx.w(tag + ' {');
            }
            else {
                md.emitTest(cnt, tag, model, items, ctx, ' {');
            }
        }
        else {
            if (tag === 'case') {
                ctx.w(tag + ' ' + model.wzName + ':');
            }
            else if (tag === 'else') {
                ctx.w(tag);
            }
            else {
                md.emitTest(cnt, tag, model, items, ctx, '');
            }
        }
    }
    else {
        if (tag === 'case') {
            ctx.w(tag + ' ' + model.wzName + ': {');
        }
        else if (tag === 'else') {
            ctx.w(tag + ' {');
        }
        else {
            md.emitTest(cnt, tag, model, items, ctx, ' {');
        }
    }
    if (items.length > 0 && items[0].wzElement === 'test') {
        cnt.genItems(items, ctx, {
            indent: true, 
            from: 1
        });
    }
    else {
        cnt.genItems(items, ctx, {
            indent: true
        });
    }
    if (ctx.values.__preserveBlock) {
        if (count > blockIndex && items[blockIndex].wzElement === 'block') {
            ctx.w('}');
        }
    }
    else {
        ctx.w('}');
    }
};
md.emitTest = function(cnt, tag, model, items, ctx, open) {
    if (items.length > 0 && items[0].wzElement === 'test') {
        ctx.write(tag + ' ');
        cnt.genItem(items[0], ctx);
        ctx.w(open);
    }
    else {
        ctx.w(tag + ' (' + md.unparen(model.wzName) + ')' + open);
    }
};

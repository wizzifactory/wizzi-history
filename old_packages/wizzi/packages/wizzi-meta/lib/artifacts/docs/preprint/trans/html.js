/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\lib\artifacts\docs\preprint\trans\html.js.ittf
*/
'use strict';
var util = require('util');
// var verify = require('../../../../util/verify')
// var lineparser = require('../../../../util/lineparser')
var verify = require('wizzi-utils').verify;
var errors = require('../../../../errors');
var HtmlBuilder = require('./htmlbuilder').HtmlBuilder;
var md = module.exports = {};
var myname = 'docs.preprint.html';
var STYLE_DOCS_ITTF_TREE_PANEL = 'docs-ittf-tree-panel';
var STYLE_DOCS_ITTF_TREE_LINE = 'docs-ittf-tree-line';
var STYLE_DOCS_ITTF_NODE_LINENUMS = 'docs-ittf-node-linenums';
var STYLE_DOCS_ITTF_NODE_INDENT = 'docs-ittf-node-indent-';
var STYLE_DOCS_ITTF_NODE_NAME = 'docs-ittf-node-name';
var STYLE_DOCS_ITTF_NODE_VALUE = 'docs-ittf-node-value';
// pretty print
var STYLE_DOCS_ITTF_TREE_PANEL = 'linenums';
var STYLE_DOCS_ITTF_TREE_LINE = 'docs-ittf-tree-line';
var STYLE_DOCS_ITTF_NODE_LINENUMS = 'docs-ittf-node-linenums';
var STYLE_DOCS_ITTF_NODE_INDENT = 'docs-ittf-node-indent-';
var STYLE_DOCS_ITTF_NODE_COMMAND = 'pp-kwd';
var STYLE_DOCS_ITTF_NODE_NAME = 'pp-tag';
var STYLE_DOCS_ITTF_NODE_VALUE = 'pp-pln';
var STYLE_DOCS_ITTF_NODE_EXPR = 'pp-expr';
var STYLE_DOCS_ITTF_NODE_MIX = 'pp-mix';
var TAB_SPACES = 2;
md.toHtmlLines = function(models, ctx) {
    ctx.hb = new HtmlBuilder();
    md.goItems(models, ctx);
    // log myname + '.toText', ctx.hb.toText()
    return ctx.hb.toLines();
};
md.toHtmlJsCodeLines = function(model, ctx, parent) {
    ctx.__lang = 'js';
    ctx.hb = new HtmlBuilder(true);
    ctx.hb.openTag('pre');
    ctx.hb.writeAttribute('class', 'prettyprint-js');
    ctx.hb.openTag('ol');
    ctx.hb.writeAttribute('class', 'linenums');
    md.goItem(model, ctx);
    ctx.hb.closeTag('ol');
    ctx.hb.closeTag('pre');
    return ctx.hb.toLines();
};
md.toHtmlCodeLines = function(model, ctx) {
    ctx.hb = new HtmlBuilder(true);
    ctx.hb.openTag('pre');
    ctx.hb.writeAttribute('class', 'prettyprint');
    ctx.hb.openTag('ol');
    ctx.hb.writeAttribute('class', 'linenums');
    md.goItem(model, ctx);
    ctx.hb.closeTag('ol');
    ctx.hb.closeTag('pre');
    // log myname + '.toText', ctx.hb.toText()
    return ctx.hb.toLines();
};
md.goItem = function(model, ctx, parent) {
    var oper = md[model.wzElement];
    if (oper) {
        oper(model, ctx);
    }
    else {
        throw new errors.NodeError(myname + '.goItem. Unknown wzElement: ' + model.wzTag + '/' + model.wzElement, model);
    }
};
md.goItems = function(items, ctx, options) {
    options = options || {};
    options.from = options.from || 0;
    for (var i = options.from; i < items.length; i++) {
        var item = items[i];
        md.goItem(item, ctx);
    }
};
md.element = function(model, ctx, parent) {
    var nv = verify.parseNameValue(model.wzName);
    var tag = nv.name();
    model.wzName = nv.value();
    stdElement(tag, model, ctx);
};
md.h1 = function(model, ctx, parent) {
    stdElement_heading('h1', model, ctx);
};
md.h2 = function(model, ctx, parent) {
    stdElement_heading('h2', model, ctx);
};
md.h3 = function(model, ctx, parent) {
    stdElement_heading('h3', model, ctx);
};
md.h4 = function(model, ctx, parent) {
    stdElement_heading('h4', model, ctx);
};
md.h5 = function(model, ctx, parent) {
    stdElement_heading('h5', model, ctx);
};
md.h6 = function(model, ctx, parent) {
    stdElement_heading('h6', model, ctx);
};
md.ul = function(model, ctx, parent) {
    if (model.wzName.length > 0) {
        ctx.hb.openTag('h4');
        ctx.hb.writeText(model.wzName);
        ctx.hb.closeTag('h4');
    }
    ctx.hb.openTag('ul');
    setAttributes(model, ctx);
    md.goItems(model.items, ctx);
    ctx.hb.closeTag('ul');
};
md.li = function(model, ctx, parent) {
    stdElement('li', model, ctx);
};
md.a = function(model, ctx, parent) {
    stdElement('a', model, ctx);
};
md.div = function(model, ctx, parent) {
    stdElement('div', model, ctx);
};
md.p = function(model, ctx, parent) {
    stdElement('p', model, ctx);
};
md.span = function(model, ctx, parent) {
    stdElement('span', model, ctx);
};
md.br = function(model, ctx, parent) {
    ctx.hb.openTag('br');
    if (model.wzName.length > 0 || model.items.length) {
        ctx.hb.openTag('span');
        ctx.hb.writeText(model.wzName);
        md.goItems(model.items, ctx);
        ctx.hb.closeTag('span');
    }
};
md.see = function(model, ctx, parent) {
    ctx.hb.openTag('p');
    ctx.hb.openTag('a');
    ctx.hb.writeAttribute('href', model.href);
    ctx.hb.writeText('see ' + model.wzName);
    md.goItems(model.items, ctx);
    ctx.hb.closeTag('a');
    ctx.hb.closeTag('p');
};
md.table = function(model, ctx, parent) {
    ctx.hb.openTag('table');
    setAttributes(model, ctx);
    md.goItems(model.items, ctx);
    ctx.hb.closeTag('table');
};
md.tbody = function(model, ctx, parent) {
    stdElement('tbody', model, ctx);
};
md.tr = function(model, ctx, parent) {
    ctx.hb.openTag('tr');
    setAttributes(model, ctx);
    md.goItems(model.items, ctx);
    ctx.hb.closeTag('tr');
};
md.th = function(model, ctx, parent) {
    stdElement('th', model, ctx);
};
md.td = function(model, ctx, parent) {
    stdElement('td', model, ctx);
};
md.plus = function(model, ctx, parent) {
    ctx.hb.writeText(' ' + model.wzName);
};
md.js = function(model, ctx, parent) {
    var js_ctx = {};
    js_ctx.__ittfNode = {
        level: 0, 
        line: 0
    };
    js_ctx.__lang = 'js';
    js_ctx.hb = new HtmlBuilder(true);
    js_ctx.hb.openTag('pre');
    js_ctx.hb.writeAttribute('class', 'prettyprint-js');
    js_ctx.hb.openTag('ol');
    js_ctx.hb.writeAttribute('class', 'linenums');
    md.goItems(model.items, js_ctx);
    js_ctx.hb.closeTag('ol');
    js_ctx.hb.closeTag('pre');
    var lines = js_ctx.hb.toLines();
    ctx.hb.writeText(lines[0]);
};
md.ittf = function(model, ctx, parent) {
    if (model.items.length == 1) {
        var ittf_ctx = {};
        ittf_ctx.__ittfNode = {
            level: 0, 
            line: 0
        };
        var lines = md.toHtmlCodeLines(model.items[0], ittf_ctx);
        ctx.hb.writeText(lines[0]);
    }
    else {
        throw new errors.NodeError(myname + '.ittf. ittf node must have one child element', model);
    }
};
md.ittfnode = function(model, ctx, parent) {
    if (!ctx.__ittfNode) {
        throw new errors.NodeError(myname + '.ittf. ittf node called without before calling ittf', model);
    }
    if (ctx.__lang === 'js') {
        md.ittfnode_js(model, ctx);
    }
    else {
        md.ittfnode_ittf(model, ctx);
    }
};
md.ittfnode_js = function(model, ctx, parent) {
    ctx.__ittfNode.line++;
    ctx.hb.openTag('li');
    ctx.hb.writeAttribute('class', 'J' + ('' + ctx.__ittfNode.line).substr(-1,1));
    ctx.hb.writeText(spaces(ctx.__ittfNode.level * TAB_SPACES) + verify.htmlEscape(model.wzName) + '\n');
    ctx.hb.closeTag('li');
    ctx.__ittfNode.level++;
    md.goItems(model.items, ctx);
    ctx.__ittfNode.level--;
};
md.ittfnode_ittf = function(model, ctx, parent) {
    ctx.__ittfNode.line++;
    var nv = verify.parseNameValue(model.wzName),
        name = nv.name(),
        is_command = name && name.substr(0,1) === '$',
        is_code = name === '$' || name === '$global',
        name_style = STYLE_DOCS_ITTF_NODE_NAME,
        value_style = STYLE_DOCS_ITTF_NODE_VALUE;
    if (['$if', '$elif', '$'].indexOf(name) >= 0) {
        value_style = STYLE_DOCS_ITTF_NODE_EXPR;
    }
    else if (ctx.__insideCode) {
        name_style = STYLE_DOCS_ITTF_NODE_EXPR;
        value_style = STYLE_DOCS_ITTF_NODE_EXPR;
    }
    else if (name && name.substr(-1,1) === '(') {
        name_style = STYLE_DOCS_ITTF_NODE_MIX;
    }
    ctx.hb.openTag('li');
    ctx.hb.writeAttribute('class', 'L' + ('' + ctx.__ittfNode.line).substr(-1,1));
    ctx.hb.openTag('span', { inline: true });
    ctx.hb.writeAttribute('class', 'pnl');
    ctx.hb.writeText(spaces(ctx.__ittfNode.level * TAB_SPACES));
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.openTag('span', { inline: true });
    if (is_command) {
        ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_COMMAND);
    }
    else {
        ctx.hb.writeAttribute('class', name_style);
    }
    ctx.hb.writeText(nv.name());
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.openTag('span', { inline: true });
    ctx.hb.writeAttribute('class', value_style);
    ctx.hb.writeText(' ' + verify.htmlEscape(nv.value()));
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.closeTag('li');
    if (is_code) {
        ctx.__insideCode = true;
    }
    ctx.__ittfNode.level++;
    md.goItems(model.items, ctx);
    ctx.__ittfNode.level--;
    if (is_code) {
        ctx.__insideCode = false;
    }
};
function formatLineNum(line) {
    if (line < 10) {
        return '00' + line;
    }
    if (line < 100) {
        return '0' + line;
    }
    return line;
}
function spaces(num) {
    return Array(num + 1).join(" ");
}
function stdElement(tag, model, ctx) {
    ctx.hb.openTag(tag);
    setAttributes(model, ctx);
    ctx.hb.writeText(model.wzName);
    md.goItems(model.items, ctx);
    ctx.hb.closeTag(tag);
}
function stdElement_heading(tag, model, ctx) {
    ctx.hb.openTag(tag);
    setAttributes(model, ctx);
    ctx.hb.writeText(model.wzName);
    ctx.hb.closeTag(tag);
    md.goItems(model.items, ctx);
}
function setAttributes(model, ctx) {
    if (model.id) {
        ctx.hb.writeAttribute('id', model.id);
    }
    if (model.class) {
        ctx.hb.writeAttribute('class', model.class);
    }
    if (model.style) {
        ctx.hb.writeAttribute('style', model.style);
    }
    if (model.href) {
        ctx.hb.writeAttribute('href', model.href);
    }
    var i, i_items=model.attributes, i_len=model.attributes.length, a;
    for (i=0; i<i_len; i++) {
        a = model.attributes[i];
        var nv = verify.parseNameValue(a.wzName);
        ctx.hb.writeAttribute(nv.name(), nv.value());
    }
}

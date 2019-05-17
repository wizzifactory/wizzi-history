/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\lib\loader\mtreebuildupscripter.js.ittf
*/
'use strict';
/** -àà
     from a composed-MTree
     write the jsWizziScript that will
     buildup an evaluated mTree.
    
     The script will be executed
     by the JsWizziRunner.
*/
var verify = require('wizzi-utils').verify;
var interpolate = require('./ittfInterpolate');
function codify(node, nparent, jsScriptCoder, ctx) {
    var nnode = ++ctx.counter,
        closeBlock = null;
    var tag = node.name;
    if (tag == '$' || tag == '$+') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        codeBlock(node, jsScriptCoder, ctx);
    }
    else if (tag == '$global') {
        setJsWizziContext(ctx, 'global', jsScriptCoder, node.model.brickKey);
        codeBlock(node, jsScriptCoder, ctx);
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
    }
    else if (tag == '$.') {
        setJsWizziContext(ctx, null, jsScriptCoder);
        var vparent = ('$' + nparent);
        var value = codifyValue(node.model.brickKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro, ctx);
        jsScriptCoder.w(vparent + ".v = " + vparent + ".v ? " + vparent + ".v : ''" + ' //' + node.id);
        jsScriptCoder.w(vparent + '.v += ($.textSep + ' + value + ');' + ' //' + node.id);
    }
    else if (tag == '$if') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        jsScriptCoder.if(node.value, node);
        closeBlock = '}';
    }
    else if (tag == '$else') {
        jsScriptCoder.else(node);
        ctx.brickKey = -1;
        closeBlock = '}';
    }
    else if (tag == '$elif') {
        jsScriptCoder.elif(node.value, node);
        ctx.brickKey = - (1);
        closeBlock = '}';
    }
    else if (tag == '$while') {
        jsScriptCoder.while(node.value, node);
        ctx.brickKey = - (1);
        closeBlock = '}';
    }
    else if (tag == '$for') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        jsScriptCoder.for(node.value, node);
        closeBlock = '}';
    }
    else if (tag == '$for_stop') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var items = node.value.split(' ');
        var namevalue = items[0].split(',');
        var name = namevalue[0];
        var value = namevalue[1];
        jsScriptCoder.w('var ' + name + ', ' + value + ';' + ' //' + node.id);
        jsScriptCoder.for(name + ' in ' + items[2] + ' //' + node.id, node);
        jsScriptCoder.w(value + ' = ' + items[2] + '[' + name + '];' + ' //' + node.id);
        closeBlock = '}';
    }
    else if (tag == '$foreach') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var items = node.value.split(' ');
        // items = [item, in, coll]
        // TODO if items.length != 3 -> malformed
        // TODO if items[1] !== 'in' -> malformed
        jsScriptCoder.w('var ' + items[0] + '_count = ' + items[2] + '.length;' + ' //' + node.id);
        jsScriptCoder.for('var i' + nnode + '=0; i' + nnode + '<' + items[0] + '_count; i' + nnode + '++', node);
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + ' //' + node.id);
        jsScriptCoder.w('var ' + items[0] + '_index = i' + nnode + ';' + ' //' + node.id);
        closeBlock = '}';
    }
    else if (tag == '$backeach') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var items = node.value.split(' ');
        jsScriptCoder.w('var ' + items[0] + '_count = ' + items[2] + '.length;' + ' //' + node.id);
        jsScriptCoder.for('var i' + nnode + '=' + items[0] + '_count-1; i' + nnode + '>-1; i' + nnode + '--', node);
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + ' //' + node.id);
        jsScriptCoder.w('var ' + items[0] + '_index = i' + nnode + ';' + ' //' + node.id);
        closeBlock = '}';
    }
    else if (tag == '$virtual') {
        ;
    }
    else if (tag == '$function') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var params = '$parent';
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.name === '$param') {
                params += ',' + item.value;
            }
        }
        jsScriptCoder.w('function ' + node.value + '(' + params + ') {');
        jsScriptCoder.indent();
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.name !== '$param') {
                codify(item, 'parent', jsScriptCoder, ctx);
            }
        }
        jsScriptCoder.deindent();
        jsScriptCoder.w('}');
        ctx.brickKey = -1;
        return ;
    }
    else if (tag == '$_') {
        ctx.brickKey = null;
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var vparent = '$' + nparent;
        var args = vparent;
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.name === '$@') {
                args += ',' + item.value;
            }
        }
        jsScriptCoder.w(node.value + '(' + args + ');');
        ctx.brickKey = null;
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        return ;
    }
    else {
        if (ctx.isCompile && node.__firstOfMixedNodes) {
            jsScriptCoder.w('// firstOfMixed ' + node.model.$args + '/' + node.model.$params);
            isCompilePassedParameters(jsScriptCoder, node.model.calcParamValues(node.model.$args));
        }
        setJsWizziContext(ctx, null, jsScriptCoder);
        jsScriptCoder.w('var $' + nnode + ' = { ' + 'n: ' + codifyValue(node.model.brickKey, tag, 'string', jsScriptCoder.length + 1, node.hasMacro, ctx) + ', ' + (node.source ? 'source: ' + escapename(node.source) + ', ' : '') + 'v: ' + codifyValue(node.model.brickKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro, ctx) + ', ' + 'r: ' + node.row + ', ' + 'c: ' + node.col + ', ' + 's: "' + node.model.brickKey + '", ' + 'u: "' + node.sourceKey + '", ' + ' };' + ' //' + node.id);
        var vparent = ('$' + nparent);
        jsScriptCoder.w('$.a(' + vparent + ', $' + nnode + ', ' + (jsScriptCoder.length + 1) + ');');
        nparent = nnode;
    }
    if (tag !== '$' && tag !== '$global' && tag !== '$+') {
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            codify(item, nparent, jsScriptCoder, ctx);
        }
        if (closeBlock) {
            jsScriptCoder.end();
            ctx.brickKey = -1;
        }
    }
}
function setJsWizziContext(ctx, brickKey, jsScriptCoder, brickKeyInGlobal) {
    if (ctx.brickKey === brickKey) {
        return ;
    }
    if (brickKey === null) {
        jsScriptCoder.w('$.n();');
    }
    else if (brickKey === 'global') {
        jsScriptCoder.w('$.g("' + brickKeyInGlobal + '");');
    }
    else {
        jsScriptCoder.w('$.s("' + brickKey + '");');
    }
    ctx.brickKey = brickKey;
}
function codifyValue(brickKey, value, type, line, hasMacro, ctx) {
    if (typeof(value) === 'undefined' || value == null) {
        return '""';
    }
    if (type === 'string') {
        if (value.indexOf('${') > -1) {
            var sHasMacro = hasMacro ? 'true' : 'false';
            if (ctx.isCompile) {
                var newValue = interpolate(value, {}, {
                    isCompile: true
                });
                // return '"' + newValue + '"'
                return newValue;
            }
            else {
                return '$.ip("' + brickKey + '", ' + escape(value) + ', "' + type + '", ' + line + ', ' + sHasMacro + ')';
            }
        }
        // 23/5/18 return escape(hasMacro ? remacro(value) : value)
        return escape(remacro(value));
    }
    return value;
}
function codeBlock(node, jsScriptCoder, ctx) {
    if (node.name == '$' || node.name == '$global' || node.name == '$+') {
        if (node.value && node.value.trim().length > 0) {
            jsScriptCoder.w(node.value);
        }
    }
    else {
        if (node.name && (node.name.trim().length > 0)) {
            if (ctx.isCompile && node.__firstOfMixedNodes) {
                jsScriptCoder.w('// firstOfMixed ' + node.model.$args + '/' + node.model.$params);
                // log '=========', node.model.calcParamValues(node.model.$args)
                isCompilePassedParameters(jsScriptCoder, node.model.calcParamValues(node.model.$args));
            }
            jsScriptCoder.w(node.name + ' ' + (node.value || '') + ' //' + node.id);
        }
    }
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        codeBlock(item, jsScriptCoder, ctx);
    }
}
function isCompilePassedParameters(jsScriptCoder, parameters) {
    var i, i_items=parameters, i_len=parameters.length, p;
    for (i=0; i<i_len; i++) {
        p = parameters[i];
        if (p.type = 'string') {
            jsScriptCoder.w(p.name + ' = "' + p.value + '";');
        }
        else {
            jsScriptCoder.w(p.name + ' = ' + p.value + ';');
        }
    }
}
function escape(value) {
    if (typeof (value) === 'undefined') {
        return "null";
    }
    else if (typeof (value) === 'string') {
        return "\"" + escapevalue(value) + "\"";
    }
    else {
        return value;
    }
}
function escapename(value) {
    if (verify.isNotEmpty(value)) {
        return verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"');
    }
    else {
        return value;
    }
}
function escapevalue(value) {
    if (verify.isNotEmpty(value)) {
        return verify.replaceAll(escapename(value), "\n", "\\n");
    }
    else {
        return value;
    }
}
function remacro(value) {
    // Alt+146: Æ
    return verify.replaceAll(value, "Æ{", "${");
}

module.exports = {
    codify: codify
};

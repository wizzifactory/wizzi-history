/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\mtreebuildupscripter.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
/**
     from a composed-MTree
     write the jsWizziScript that will
     buildup an evaluated mTree.
    
     The script will be executed
     by the JsWizziRunner.
*/
var verify = require('../util/verify');
function codify(node, nparent, jsScriptCoder, ctx) {
    var nnode = ++ctx.counter,
        closeBlock = null;
    if (node.name == '$' || node.name == '$+') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        codeBlock(node, jsScriptCoder);
    }
    else if (node.name == '$global') {
        setJsWizziContext(ctx, 'global', jsScriptCoder, node.model.brickKey);
        codeBlock(node, jsScriptCoder);
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
    }
    else if (node.name == '$.') {
        setJsWizziContext(ctx, null, jsScriptCoder);
        var vparent = ('$' + nparent);
        var value = codifyValue(node.model.brickKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro)
        ;
        jsScriptCoder.w(vparent + ".v = " + vparent + ".v ? " + vparent + ".v : ''" + ' //' + node.id);
        jsScriptCoder.w(vparent + '.v += ($.textSep + ' + value + ');' + ' //' + node.id);
    }
    else if (node.name == '$if') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        jsScriptCoder.if(node.value, node);
        closeBlock = '}';
    }
    else if (node.name == '$else') {
        jsScriptCoder.else(node);
        ctx.brickKey = -1;
        closeBlock = '}';
    }
    else if (node.name == '$elif') {
        jsScriptCoder.elif(node.value, node);
        ctx.brickKey = - (1);
        closeBlock = '}';
    }
    else if (node.name == '$while') {
        jsScriptCoder.while(node.value, node);
        ctx.brickKey = - (1);
        closeBlock = '}';
    }
    else if (node.name == '$for') {
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
    else if (node.name == '$foreach') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var items = node.value.split(' ');
        jsScriptCoder.for('var i' + nnode + '=0, l' + nnode + ' = ' + items[2] + '.length; i' + nnode + '<l' + nnode + '; i' + nnode + '++', node);
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + ' //' + node.id);
        jsScriptCoder.w('var _index = i' + nnode + ';' + ' //' + node.id);
        jsScriptCoder.w('var _count = ' + items[2] + '.length;' + ' //' + node.id);
        closeBlock = '}';
    }
    else if (node.name == '$backeach') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var items = node.value.split(' ');
        jsScriptCoder.for('var i' + nnode + '=' + items[2] + '.length-1; i' + nnode + '>-1; i' + nnode + '--', node);
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + ' //' + node.id);
        jsScriptCoder.w('var _index = i' + nnode + ';' + ' //' + node.id);
        jsScriptCoder.w('var _count = ' + items[2] + '.length;' + ' //' + node.id);
        closeBlock = '}';
    }
    else if (node.name == '$virtual') {
        ;
    }
    else if (node.name == '$function') {
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var params = '$parent';
        var i, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.name === '$param') {
                params += ',' + item.value;
            }
        }
        jsScriptCoder.w('function ' + node.value + '(' + params + ') {');
        jsScriptCoder.indent();
        var i, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.name !== '$param') {
                codify(item, 'parent', jsScriptCoder, ctx);
            }
        }
        jsScriptCoder.deindent();
        jsScriptCoder.w('}');
        return ;
    }
    else if (node.name == '$_') {
        ctx.brickKey = null;
        setJsWizziContext(ctx, node.model.brickKey, jsScriptCoder);
        var vparent = '$' + nparent;
        var args = vparent;
        var i, i_len=node.children.length, item;
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
        setJsWizziContext(ctx, null, jsScriptCoder);
        jsScriptCoder.w('var $' + nnode + ' = { ' + 'n: ' + codifyValue(node.model.brickKey, node.name, 'string', jsScriptCoder.length + 1, node.hasMacro) + ', ' + (node.source ? 'source: ' + escape(node.source) + ', ' : '') + 'v: ' + codifyValue(node.model.brickKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro) + ', ' + 'r: ' + node.row + ', ' + 'c: ' + node.col + ', ' + 's: "' + node.model.brickKey + '", ' + 'u: "' + node.sourceKey + '", ' + ' };' + ' //' + node.id);
        var vparent = ('$' + nparent);
        jsScriptCoder.w('$.a(' + vparent + ', $' + nnode + ', ' + (jsScriptCoder.length + 1) + ');');
        nparent = nnode;
    }
    if (node.name !== '$' && node.name !== '$global' && node.name !== '$+') {
        var i, i_len=node.children.length, item;
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
function codifyValue(brickKey, value, type, line, hasMacro) {
    if (typeof(value) === 'undefined' || value == null) {
        return '""';
    }
    if (type === 'string') {
        if (value.indexOf('${') > -1) {
            var sHasMacro = hasMacro ? 'true' : 'false';
            return '$.ip("' + brickKey + '", ' + escape(value) + ', "' + type + '", ' + line + ', ' + sHasMacro + ')';
        }
        return escape(hasMacro ? remacro(value) : value);
    }
    return value;
}
function codeBlock(node, jsScriptCoder) {
    if (node.name == '$' || node.name == '$global' || node.name == '$+') {
        if (node.value && node.value.trim().length > 0) {
            jsScriptCoder.w(node.value);
        }
    }
    else {
        if (node.name && (node.name.trim().length > 0)) {
            jsScriptCoder.w(node.name + ' ' + (node.value || '') + ' //' + node.id);
        }
    }
    var i, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        codeBlock(item, jsScriptCoder);
    }
}
function escape(value) {
    if (typeof (value) === 'undefined') {
        return "null";
    }
    else if (typeof (value) === 'string') {
        return "\"" + verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"') + "\"";
    }
    else {
        return value;
    }
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
function remacro(value) {
    // Alt+146: Æ
    return verify.replaceAll(value, "${", "${");
}

module.exports = {
    codify: codify
};

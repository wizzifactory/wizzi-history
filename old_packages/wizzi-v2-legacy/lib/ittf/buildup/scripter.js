/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\buildup\scripter.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
/**
     from a composed-IttfModel
     write the js-script that will
     buildup an evaluated-IttfModel
    
     the script will be executed
     by the WizziJsRunner using the "esprima" parser.
*/
var verify = require('../../util/verify');
function codify(node,nparent,jsScriptCoder,ctx) {
    var nnode = ++ctx.counter,
        closeBlock = null;
    if (node.name == '$' || node.name == '$+') {
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        codeBlock(node, jsScriptCoder);
    }
    else if (node.name == '$global') {
        setWizziJsContext(ctx, 'global', jsScriptCoder);
        codeBlock(node, jsScriptCoder);
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
    }
    else if (node.name == '$.') {
        setWizziJsContext(ctx, null, jsScriptCoder);
        var vparent = ('$' + nparent);
        var value = codifyValue(node.model.modelKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro)
        ;
        jsScriptCoder.w(vparent + ".v = " + vparent + ".v ? " + vparent + ".v : ''" + ' //' + node.id);
        jsScriptCoder.w(vparent + '.v += ($.textSep + ' + value + ');' + ' //' + node.id);
    }
    else if (node.name == '$if') {
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        jsScriptCoder.if(node.value, node);
        closeBlock = '}';
    }
    else if (node.name == '$else') {
        jsScriptCoder.else(node);
        ctx.modelKey = -1;
        closeBlock = '}';
    }
    else if (node.name == '$elif') {
        jsScriptCoder.elif(node.value, node);
        ctx.modelKey = - (1);
        closeBlock = '}';
    }
    else if (node.name == '$while') {
        jsScriptCoder.while(node.value, node);
        ctx.modelKey = - (1);
        closeBlock = '}';
    }
    else if (node.name == '$for') {
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
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
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
        var items = node.value.split(' ');
        jsScriptCoder.for('var i' + nnode + '=0, l' + nnode + ' = ' + items[2] + '.length; i' + nnode + '<l' + nnode + '; i' + nnode + '++', node);
        jsScriptCoder.w('var ' + items[0] + ' = ' + items[2] + '[i' + nnode + '];' + ' //' + node.id);
        jsScriptCoder.w('var _index = i' + nnode + ';' + ' //' + node.id);
        jsScriptCoder.w('var _count = ' + items[2] + '.length;' + ' //' + node.id);
        closeBlock = '}';
    }
    else if (node.name == '$backeach') {
        setWizziJsContext(ctx, node.model.modelKey, jsScriptCoder);
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
    else {
        setWizziJsContext(ctx, null, jsScriptCoder);
        jsScriptCoder.w('var $' + nnode + ' = { ' + 'n: "' + escapename(node.name) + '", ' + (node.source ? 'source: ' + escape(node.source) + ', ' : '') + 'v: ' + codifyValue(node.model.modelKey, node.value, 'string', jsScriptCoder.length + 1, node.hasMacro) + ', ' + 'r: ' + node.row + ', ' + 'c: ' + node.col + ', ' + 's: "' + node.model.modelKey + '", ' + 'u: "' + node.sourceKey + '", ' + ' };' + ' //' + node.id);
        var vparent = ('$' + nparent);
        jsScriptCoder.w('$.a(' + vparent + ', $' + nnode + ', ' + (jsScriptCoder.length + 1) + ');');
        nparent = nnode;
    }
    if (node.name !== '$' && node.name !== '$+') {
        var i, i_len=node.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = node.childs[i];
            codify(item, nparent, jsScriptCoder, ctx);
        }
        if (closeBlock) {
            jsScriptCoder.end();
            ctx.modelKey = -1;
        }
    }
}
function setWizziJsContext(ctx,modelKey,jsScriptCoder) {
    if (ctx.modelKey === modelKey) {
        return ;
    }
    if (modelKey === null) {
        jsScriptCoder.w('$.n();');
    }
    else if (modelKey === 'global') {
        jsScriptCoder.w('$.g();');
    }
    else {
        jsScriptCoder.w('$.s("' + modelKey + '");');
    }
    ctx.modelKey = modelKey;
}

function codifyValue(modelKey,value,type,line,hasMacro) {
    if (typeof(value) === 'undefined' || value == null) {
        return '""';
    }
    if (type === 'string') {
        if (value.indexOf('${') > -1) {
            var sHasMacro = hasMacro ? 'true' : 'false';
            return '$.ip("' + modelKey + '", ' + escape(value) + ', "' + type + '", ' + line + ', ' + sHasMacro + ')';
        }
        return escape(hasMacro ? remacro(value) : value);
    }
    return value;
}

function codeBlock(node,jsScriptCoder) {
    if (node.name == '$' || node.name == '$+') {
        if (node.value && node.value.trim().length > 0) {
            jsScriptCoder.w(node.value);
        }
    }
    else {
        if (node.name && (node.name.trim().length > 0)) {
            jsScriptCoder.w(node.name + ' ' + (node.value || '') + ' //' + node.id);
        }
    }
    var i, i_len=node.childs.length, item;
    for (i=0; i<i_len; i++) {
        item = node.childs[i];
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
    return verify.replaceAll(value, "#{", "${");
}

module.exports = {
    codify: codify
};

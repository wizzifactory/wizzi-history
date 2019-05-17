/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\nools\flowDsl\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var md = module.exports = {};
var myname = 'nools.flowDsl.main';
md.gen = function(model,ctx,callback) {
    md.genItem(model, ctx);
    callback(null, ctx);
};
md.genItem = function(model,ctx) {
    var tag = md[model.wzElement];
    if (tag) {
        tag(model, ctx);
    }
    else {
        throw ctx.error(myname + '.ctor. Unknown statement entity/tag: ' + model.wzElement + '/' + model.wzTag, model)
        ;
    }
};
md.nools = function(model,ctx) {
    var i, i_len=model.facts.length, item;
    for (i=0; i<i_len; i++) {
        item = model.facts[i];
        md.genItem(item, ctx);
    }
    var i, i_len=model.rules.length, item;
    for (i=0; i<i_len; i++) {
        item = model.rules[i];
        md.genItem(item, ctx);
    }
};
md.comment = function(model,ctx) {
    if (model.items.length > 0) {
        for (var i = 0; i < model.items.length; i++) {
            if (i == 0) {
                ctx.write('/*');
            }
            else {
                ctx.w();
                ctx.write(' ');
            }
            ctx.write(model.items[i].wzName);
        }
        ctx.w('*/');
    }
    else {
        ctx.w('/*' + model.wzName + ' */');
    }
};
md.fact = function(model,ctx) {
    function(model,ctx) {
        ctx.w('define ' + model.wzName + ' {');
        ctx.indent();
        for (var i = 0; i < model.properties.length; i++) {
            md.genItem(model.properties[i], ctx);
            if (i < model.properties.length - 1 || model.ctor || model.functions.length > 0) {
                ctx.w(',');
            }
            else {
                ctx.w();
            }
        }
        if (model.ctor) {
            md.genItem(model.ctor, ctx);
            if (model.functions.length > 0) {
                ctx.w(',');
            }
            else {
                ctx.w();
            }
        }
        for (var i = 0; i < model.functions.length; i++) {
            md.genItem(model.functions[i], ctx);
            if (i < model.functions.length - 1 || model.ctor) {
                ctx.w(',');
            }
            else {
                ctx.w();
            }
        }
        ctx.deindent();
        ctx.w('}');
    }
};
md.ctor = function(model,ctx) {
    function(model,ctx) {
        ctx.w('constructor: function(' + model.getParams() + ') {');
        ctx.indent();
        var i, i_len=model.codelines.length, item;
        for (i=0; i<i_len; i++) {
            item = model.codelines[i];
            md.genItem(item, ctx);
        }
        ctx.deindent();
        ctx.w('}');
    }
};
md.xfunction = function(model,ctx) {
    if (model.wzParent.wzElement === 'fact') {
        ctx.w(model.wzName + ': function(' + model.getParams() + ') {');
    }
    else {
        ctx.w('function ' + model.wzName + '(' + model.getParams() + ') {');
    }
    ctx.indent();
    var i, i_len=model.codelines.length, item;
    for (i=0; i<i_len; i++) {
        item = model.codelines[i];
        md.genItem(item, ctx);
    }
    ctx.deindent();
    ctx.w('}');
};
md.property = function(model,ctx) {
    var p = toattr(model.wzName)
    ;
    ctx.write(p.name + ' : ' + p.value);
};
md.rule = function(model,ctx) {
    ctx.w('rule ' + model.wzName + ' {');
    ctx.indent();
    var i, i_len=model.constraints.length, item;
    for (i=0; i<i_len; i++) {
        item = model.constraints[i];
        md.genItem(item, ctx);
    }
    var i, i_len=model.actions.length, item;
    for (i=0; i<i_len; i++) {
        item = model.actions[i];
        md.genItem(item, ctx);
    }
    ctx.deindent();
    ctx.w('}');
};
md.when = function(model,ctx) {
    ctx.w('when {');
    ctx.indent();
    var i, i_len=model.constraints.length, item;
    for (i=0; i<i_len; i++) {
        item = model.constraints[i];
        md.genItem(item, ctx);
    }
    ctx.w();
    ctx.deindent();
    ctx.w('}');
};
md.xfor = function(model,ctx) {
    var p = toattr(model.wzName)
    ;
    ctx.write(p.value + ' : ' + p.name);
    var i, i_len=model.constraints.length, item;
    for (i=0; i<i_len; i++) {
        item = model.constraints[i];
        md.genItem(item, ctx);
    }
};
md.is = function(model,ctx) {
    function(model,ctx) {
        ctx.write(' ' + model.wzName);
    }
};
md.set = function(model,ctx) {
    var p = toattr(model.wzName)
    ;
    ctx.write(' {' + p.value + ' : ' + p.name + '}');
};
md.and = function(model,ctx) {
    ctx.w();
    if (model.wzName.trim() === 'not') {
        ctx.write('not(');
        var i, i_len=model.constraints.length, item;
        for (i=0; i<i_len; i++) {
            item = model.constraints[i];
            md.genItem(item, ctx);
        }
        ctx.w(')');
    }
    else {
        throw new Error('Not implemented ' + util.inspect(model, {depth: null}));
    }
    var p = toattr(model.wzName)
    ;
    ctx.write(' {' + p.value + ' : ' + p.name + '}');
};
md.action = function(model,ctx) {
    ctx.w('then {');
    ctx.indent();
    var i, i_len=model.codelines.length, item;
    for (i=0; i<i_len; i++) {
        item = model.codelines[i];
        md.genItem(item, ctx);
    }
    ctx.deindent();
    ctx.w('}');
};
md.codeline = function(model,ctx) {
    ctx.w(model.wzName);
};
function toattr(text) {
    var ret = {
        name: '', 
        value: ''
    },
        state = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if ((state == 0) && (((ch == ' ') || (ch == '\t')))) {
            ;
        }
        else if (state == 0) {
            ret.name += ch;
            state = 1;
        }
        else if ((state == 1) && (((ch == ' ') || (ch == '\t')))) {
            state = 2;
        }
        else if (state == 1) {
            ret.name += ch;
        }
        else if (state == 2) {
            ret.value += ch;
        }
    }
    return ret;
}

function toset(text) {
    var ret = {
        name: '', 
        value: ''
    },
        state = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if ((state == 0) && (((ch == ' ') || (ch == '\t')))) {
            ;
        }
        else if (state == 0) {
            ret.name += ch;
            state = 1;
        }
        else if ((state == 1) && (((ch == ' ') || (ch == '\t')))) {
            state = 2;
        }
        else if (state == 1) {
            ret.name += ch;
        }
        if ((state == 2) && (((((ch == ' ') || (ch == '\t'))) || (ch == '=')))) {
            ;
        }
        else if (state == 2) {
            ret.value += ch;
        }
    }
    return ret;
}


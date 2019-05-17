var md = module.exports = {};
var myname = 'nools.flowDsl.main';
md.gen = function (model, ctx, callback) {
    tags.gen(model, ctx);
    callback(null, ctx);
}
var tags = {};
tags.gen = function (model, ctx) {
    var tag = tags[model.wzElement];
    if (tag) tag(model, ctx);
    else throw ctx.error(myname + '.ctor. Unknown statement entity/tag: ' +
        model.wzElement + '/' + model.wzTag, model);
}
tags.nools = function (model, ctx) {
    model.facts.forEach(function (item) {
        tags.gen(item, ctx);
    });
    model.rules.forEach(function (item) {
        tags.gen(item, ctx);
    });
}
tags.comment = function (model, ctx) {
    if (model.items.length > 0) {
        for (var i = 0; i < model.items.length; i++) {
            if (i == 0) ctx.write('/*');
            else {
                ctx.w();
                ctx.write(' ');
            }
            ctx.write(model.items[i].wzName);
        }
        ctx.w('*/');
    }
    else
        ctx.w('/*' + model.wzName + ' */');
}
tags.fact = function (model, ctx) {
    ctx.w('define ' + model.wzName + ' {');
    ctx.indent();
    for (var i = 0; i < model.properties.length; i++) {
        tags.gen(model.properties[i], ctx);
        if (i < model.properties.length - 1 || model.ctor || model.functions.length > 0)
            ctx.w(',');
        else
            ctx.w();
    }
    if (model.ctor) {
        tags.gen(model.ctor, ctx);
        if (model.functions.length > 0) {
            ctx.w(',');
        } else {
            ctx.w();
        }
    }
    for (var i = 0; i < model.functions.length; i++) {
        tags.gen(model.functions[i], ctx);
        if (i < model.functions.length - 1 || model.ctor)
            ctx.w(',');
        else
            ctx.w();
    }
    ctx.deindent();
    ctx.w('}');
}
tags.ctor = function (model, ctx) {
    ctx.w('constructor: function(' + model.getParams() + ') {');
    ctx.indent();
    model.codelines.forEach(function (item) {
        tags.gen(item, ctx);
    });
    ctx.deindent();
    ctx.w('}');
}
tags.xfunction = function (model, ctx) {
    if (model.wzParent.wzElement === 'fact') {
        ctx.w(model.wzName + ': function(' + model.getParams() + ') {');
    } else {
        ctx.w('function ' + model.wzName + '(' + model.getParams() + ') {');
    }
    ctx.indent();
    model.codelines.forEach(function (item) {
        tags.gen(item, ctx);
    });
    ctx.deindent();
    ctx.w('}');
}
tags.property = function (model, ctx) {
    var p = toattr(model.wzName);
    ctx.write(p.name + ' : ' + p.value);
}
tags.rule = function (model, ctx) {
    ctx.w('rule ' + model.wzName + ' {');
    ctx.indent();
    model.constraints.forEach(function (item) {
        tags.gen(item, ctx);
    });
    model.actions.forEach(function (item) {
        tags.gen(item, ctx);
    });
    ctx.deindent();
    ctx.w('}');
}
tags.when = function (model, ctx) {
    ctx.w('when {');
    ctx.indent();
    model.constraints.forEach(function (item) {
        tags.gen(item, ctx);
    });
    ctx.w();
    ctx.deindent();
    ctx.w('}');
}
tags.xfor = function (model, ctx) {
    var p = toattr(model.wzName);
    ctx.write(p.value + ' : ' + p.name);
    model.constraints.forEach(function (item) {
        tags.gen(item, ctx);
    });
}
tags.is = function (model, ctx) {
    ctx.write(' ' + model.wzName);
}
tags.set = function (model, ctx) {
    var p = toattr(model.wzName);
    ctx.write(' {' + p.value + ' : ' + p.name + '}');
}
tags.and = function (model, ctx) {
    ctx.w();
    if (model.wzName.trim() === 'not') {
        ctx.write('not(');
        model.constraints.forEach(function (item) {
            tags.gen(item, ctx);
        });
        ctx.w(')');
    } else {
        throw new Error('Not implemented ' + util.inspect(model, { depth: null }));
    }
    var p = toattr(model.wzName);
    ctx.write(' {' + p.value + ' : ' + p.name + '}');
}
tags.action = function (model, ctx) {
    ctx.w('then {');
    ctx.indent();
    model.codelines.forEach(function (item) {
        tags.gen(item, ctx);
    });
    ctx.deindent();
    ctx.w('}');
}
tags.codeline = function (model, ctx) {
    ctx.w(model.wzName);
}
function toattr(text) {
    var ret = {
        name: '',
        value: ''
    }, state = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i]
        if (state == 0 && (ch == ' ' || ch == '\t'))
            ;
        else if (state == 0) {
            ret.name += ch;
            state = 1;
        }
        else if (state == 1 && (ch == ' ' || ch == '\t'))
            state = 2;
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
    }, state = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i]
        if (state == 0 && (ch == ' ' || ch == '\t'))
            ;
        else if (state == 0) {
            ret.name += ch;
            state = 1;
        }
        else if (state == 1 && (ch == ' ' || ch == '\t'))
            state = 2;
        else if (state == 1) {
            ret.name += ch;
        }
        if (state == 2 && (ch == ' ' || ch == '\t' || ch == '='))
            ;
        else if (state == 2) {
            ret.value += ch;
        }
    }
    return ret;
}

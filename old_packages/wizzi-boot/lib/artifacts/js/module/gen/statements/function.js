var lineParser = require('../../../../../util/lineParser');
var u = require('./util');
var md = module.exports = {};
md.load = function (cnt) {
    cnt.stm.exportfunction = function (model, ctx) {
        var xdefault = model.__default ? 'default ' : '';
        var name = model.__name || '';
        var prms = checkedGenParams(model);
        ctx.w('export ' + xdefault + 'function ' + name + '(' + prms + ') {');
        cnt.genItems(model.statements, ctx, { indent: true });
        ctx.write('}');
    }
    cnt.stm.xfunction = function (model, ctx) {
        var prms = checkedGenParams(model),
            name = '';
        if (prms.length > 0) {
            name = model.wzName.trim();
        } else {
            var p = lineParser.parse(model.wzName, model);
            if (p.tokens.length > 0) {
                var state = 0;
                for (var i = 0; i < p.tokens.length; i++) {
                    var text = p.tokens[i].text;
                    if (text === '(') {
                        state = 1;
                    } else if (text === ')') {
                            ;
                    } else if (i == 0 && state == 0) {
                        name = text;
                        state = 1;
                    } else {
                        prms = prms.length > 0 ? prms + ', ' + text : text;
                    }
                }
            }
        }
        var f, iifeInvoke, iife = model.statements.length > 0 && model.statements[model.statements.length - 1].wzElement === 'memberCall';
        if (iife) {
            f = '(' + (name.length > 0 ? 'function ' + name : 'function');
            iifeInvoke = model.statements[model.statements.length - 1];
            iifeInvoke.wzParent = { wzElement: 'call' }; // avoid me.isTopStatement
            model.statements.splice(model.statements.length - 1, 1);
        } else {
            f = name.length > 0 ? 'function ' + name : 'function';
        }
        ctx.w(f + '(' + prms + ') {');
        cnt.genItems(model.statements, ctx, { indent: true });
        ctx.write('}');
        if (iife) {
            cnt.genItems([iifeInvoke], ctx, { indent: false });
            ctx.write(')');
        }
        if (u.isTopStatement(model)) ctx.w('');
    }
    cnt.stm.iife = function (model, ctx) {
        if (model.unary_prefix) {
            ctx.write(model.unary_prefix);
        }
        ctx.write('(');
        if (model.statements.length != 1 && model.statements[0].wzElement !== 'function') {
            var i = 0, test = model.statements[0].wzElement;
            while (test === 'comment') {
                i++; test = model.statements[i].wzElement;
            }
            if (test !== 'xfunction') throw new Error('First statement of a an iife node must be a function. Instead is ' + model.statements[0].wzElement);
        }
        cnt.genItem(model.statements[0], ctx);
        ctx.write(')');
        if (model.statements.length === 2 && model.statements[1].wzElement === 'memberCall') {
            cnt.genItem(model.statements[1], ctx);
        }
        else if ((model.wzName || '').length > 0) {
            ctx.write(u.encloseParen(model.wzName));
        } else {
            ctx.write('(');
            var first = true;
            for (var i = 1; i < model.statements.length; i++) {
                item = model.statements[i];
                // console.log('iife.item.wzElement', item.wzElement)
                if (item.wzElement === 'callOnValue') {
                    ctx.write(')');
                    break;
                }
                if (!first) ctx.write(', ');
                first = false;
                cnt.genItem(item, ctx);
            }
            ctx.write(')');
        }
        for (var i = 1; i < model.statements.length; i++) {
            item = model.statements[i];
            if (item.wzElement === 'callOnValue') {
                cnt.genItem(item, ctx);
            }
        }
        if (u.isTopStatement(model)) ctx.w(';');
    }
    cnt.stm.arrowfunction = function (model, ctx) {
        var prms = checkedGenParams(model);
        if (u.onlyChildIs(model, 'callOnValue')) {
            ctx.w('(' + prms + ') => ');
            cnt.genItems(model.statements, ctx, { indent: true });
        } else {
            ctx.w('(' + prms + ') => {');
            cnt.genItems(model.statements, ctx, { indent: true });
            ctx.write('}');
        }
    }
    cnt.stm.xreturn = function (model, ctx) {
        if (model.statements && model.statements.length > 0) {
            ctx.write('return ');
            cnt.genItems(model.statements, ctx, { indent: true });
            if (model.statements.length == 1) ctx.w(';');
        }
        else
            ctx.w('return ' + (model.wzName || '') + u.semicolon(model.wzName));
    }
}
function checkedGenParams(model) {
    if (model.getParams) {
        return (model.getParams() || '');
    } else {
        console.log('checkedGenParams.model', model);
        var ret = [];
        var newStatements = [];
        for (var i = 0; i < model.statements.length; i++) {
            var item = model.statements[i];
            console.log('checkedGenParams.item', item);
            if (item.wzTag === 'param')
                ret.push(item.wzName);
            else
                newStatements.push(item);
        }
        model.statements = newStatements;
        return ret
    }
}

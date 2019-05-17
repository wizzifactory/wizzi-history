var lineParser = require('../../../../../util/lineParser');
var u = require('./util');
var md = module.exports = {};
var myname = 'js.module.statements.objects';
var jstparser = require('./jsonStatementTree');
md.load = function (cnt) {
    cnt.stm.jsonStatementTree = function (model, ctx) {
        var statements = jstparser.getStatements(model);
        cnt.genItems(statements, ctx, { indent: false });
    }
    cnt.stm.jsPropertyOrValue = function (model, ctx) {
        if (model.statements && model.statements.length > 0) {
            if (u.isObjectProperty(model) || u.isParamValue(model) || u.isValue(model)) {
                ctx.write(model.wzName + ': ');
                cnt.genItems(model.statements, ctx, { indent: false });
            } else if (ctx.__ecma === 'es6') {
                // assume decorator
                ctx.w('@' + model.wzName + '(');
                cnt.genItems(model.statements, ctx, { indent: true });
                ctx.w(')');
            } else {
                throw ctx.error(myname + '. Invalid jsPropertyOrValue: ' + model.wzName, model);
            }
        } else {
            if (u.isParamValue(model) || u.isValue(model)) {
                ctx.write(model.wzName);
            } else if (u.isObjectProperty(model)) {
                var tk, p = lineParser.parseNameValueRaw(model.wzName, model);
                // console.log('lineparse' + model.wzName, util.inspect(p, { depth: null }));
                if (p.hasValue()) {
                    ctx.write(p.name() + ': ');
                    ctx.write(p.value());
                } else {
                    if (ctx.__ecma === 'es5') {
                        console.log(ctx.error(myname + '. Invalid object property: ' + model.wzName, model));
                        throw ctx.error(myname + '. Invalid object property: ' + model.wzName, model);
                    }
                    else {
                        ctx.write(p.name());
                    }
                }
            } else if (u.parentIsHtmlElement(model)) {
            } else {
                if (ctx.__ecma === 'es6') {
                    // assume decorator
                    ctx.w('@' + model.wzName);
                } else {
                    throw ctx.error(myname + '. Invalid jsPropertyOrValue: ' + model.wzName, model);
                }
            }
        }
    }
    cnt.stm.jsObject = function (model, ctx) {
        if (model.statements.length == 0) {
            ctx.write('{}');
            // ctx.__needs_crlf = true;
            return;
        }
        ctx.w('{');
        ctx.indent();
        var first = true, comma = true;
        for (var i = 0; i < model.statements.length; i++) {
            var item = model.statements[i];
            if (u.isMemberAccessOrCall(item)) {
                ctx.w('');
                ctx.deindent();
                ctx.write('}');
                cnt.genItem(item, ctx);
                for (var j = i + 1; j < model.statements.length; j++) {
                    var item = model.statements[j];
                    if (u.isCallArgument(item)) ctx.write('.');
                    cnt.genItem(item, ctx);
                }
                return;
            }
            if (comma && !first) ctx.w(', ');
            first = false;
            cnt.genItem(item, ctx);
            comma = item.wzElement !== 'comment';
        };
        ctx.w('');
        ctx.deindent();
        ctx.write('}');
    }
    cnt.stm.jsArray = function (model, ctx) {
        if (model.statements.length == 0) {
            ctx.write('[' + (model.wzName || '') + ']');
            return;
        }
        ctx.w('[');
        ctx.indent();
        var first = true;
        for (var i = 0; i < model.statements.length; i++) {
            var item = model.statements[i];
            if (u.isMemberAccessOrCall(item)) {
                ctx.w('');
                ctx.deindent();
                ctx.write(']');
                cnt.genItem(item, ctx);
                for (var j = i + 1; j < model.statements.length; j++) {
                    var item = model.statements[j];
                    if (u.isCallArgument(item)) ctx.write('.');
                    cnt.genItem(item, ctx);
                }
                return;
            }
            if (!first) ctx.w(', ');
            first = false;
            cnt.genItem(item, ctx);
        };
        ctx.w('');
        ctx.deindent();
        ctx.write(']');
    }
}

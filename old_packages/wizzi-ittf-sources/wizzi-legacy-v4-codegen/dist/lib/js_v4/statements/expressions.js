/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\expressions.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var util = require('util');
var u = require('../util/stm');

var myname = 'wizzi-codegen.js.statements.expressions';
var md = module.exports = {};

md.load = function(cnt) {
    // void, !, or, and, iif, ==, !=, ===, !==, ||, &&, |, &,
    // -, +, *, /, ^, %,	<, <=, >, >=
    cnt.stm.xvoid = function(model, ctx) {
        ctx.write('void ');
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
        }
        else if (model.statements.length == 1) {
            cnt.genItem(model.statements[0], ctx);
        }
        else {
            throw ctx.error('void statement element requires zero or one child elements', model);
        }
    };
    cnt.stm.not = function(model, ctx) {
        ctx.write('!');
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
        }
        else if (model.statements.length == 1) {
            cnt.genItem(model.statements[0], ctx);
        }
        else {
            throw ctx.error('not/! statement element requires zero or one child elements', model);
        }
    };
    cnt.stm.or = function(model, ctx) {
        if (model.statements.length != 2) {
            throw ctx.error('or/|| statement element requires two child element', model);
        }
        cnt.genItem(model.statements[0], ctx);
        ctx.write(' || ');
        cnt.genItem(model.statements[1], ctx);
    };
    cnt.stm.and = function(model, ctx) {
        if (model.statements.length != 2) {
            throw ctx.error('and/&& statement element requires two child element', model);
        }
        cnt.genItem(model.statements[0], ctx);
        ctx.write(' && ');
        cnt.genItem(model.statements[1], ctx);
    };
    cnt.stm.iif = function(model, ctx) {
        if (model.statements.length < 2) {
            throw ctx.error('iif statement element requires at least two child elements', model);
        }
        var paren = model.statements.length > 2;
        if (paren) {
            ctx.write('(');
        }
        ctx.write(model.wzName + ' ? ');
        cnt.genItem(model.statements[0], ctx);
        ctx.write(' : ');
        cnt.genItem(model.statements[1], ctx);
        if (paren) {
            ctx.write(')');
        }
        if (model.statements.length > 2) {
            cnt.genItem(model.statements[2], ctx);
        }
        if (u.isTopStatement(model) && u.isDescendentOf(model, 'iif') == false) {
            console.log('iif', model.wzParent.wzElement, model.wzParent.wzParent ? model.wzParent.wzParent.wzElement : '');
            ctx.w(';');
        }
    };
    cnt.stm.test = function(model, ctx) {
        ctx.write('(');
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.write(')');
    };
    cnt.stm.then = function(model, ctx) {
        if (model.statements.length > 0) {
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
        }
        else {
            ctx.write(model.wzName);
        }
    };
    cnt.stm.op_eq = function(model, ctx) {
        emitOperators(cnt, '==', model, ctx);
    };
    cnt.stm.op_noteq = function(model, ctx) {
        emitOperators(cnt, '!=', model, ctx);
    };
    cnt.stm.op_eq_strict = function(model, ctx) {
        emitOperators(cnt, '===', model, ctx);
    };
    cnt.stm.op_noteq_strict = function(model, ctx) {
        emitOperators(cnt, '!==', model, ctx);
    };
    cnt.stm.op_or = function(model, ctx) {
        emitOperators(cnt, '||', model, ctx);
    };
    cnt.stm.op_and = function(model, ctx) {
        emitOperators(cnt, '&&', model, ctx);
    };
    cnt.stm.op_xor = function(model, ctx) {
        emitOperators(cnt, '|', model, ctx);
    };
    cnt.stm.op_xand = function(model, ctx) {
        emitOperators(cnt, '&', model, ctx);
    };
    cnt.stm.op_minus = function(model, ctx) {
        emitOperators(cnt, '-', model, ctx);
    };
    cnt.stm.op_plus = function(model, ctx) {
        emitOperators(cnt, '+', model, ctx);
    };
    cnt.stm.op_times = function(model, ctx) {
        emitOperators(cnt, '*', model, ctx);
    };
    cnt.stm.op_div = function(model, ctx) {
        emitOperators(cnt, '/', model, ctx);
    };
    cnt.stm.op_power = function(model, ctx) {
        emitOperators(cnt, '^', model, ctx);
    };
    cnt.stm.op_mod = function(model, ctx) {
        emitOperators(cnt, '%', model, ctx);
    };
    cnt.stm.op_lt = function(model, ctx) {
        emitOperators(cnt, '<', model, ctx);
    };
    cnt.stm.op_le = function(model, ctx) {
        emitOperators(cnt, '<=', model, ctx);
    };
    cnt.stm.op_gt = function(model, ctx) {
        emitOperators(cnt, '>', model, ctx);
    };
    cnt.stm.op_ge = function(model, ctx) {
        emitOperators(cnt, '>=', model, ctx);
    };
    function emitOperators(cnt, op, model, ctx) {
        if (model.statements[0] && model.statements[1]) {
            var requireParen1 = model.statements.length > 2;
            var requireParena1 = model.statements[0].statements.length > 0;
            var requireParena2 = model.statements[1].statements.length > 0;
            if (requireParen1) {
                ctx.write('(');
            }
            if (requireParena1) {
                ctx.write('(');
            }
            cnt.genItem(model.statements[0], ctx);
            if (requireParena1) {
                ctx.write(')');
            }
            ctx.write(' ' + op + ' ');
            if (requireParena2) {
                ctx.write('(');
            }
            cnt.genItem(model.statements[1], ctx);
            if (requireParena2) {
                ctx.write(')');
            }
            if (requireParen1) {
                ctx.write(')');
            }
            if (model.statements[2]) {
                cnt.genItem(model.statements[2], ctx);
            }
            if (u.isTopStatement(model) && (u.isDescendentOf(model, 'iif') == false)) {
                ctx.w(';');
            }
        }
        else {
            ctx.artifactGenerationError("Invalid model. Two child statements are required. Model: " + util.inspect(model, {depth: 2}), "wizzi-codegen/lib/js/statements/expressions/emitOperators", model);
            /**
                throw new Error("module.gen.statements.emitOperators Invalid model " + util.inspect(model, {depth: 2}));
            */
        }
    }
};

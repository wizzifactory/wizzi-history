var util = require('util');
var escodegen = require('escodegen');
var esprima = require('esprima');
var file = require('../util/file');
var verify = require('../util/verify');
var errors = require('./errors');
var verbose = false;
var lasts = [3];
function log(label, obj, force) {
    if (verbose || force) console.log(label, util.inspect(obj, { depth: 2 }));
}
function buildMessage(label, node) {
    return "WizziJsRunner. Error on statement: " + escodegen.generate(node) + '.\n' + label + '.\n';
}
var runner = function (ast, ctx, action, data) {
    lasts[2] = lasts[1];
    lasts[1] = lasts[0];
    lasts[0] = ast;
    var type = action ? ast.type + '_' + action : ast.type;
    if (verbose) console.log('ast.type: ' + type);
    if (ast.trailingComments && ast.trailingComments.length == 1) {
        ctx.setRunningNodeId(ast.trailingComments[0].value);
    }
    var trunner = runner[type];
    if (trunner) return trunner(ast, ctx, data);
    throw new Error('Missing runner for type: ' + type);
};
var runnerSet = function (ast, ctx, data) {
    return runner(ast, ctx, 'Set', data);
}
var runnerCall = function (ast, ctx, data) {
    return runner(ast, ctx, 'Call', data);
}
runner.Program = function (node, ctx) {
    log('Program.node', node);
    var state;
    for (var i = 0; i < node.body.length; i++) {
        var statement = node.body[i];
        state = runner(statement, ctx);
        if (state.return) {
            return state.value;
        }
    }
};
runner.Identifier = function (node, ctx) {
    log('Identifier.node', node)
    var upg = true;
    if (upg) {
        if (node.name == 'undefined') {
            console.log('Identifier returning node.name = undefined');
            return undefined;
        }
        if (ctx.isDeclared(node.name)) {
            // console.log('Identifier isDeclared', node.name);
            return ctx.getValue(node.name);
        }
        else {
            console.log('Identifier "' + node.name + '" not defined: on node ' + ctx.runningNodeId + ' ' + util.inspect(node, { depth: 2 }));
            throw new errors.WizziJsRunnerError('Identifier not defined: on node ' + ctx.runningNodeId + ' ' + util.inspect(node, { depth: 2 }), node);
        }
    } else {
        try {
            return ctx.getValue(node.name);
        } catch (ex) {
            var msg = "Identifier node: " + util.inspect(node, { depth: 2 }) + '.\n';
            if (lasts[1]) {
                msg += "Prev node: " + util.inspect(lasts[1], { depth: 2 }) + '.\n';
            }
            if (lasts[2]) {
                msg += "Prev-prev node: " + util.inspect(lasts[2], { depth: 2 }) + '.\n';
            }
            ex.message = msg + ex.message;
            throw ex;
        }
    }
};
runner.Identifier_Set = function (node, ctx, data) {
    log('Identifier.node', node)
    ctx.put(node.name, data);
};
runner.Literal = function (node) {
    log('Literal.node', node)
    return node.value;
};
runner.VariableDeclaration = function (node, ctx) {
    log('VariableDeclaration.node', node);
    node.declarations.map(function (declaration) {
        return runner(declaration, ctx);
    });
    return {};
};
runner.VariableDeclarator = function (node, ctx) {
    log('VariableDeclarator.node', node);
    if (!node.init) ctx.declare(node.id.name);
    else ctx.declare(node.id.name, runner(node.init, ctx));
}
/*
 STATEMENTS
*/
runner.EmptyStatement = function (node, ctx) {
    return {};
};
runner.ExpressionStatement = function (node, ctx) {
    ctx.beginExpr();
    runner(node.expression, ctx);
    ctx.endExpr();
    return {};
};
runner.IfStatement = function (node, ctx) {
    log('IfStatement', node);
    var ret = {},
        saveCurrentModelKey;
    if (runner(node.test, ctx)) {
        saveCurrentModelKey = ctx.get_currentIttfModelKey();
        ret = runner(node.consequent, ctx);
        ctx.set_IttfModelEvalContext(saveCurrentModelKey);
    } else {
        if (node.alternate) {
            saveCurrentModelKey = ctx.get_currentIttfModelKey();
            ret = runner(node.alternate, ctx);
            ctx.set_IttfModelEvalContext(saveCurrentModelKey);
        }
    }
    return ret;
};
runner.BlockStatement = function (node, ctx) {
    log('BlockStatement.node', node);
    var state;
    for (var i = 0; i < node.body.length; i++) {
        var statement = node.body[i];
        state = runner(statement, ctx);
        if (state.result || state.break || state.continue) {
            return state;
        }
    }
    return {};
};
runner.WhileStatement = function (node, ctx) {
    log('WhileStatement.node', node);
    var state,
        saveCurrentModelKey;
    while (runner(node.test, ctx)) {
        saveCurrentModelKey = ctx.get_currentIttfModelKey();
        state = runner(node.body, ctx);
        if (state.break || state.result) {
            return state;
        }
        ctx.set_IttfModelEvalContext(saveCurrentModelKey);
    }
    return {};
};
runner.DoWhileStatement = function (node, ctx) {
    log('DoWhileStatement.node', node);
    var state,
        saveCurrentModelKey;
    state = runner(node.body, ctx);
    if (state.break || state.result) {
        return state;
    }
    while (runner(node.test, ctx)) {
        saveCurrentModelKey = ctx.get_currentIttfModelKey();
        state = runner(node.body, ctx);
        if (state.break || state.result) {
            return state;
        }
        ctx.set_IttfModelEvalContext(saveCurrentModelKey);
    }
    return {};
};
runner.ForStatement = function (node, ctx) {
    log('ForStatement.node', node);
    runner(node.init, ctx);
    var state,
        saveCurrentModelKey;
    while (runner(node.test, ctx)) {
        // var saveContext = ctx.save(); // FIXME !!! this could lose data
        // context must be switched not overridden
        saveCurrentModelKey = ctx.get_currentIttfModelKey();
        state = runner(node.body, ctx);
        if (state.break || state.result) {
            return state;
        }
        //ctx.restore(saveContext);
        ctx.set_IttfModelEvalContext(saveCurrentModelKey);
        runner(node.update, ctx);
    }
    return {};
};
runner.ForInStatement = function (node, ctx) {
    log('ForInStatement.node', node);
    var obj = runner(node.right, ctx);
    var left = (node.left.name);
    ctx.declare(left);
    var state,
        saveCurrentModelKey;
    for (k in obj) {
        ctx.put(left, k);
        saveCurrentModelKey = ctx.get_currentIttfModelKey();
        state = runner(node.body, ctx);
        if (state.break || state.result) {
            return state;
        }
        ctx.set_IttfModelEvalContext(saveCurrentModelKey);
    }
    ctx.undeclare(left);
    return {};
};
runner.BreakStatement = function (node, ctx) {
    return { break: true };
}
runner.ContinueStatement = function (node, ctx) {
    log('ContinueStatement.node', node);
    return { continue: true };
}
runner.ReturnStatement = function (node, ctx) {
    log('ReturnStatement.node', node);
    return { result: true, value: runner(node.argument, ctx) };
}
/*
 EXPRESSIONS
*/
runner.UnaryExpression = function (node, ctx) {
    log('UnaryExpression.ast', node)
    var exp = runner(node.argument, ctx);
    if (node.prefix) {
        if (node.operator === '!') return !exp;
        else if (node.operator === '-') return -exp;
        else if (node.operator === '+') return exp;
        else throw new errors.WizziJsSynthaxError('Unmanaged unary operator ' + node.operator, node);
    }
    else
    {
        if (node.operator === '!') return !exp;
        else throw new errors.WizziJsSynthaxError('Unmanaged unary operator ' + node.operator, node);
    }
};
runner.BinaryExpression = function (node, ctx) {
    log('BinaryExpression.ast', node)
    var l = runner(node.left, ctx);
    var r = runner(node.right, ctx);
    log('BinaryExpression.l,r', [l, r]);
    try {
        if (node.operator === '+') return l + r;
        else if (node.operator === '-') return l - r;
        else if (node.operator === '*') return l * r;
        else if (node.operator === '/') return l / r;
        else if (node.operator === '==') return l == r;
        else if (node.operator === '===') return l === r;
        else if (node.operator === '!=') return l != r;
        else if (node.operator === '!==') return l !== r;
        else if (node.operator === '>=') return l >= r;
        else if (node.operator === '>') return l > r;
        else if (node.operator === '<=') return l <= r;
        else if (node.operator === '<') return l < r;
    } catch (ex) {
        var message = "wizziJsRunner.BinaryExpression\n"
        var error = new errors.WizziJsRunnerError(
            buildMessage(message, node), node
            );
        error.inner = ex;
        if (ex) {
            error.message = ex.message + '\n' + error.message;
        }
        throw ex
    }
    throw new errors.WizziJsSynthaxError('Unmanaged binary operator ' + node.operator, node);
};
runner.UpdateExpression = function (node, ctx) {
    log('UpdateExpression.ast', node)
    var v, exp = runner(node.argument, ctx);
    if (node.operator === '++') v = exp + 1;
    else if (node.operator === '--') v = exp - 1;
    else {
        throw new errors.WizziJsSynthaxError('Unmanaged update expression ' + node.operator, node);
    }
    ctx.put(node.argument.name, v);
    return node.prefix ? v : exp;
};
runner.LogicalExpression = function (node, ctx) {
    log('LogicalExpression.ast', node)
    var l = runner(node.left, ctx);
    if (node.operator === '&&' && (l === false || l === null)) return false;
    var r = runner(node.right, ctx);
    log('LogicalExpression.l,r', [l, r]);
    if (node.operator === '&&') return l && r;
    else if (node.operator === '||') return l || r;
    else {
        throw new errors.WizziJsSynthaxError('Unmanaged logical expression ' + node.operator, node);
    }
};
runner.ConditionalExpression = function (node, ctx) {
    return runner(node.test, ctx) ?
		runner(node.consequent, ctx) :
		runner(node.alternate, ctx);
};
runner.CallExpression = function (node, ctx) {
    log('CallExpression.ast', node)
    var args = [];
    node.arguments.forEach(function (item) {
        args.push(runner(item, ctx));
    });
    if (node.callee.type === 'MemberExpression') { // iife
        var object = runner(node.callee.object, ctx);
        if (!object) {
            throw new errors.WizziJsTypeError(
                buildMessage('Cannot build MemberExpression.node.callee.object', node.callee.object)
                );
        }
        var property = node.callee.computed
            ? runner(node.callee.property, ctx)
            : node.callee.property.name;
        if (!object[property]) {
            throw new errors.WizziJsTypeError(
                buildMessage('Cannot find MemberExpression.property ' + property, node.callee)
                );
        }
        try
        {
            if (verify.isFunction(object[property].apply)){
                return object[property].apply(object, args);
            } else {
                var message = 'property: "' + property + '" is not a function';
                var error = new errors.WizziJsRunnerError(
                    buildMessage(message, node), node
                    );
                throw error;
            }
        }
        catch (ex)
        {
            console.log('********** got it; ex: ', ex);
            var message = 'wizziJsRunner.CallExpression\n, property "' + property + '"';
            var error = new errors.WizziJsRunnerError(
                buildMessage(message, node), node
                );
            error.inner = ex;
            if (ex) {
                error.message = ex.message + '\n' + error.message;
            }
            throw ex
        }
    }
    if (node.callee.type === 'Identifier') { 
        var f = ctx.getFunction(node.callee.name);
        if (f == null)
            throw new errors.WizziJsTypeError('Function undeclared ' + node.callee.name, node.callee);
        return runnerCall(f, ctx, args);
    }
    throw new Error('Not implemented ' + util.inspect(node, { depth: 2 }));
    /*
        if (node.callee.type === 'FunctionExpression') { // iife
        var f = runner(node.callee, ctx);
        addArguments(ret, node.arguments, '(', ')');
    */
};
runner.MemberExpression = function (node, ctx) {
    log('MemberExpression.ast', node)
    var object = runner(node.object, ctx);
    if (!object) {
        throw new errors.WizziJsTypeError(
            buildMessage('runner.MemberExpression. Cannot build node.object', node.object)
            );
    }
    //log('+++object', object, true);
    if (node.computed) {
        var property = runner(node.property, ctx);
        //log('+++property', property, true);
        return object[property];
    } else {
        var property = node.property.name;
        //log('+++property', property, true);
        if (!object) {
            console.log('At memberExpression.ast object not found:' + util.inspect(node, { depth: 3 }));
        }
        return object[property];
        /*
        var method = object[property];
        log('+++method', method);
        return { object: object, method: method };
        */
    }
}
runner.MemberExpression_Set = function (node, ctx, data) {
    // log('MemberExpression_Set.ast', node)
    var object = runner(node.object, ctx);
    if (!object) {
        throw new errors.WizziJsTypeError(
            buildMessage('runner.MemberExpression_Set. Cannot build node.object', node.object)
            );
    }
    // log('+++object', object, true);
    if (node.computed) {
        var property = runner(node.property, ctx);
        // log('+++property', property, true);
        object[property] = data;
    } else {
        var property = node.property.name;
        // log('+++property', property, true);
        object[property] = data;
    }
}
runner.AssignmentExpression = function (node, ctx) {
    // log('AssignmentExpression.node', node);
    var l = runner(node.left, ctx);
    var r = runner(node.right, ctx);
    var v;
    if (verbose) console.log('AssignmentExpression.l,r', [l, r]);
    var ok = true;
    try {
        if (node.operator === '=') v = l = r;
        else if (node.operator === '*=') v = l *= r;
        else if (node.operator === '/=') v = l /= r;
        else if (node.operator === '%=') v = l %= r;
        else if (node.operator === '+=') v = l += r;
        else if (node.operator === '-=') v = l -= r;
        else if (node.operator === '<<=') v = l <<= r;
        else if (node.operator === '>>=') v = l >>= r;
        else if (node.operator === '>>>=') v = l >>>= r;
        else if (node.operator === '&=') v = l &= r;
        else if (node.operator === '^=') v = l ^= r;
        else if (node.operator === '|=') v = l |= r;
        else ok = false;
    } catch (ex) {
        var message = "wizziJsRunner.AssignmentExpression\n"
        var error = new errors.WizziJsRunnerError(
            buildMessage(message, node), node
            );
        error.inner = ex;
        if (ex) {
            error.message = ex.message + '\n' + error.message;
        }
        throw ex
    }
    if (!ok) {
        throw new errors.WizziJsSynthaxError('Unmanaged assignment expression ' + node.operator, node);
    }
    runnerSet(node.left, ctx, v);
    return v;
};
runner.ArrayExpression = function (node, ctx) {
    // log('ArrayExpression.ast', node)
    var ret = [];
    node.elements.map(function (element) {
        ret.push(runner(element, ctx));
    });
    // log('ArrayLiteral.a', a);
    return ret;
};
runner.ObjectExpression = function (node, ctx) {
    // log('ObjectExpression.ast', node)
    // console.log('ObjectExpression.node', util.inspect(node, { depth: null }));
    if (node.properties.length == 0) return {};
    var ret = {};
    node.properties.map(function (property) {
        var prop = runner(property, ctx);
        ret[prop.key] = prop.value;
    });
    return ret;
};
runner.Property = function (node, ctx) {
    // log('Property.node', node);
    /*
    if (node.key.name == 'obj')
        console.log('Property.node', util.inspect(node, { depth: null }));
    */
    var key = node.key.name;
    var value = runner(node.value, ctx);
    /*
    if (node.key.name == 'obj')
        console.log('Property.node.value', util.inspect(value, { depth: null }));
    */
    return { key: key, value: value };
}
runner.FunctionCall = function (node, ctx) {
    log('FunctionCall.node', node);
    var objbase = node.name.base ? runner(node.name.base, ctx) : ctx.values;
    var args = [];
    if (Object.prototype.toString.call(node.arguments) == '[object Array]') {
        node.arguments.forEach(function (item) {
            args.push(runner(item, ctx));
        });
    }
    var v = objbase[node.name.name].apply(objbase, args);
    return v;
}
runner.FunctionDeclaration = function (node, ctx) {
    log('FunctionDeclaration.node', node);
    ctx.declareFunction(node.id.name, node);
    return {};
}
runner.FunctionDeclaration_Call = function (node, ctx, data) {
    log('FunctionDeclaration_Call.node', node);
    var ctx = ctx.push();
    for (var i = 0; i < node.params.length; i++) {
        if (data.length > i) {
            ctx.declare(node.params[i].name, data[i]);
        }
    }
    var state = runner(node.body, ctx);
    ctx.pop();
    // console.log('FunctionDeclaration_Call.ret', state.value);
    return state.value;
}
var defaultOptions = {
    verbose: false
};
module.exports = {
    getParsed: function (source) {
        try {
            var parsed = esprima.parse(source, {
                attachComment: true,
                loc: true,
                sourceType: 'module'
            });
            return parsed;
        } catch (ex) {
            throw new errors.WizziJsSynthaxError(ex, source);
        }
    },
    run: function (source, ctx, options) {
        options = options || defaultOptions;
        var parsed = this.getParsed(source);
        if (options.dumpfile) {
            file.write(options.dumpfile, JSON.stringify(parsed, null, 2));
        }
        return runner(parsed, ctx);
    }
};
/*
module.exports = function (input, ctx, options) {
    // console.log(input);
    options = options || {};
    if (typeof options.verbose !== 'undefined') {
        verbose = options.verbose;
    }
    parsed = esprima.parse(input,
        { 
            sourceType: 'module',
            attachComment: true,
            loc: true
        });
    if (options.dumpfile) {
        file.write(options.dumpfile, JSON.stringify(parsed, null, 2));
    }
    return runner(parsed, ctx);
};
*/

/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\lib\jswizzi\jswizzirunner.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var util = require('util');
var escodegen = require('escodegen');
var esprima = require('esprima');
var verify = require('wizzi-utils').verify;
var errors = require('./errors');
var verbose = false;
var logGetSet = false;
var parsedCache = {};
var MAX_ITERATIONS = 5000;
var defaultOptions = {
    verbose: true
};
function dummy(hello) {
    if (verify.isNotEmpty(hello) === false) {
        return error(
            'InvalidArgument', 'dummy', { parameter: 'hello', message: 'The hello parameter must be a string. Received: ' + hello }
        );
    }
    // for emitting error function
}
function log(label, node, force) {
    if (verbose || force) {
        console.log(escodegen.generate(node));
        console.log(label, util.inspect(node, {
            depth: 2
        }));
    }
}
function logGet(name, value) {
    if (name[0] === '$') {
        return ;
    }
    // var fmt =  util.inspect(value, { depth: null})
    // log 'wizzi-mtree.jsWizziRunner == get == ' + name + ' : ' + fmt + ' -----'
}
function logSet(name, value) {
    if (name[0] === '$') {
        return ;
    }
    // var fmt =  util.inspect(value, { depth: null})
    // log 'wizzi-mtree.jsWizziRunner -- set -- ' + name + ' : ' + fmt + ' ====='
}
var runner = function(ast, ctx, action, data) {
    var type = action ? ast.type + '_' + action : ast.type;
    ;
    if (verbose) {
        console.log('ast.type: ' + type);
    }
    if (ast.trailingComments && ast.trailingComments.length == 1) {
        ctx.setRunningNodeId(ast.trailingComments[0].value);
    }
    var trunner = runner[type];
    if (trunner) {
        return trunner(ast, ctx, data);
    }
    else {
        return local_error(ctx, 'Missing runner for type: ' + type, 'runner');
    }
};
var runnerSet = function(ast, ctx, data) {
    // log 'jsWizziRunner.runnerSet', ast, data
    return runner(ast, ctx, 'Set', data);
};
var runnerCall = function(ast, ctx, data) {
    return runner(ast, ctx, 'Call', data);
};
runner.Program = function(node, ctx) {
    log('Program.node', node);
    var state;
    for (var i = 0; i < node.body.length; i++) {
        var statement = node.body[i];
        var state = runner(statement, ctx);
        if (state && state.__is_error) {
            // log '__is_error Program', state
            return state;
        }
        if (state.return) {
            return state.value;
        }
    }
};
runner.Identifier = function(node, ctx) {
    log('Identifier.node', node);
    if (node.name == 'undefined') {
        // log 'Identifier returning node.name = undefined'
        return undefined;
    }
    if (ctx.isDeclared(node.name)) {
        if (logGetSet) {
            logGet(node.name, ctx.getValue(node.name));
        }
        return ctx.getValue(node.name);
    }
    else {
        return // log 'jsWizziRunner. Identifier. ReferenceError. node.loc', node.loc
            local_error(ctx, 'ReferenceError|Identifier < ' + node.name + ' > not defined, on node < ' + ctx.runningNodeId + ' >', {
                node: node, 
                errorLines: errors.esprimaNodeErrorLines('unknown identifier', node, ctx.__source, true)
            }, node, 'Identifier')}
};
runner.Identifier_Set = function(node, ctx, data) {
    log('Identifier_Set.node', node);
    ctx.put(node.name, data);
};
runner.Literal = function(node, ctx) {
    log('Literal.node', node);
    return node.value;
};
runner.VariableDeclaration = function(node, ctx) {
    log('VariableDeclaration.node', node);
    var i, i_items=node.declarations, i_len=node.declarations.length, declaration;
    for (i=0; i<i_len; i++) {
        declaration = node.declarations[i];
        var state = runner(declaration, ctx);
        if (state && state.__is_error) {
            // log '__is_error VariableDeclaration', state
            return state;
        }
    }
    return {};
};
runner.VariableDeclarator = function(node, ctx) {
    log('VariableDeclarator.node', node);
    if (!node.init) {
        ctx.declare(node.id.name);
    }
    else {
        var value = runner(node.init, ctx);
        if (value && value.__is_error) {
            // log '__is_error VariableDeclaration', value
            return value;
        }
        // if node.id.name === '_____result'
        // log 'jsWizziRunner.VariableDeclarator', node.id.name, value
        ctx.declare(node.id.name, value);
    }
};
runner.EmptyStatement = function(node, ctx) {
    log('EmptyStatement.node', node);
    return {};
};
runner.ExpressionStatement = function(node, ctx) {
    log('ExpressionStatement.node', node);
    // 1/8/2017 _ ctx.beginExpr()
    var state = runner(node.expression, ctx);
    if (state && state.__is_error) {
        // _ ctx.abortExpr()
        return state;
    }
    // _ ctx.endExpr()
    return {};
};
runner.IfStatement = function(node, ctx) {
    log('IfStatement.node', node);
    var ret = {},
        savedCurrentBrickKey;
    var test = runner(node.test, ctx);
    if (test && test.__is_error) {
        // log '__is_error IfStatement', test
        return test;
    }
    if (test) {
        savedCurrentBrickKey = ctx.get_currentMTreeBrickKey();
        ret = runner(node.consequent, ctx);
        if (ret && ret.__is_error) {
            // log '__is_error IfStatement node.consequent', ret
            return ret;
        }
        var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
        if (notUsed && notUsed.__is_error) {
            // log '__is_error IfStatement set_MTreeBrickEvalContext', notUsed
            return notUsed;
        }
    }
    else {
        if (node.alternate) {
            savedCurrentBrickKey = ctx.get_currentMTreeBrickKey();
            ret = runner(node.alternate, ctx);
            if (ret && ret.__is_error) {
                // log '__is_error IfStatement node.alternate', ret
                return ret;
            }
            var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
            if (notUsed && notUsed.__is_error) {
                // log '__is_error IfStatement set_MTreeBrickEvalContext', notUsed
                return notUsed;
            }
        }
    }
    return ret;
};
runner.BlockStatement = function(node, ctx) {
    log('BlockStatement.node', node);
    var state;
    for (var i = 0; i < node.body.length; i++) {
        var statement = node.body[i];
        state = runner(statement, ctx);
        if (state && state.__is_error) {
            // log '__is_error BlockStatement', state
            return state;
        }
        if (state.result || state.break || state.continue) {
            return state;
        }
    }
    return {};
};
runner.WhileStatement = function(node, ctx) {
    log('WhileStatement.node', node);
    var state,
        savedCurrentBrickKey,
        iterCheck = 0;
    var test = runner(node.test, ctx);
    if (test && test.__is_error) {
        // log '__is_error WhileStatement node.test', test
        return test;
    }
    while (test) {
        if (iterCheck > MAX_ITERATIONS) {
            return state;
        }
        iterCheck++;
        savedCurrentBrickKey = ctx.get_currentMTreeBrickKey();
        state = runner(node.body, ctx);
        if (state && state.__is_error) {
            // log '__is_error WhileStatement node.body', state
            return state;
        }
        if (state.result) {
            return state;
        }
        if (state.break) {
            break;
        }
        var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
        if (notUsed && notUsed.__is_error) {
            // log '__is_error set_MTreeBrickEvalContext', notUsed
            return notUsed;
        }
        test = runner(node.test, ctx);
        if (test && test.__is_error) {
            // log '__is_error WhileStatement node.test', test
            return test;
        }
    }
    return {};
};
runner.DoWhileStatement = function(node, ctx) {
    log('DoWhileStatement.node', node);
    var test,
        state,
        savedCurrentBrickKey,
        iterCheck = 0;
    savedCurrentBrickKey = ctx.get_currentMTreeBrickKey();
    state = runner(node.body, ctx);
    if (state && state.__is_error) {
        // log '__is_error DoWhileStatement node.body', state
        return state;
    }
    var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
    if (notUsed && notUsed.__is_error) {
        // log '__is_error DoWhileStatement set_MTreeBrickEvalContext', notUsed
        return notUsed;
    }
    test = runner(node.test, ctx);
    if (test && test.__is_error) {
        // log '__is_error DoWhileStatement node.test', test
        return test;
    }
    while (test) {
        iterCheck++;
        if (iterCheck > MAX_ITERATIONS) {
            return state;
        }
        state = runner(node.body, ctx);
        if (state && state.__is_error) {
            // log '__is_error DoWhileStatement node.body', state
            return state;
        }
        if (state.result) {
            return state;
        }
        if (state.break) {
            break;
        }
        var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
        if (notUsed && notUsed.__is_error) {
            // log '__is_error DoWhileStatement set_MTreeBrickEvalContext', notUsed
            return notUsed;
        }
        test = runner(node.test, ctx);
        if (test && test.__is_error) {
            // log '__is_error DoWhileStatement node.test', test
            return test;
        }
    }
    return {};
};
runner.ReturnStatement = function(node, ctx) {
    log('ReturnStatement.node', node);
    if (node.argument) {
        var value = runner(node.argument, ctx);
        if (value && value.__is_error) {
            // log '__is_error ReturnStatement', value
            return value;
        }
        return {
                result: true, 
                value: value
            };
    }
    else {
        return {
                result: true
            };
    }
};
runner.ForStatement = function(node, ctx) {
    log('ForStatement.node', node);
    var test,
        state,
        savedCurrentBrickKey,
        iterCheck = 0;
    savedCurrentBrickKey = ctx.get_currentMTreeBrickKey();
    var notUsed = runner(node.init, ctx);
    if (notUsed && notUsed.__is_error) {
        // log '__is_error ForStatement node.init', notUsed
        return notUsed;
    }
    var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
    if (notUsed && notUsed.__is_error) {
        // log '__is_error ForStatement set_MTreeBrickEvalContext', notUsed
        return notUsed;
    }
    test = runner(node.test, ctx);
    if (test && test.__is_error) {
        // log '__is_error ForStatement node.test', test
        return test;
    }
    while (test) {
        if (iterCheck > MAX_ITERATIONS) {
            return state;
        }
        iterCheck++;
        state = runner(node.body, ctx);
        if (state && state.__is_error) {
            // log '__is_error ForStatement node.body', state
            return state;
        }
        if (state.result) {
            return state;
        }
        if (state.break) {
            break;
        }
        var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
        if (notUsed && notUsed.__is_error) {
            // log '__is_error ForStatement set_MTreeBrickEvalContext', notUsed
            return notUsed;
        }
        var notUsed = runner(node.update, ctx);
        if (notUsed && notUsed.__is_error) {
            // log '__is_error ForStatement node.update', notUsed
            return notUsed;
        }
        var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
        if (notUsed && notUsed.__is_error) {
            // log '__is_error ForStatement set_MTreeBrickEvalContext', notUsed
            return notUsed;
        }
        test = runner(node.test, ctx);
        if (test && test.__is_error) {
            // log '__is_error ForStatement node.test', test
            return test;
        }
    }
    return {};
};
runner.ForInStatement = function(node, ctx) {
    log('ForInStatement.node', node);
    var test,
        state,
        savedCurrentBrickKey;
    savedCurrentBrickKey = ctx.get_currentMTreeBrickKey();
    var obj = runner(node.right, ctx);
    if (obj && obj.__is_error) {
        // log '__is_error ForInStatement node.right', obj
        return obj;
    }
    if (_.isObject(obj) == false) {
        return local_error(ctx, 'The value must be an object. It is "' + getTypeDescription(obj) + '".', node.right, node, 'ForInStatement');
    }
    var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
    if (notUsed && notUsed.__is_error) {
        // log '__is_error ForInStatement set_MTreeBrickEvalContext', notUsed
        return notUsed;
    }
    var left = node.left.name;
    ctx.declare(left);
    for (k in obj) {
        ctx.put(left, k);
        state = runner(node.body, ctx);
        if (state && state.__is_error) {
            // log '__is_error ForInStatement node.body', state
            return state;
        }
        if (state.result) {
            return state;
        }
        if (state.break) {
            break;
        }
        var notUsed = ctx.set_MTreeBrickEvalContext(savedCurrentBrickKey);
        if (notUsed && notUsed.__is_error) {
            // log '__is_error ForInStatement set_MTreeBrickEvalContext', notUsed
            return notUsed;
        }
    }
    ctx.undeclare(left);
    return {};
};
runner.BreakStatement = function(node, ctx) {
    log('BreakStatement.node', node);
    return {
            break: true
        };
};
runner.ContinueStatement = function(node, ctx) {
    log('ContinueStatement.node', node);
    return {
            continue: true
        };
};
runner.UnaryExpression = function(node, ctx) {
    log('UnaryExpression.node', node);
    var exp;
    if (node.operator === 'typeof') {
        exp = runner(node.argument, ctx);
        if (exp && exp.__is_error) {
            // log 'wizzi-mtree-jsWizziRunner.__is_error CallExpression argument', exp
            if (exp.name === 'JsWizziError-ReferenceError') {
                exp = undefined;
            }
            else {
                return exp;
            }
        }
    }
    else {
        exp = runner(node.argument, ctx);
        if (exp && exp.__is_error) {
            // log '__is_error UnaryExpression', exp
            return exp;
        }
    }
    if (node.prefix) {
        if (node.operator === '!') {
            return !exp;
        }
        else if (node.operator === '-') {
            return -exp;
        }
        else if (node.operator === '+') {
            return exp;
        }
        else if (node.operator === '~') {
            return ~exp;
        }
        else if (node.operator === 'typeof') {
            return typeof exp;
        }
        else {
            return local_error(ctx, 'Unmanaged unary operator ' + node.operator + ' (prefix: true)', node.operator, node, 'UnaryExpression');
        }
    }
    else {
        if (node.operator === '!') {
            return !exp;
        }
        else {
            return local_error(ctx, 'Unmanaged unary operator ' + node.operator + ' (prefix: false)', node.operator, node, 'UnaryExpression');
        }
    }
};
runner.BinaryExpression = function(node, ctx) {
    log('BinaryExpression.node', node);
    var l = runner(node.left, ctx);
    if (l && l.__is_error) {
        // log '__is_error BinaryExpression l', l
        return l;
    }
    var r = runner(node.right, ctx);
    if (r && r.__is_error) {
        // log '__is_error BinaryExpressior', r
        return r;
    }
    log('BinaryExpression.l,r', [
        l, 
        r
    ]);
    if (node.operator === '+') {
        return (l + r);
    }
    else if (node.operator === '-') {
        return (l - r);
    }
    else if (node.operator === '*') {
        return l * r;
    }
    else if (node.operator === '/') {
        return l / r;
    }
    else if (node.operator === '%') {
        return l % r;
    }
    else if (node.operator === '==') {
        return l == r;
    }
    else if (node.operator === '===') {
        return l === r;
    }
    else if (node.operator === '!=') {
        return l != r;
    }
    else if (node.operator === '!==') {
        return l !== r;
    }
    else if (node.operator === '>=') {
        return l >= r;
    }
    else if (node.operator === '>') {
        return l > r;
    }
    else if (node.operator === '<=') {
        return l <= r;
    }
    else if (node.operator === '<') {
        return l < r;
    }
    else if (node.operator === '<<') {
        return l << r;
    }
    else if (node.operator === '>>') {
        return l >> r;
    }
    else if (node.operator === '>>>') {
        return l >>> r;
    }
    else if (node.operator === '|') {
        return l | r;
    }
    else if (node.operator === '&') {
        return l & r;
    }
    else if (node.operator === '^') {
        return l ^ r;
    }
    else if (node.operator === 'in') {
        return l in r;
    }
    else if (node.operator === 'instanceof') {
        return l instanceof r;
    }
    else {
        return local_error(ctx, 'Unmanaged binary operator ' + node.operator, node.operator, node, 'BinaryExpression');
    }
};
runner.UpdateExpression = function(node, ctx) {
    log('UpdateExpression.node', node);
    var v,
        exp;
    var exp = runner(node.argument, ctx);
    if (exp && exp.__is_error) {
        // log '__is_error UpdateExpression', exp
        return exp;
    }
    if (node.operator === '++') {
        v = exp + 1;
    }
    else if (node.operator === '--') {
        v = exp - 1;
    }
    else {
        return local_error(ctx, 'Unmanaged update expression ' + node.operator, node.operator, node, 'UpdateExpression');
    }
    ctx.put(node.argument.name, v);
    return node.prefix ? v : exp;
};
runner.LogicalExpression = function(node, ctx) {
    log('LogicalExpression.node', node);
    var l = runner(node.left, ctx);
    if (l && l.__is_error) {
        // log '__is_error LogicalExpression l', l
        return l;
    }
    if (node.operator === '&&' && (l === false || l === null)) {
        return false;
    }
    var r = runner(node.right, ctx);
    if (r && r.__is_error) {
        // log '__is_error LogicalExpression r', r
        return r;
    }
    log('LogicalExpression.l,r', [
        l, 
        r
    ]);
    if (node.operator === '&&') {
        return l && r;
    }
    else if (node.operator === '||') {
        return l || r;
    }
    else {
        return local_error(ctx, 'Unmanaged logical expression ' + node.operator, node.operator, node, 'LogicalExpression');
    }
};
runner.ConditionalExpression = function(node, ctx) {
    log('ConditionalExpression.node', node);
    var test = runner(node.test, ctx);
    if (test && test.__is_error) {
        // log '__is_error ConditionalExpression', test
        return test;
    }
    if (test) {
        var value = runner(node.consequent, ctx);
        if (value && value.__is_error) {
            // log '__is_error ConditionalExpression node.consequent', value
            return value;
        }
        return value;
    }
    else {
        var value = runner(node.alternate, ctx);
        if (value && value.__is_error) {
            // log '__is_error ConditionalExpression node.alternate', value
            return value;
        }
        return value;
    }
};
runner.CallExpression = function(node, ctx) {
    log('CallExpression.node', node);
    var value,
        args = [],
        property;
    // log 'CallExpression.node.callee', node.callee
    if (node.callee.type === 'MemberExpression') {
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            value = runner(item, ctx);
            if (value && value.__is_error) {
                // log '__is_error CallExpression argument', value
                return value;
            }
            args.push(value);
        }
        var obj = runner(node.callee.object, ctx);
        if (obj && obj.__is_error) {
            // log '__is_error CallExpression node.callee.object', obj
            return obj;
        }
        if (!obj) {
            return local_error(ctx, 'The value of callee must be an object. It is "' + getTypeDescription(obj) + '" : ' + obj + '.', node.callee.object, node, 'CallExpression');
        }
        if (node.callee.computed) {
            property = runner(node.callee.property, ctx);
            if (property && property.__is_error) {
                // log '__is_error CallExpression node.callee.property', property
                return property;
            }
        }
        else {
            property = node.callee.property.name;
        }
        if (!obj[property]) {
            return local_error(ctx, 'Missing object property.', node.callee.property, node, 'CallExpression');
        }
        if (verify.isFunction(obj[property])) {
            try {
                var value = obj[property].apply(obj, args);
                if (value && value.__is_error) {
                    // log 'wizzi-mtree.jswizzi.jsWizziRunner.CallExpression. Error calling ' + property + ', on statement: ' + escodegen.generate(node)
                    var currentModelInfo = ctx.get_currentMTreeBrickInfo();
                    return error('JsWizziError', 'CallExpression', {
                            message: value.message, 
                            parameter: {
                                callingProperty: property, 
                                onStatement: escodegen.generate(node), 
                                currentModelUri: currentModelInfo.currentModel_uri, 
                                currentModelMixerUri: currentModelInfo.currentModel_mixerUri
                            }
                        }, value);
                }
                return value;
            } catch (ex) {
                return local_error(ctx, 'Exception calling function: ' + (ex ? ex.message : 'exception message unavailable'), node.callee.property, node, 'CallExpression', ex);
            }
        }
        else {
            return local_error(ctx, 'property: "' + property + '" is not a function', node.callee.property, node, 'CallExpression');
        }
    }
    if (node.callee.type === 'Identifier') {
        var f = ctx.getFunction(node.callee.name);
        // log 'CallExpression.node.callee.name', node.callee.name, f
        if (f == null) {
            f = ctx.getValue(node.callee.name);
            if (f != null && verify.isFunction(f)) {
                var i, i_items=node.arguments, i_len=node.arguments.length, item;
                for (i=0; i<i_len; i++) {
                    item = node.arguments[i];
                    value = value = runner(item, ctx);
                    if (value && value.__is_error) {
                        // log '__is_error CallExpression argument', value
                        return value;
                    }
                    args.push(value);
                }
                try {
                    return f.apply(null, args);
                } catch (ex) {
                    return local_error(ctx, 'Exception calling function: ' + (ex ? ex.message : 'exception message unavailable'), node.callee.name, node, 'CallExpression', ex);
                }
            }
            else {
                return local_error(ctx, ('Function undeclared ' + node.callee.name), node.callee, node, 'CallExpression', new Error());
            }
        }
        // log 'wizzi-mtree.jswizzi.runner.expressions.CallExpression.jsWizziFunction', f.params
        if (f.params.length !== node.arguments.length) {
            return local_error(ctx, 'A jsWizziFunction call must have the same number of arguments of the callee. Found: ' + f.params.length + ' and ' + node.arguments.length, null, node, 'CallExpression');
        }
        // _ ctx.elapsedTime('wizzi-mtree.jsWizziRunner.Call function ' + node.callee.name + ' start')
        ctx.beginLoadingCallArguments();
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            value = value = runner(item, ctx);
            if (value && value.__is_error) {
                // log '__is_error CallExpression argument', value
                return value;
            }
            // log 'wizzi-mtree.jswizzi.runner.expressions.CallExpression.value', value
            args.push(value);
        }
        ctx.endLoadingCallArguments();
        var result = runnerCall(f, ctx, args);
        // _ ctx.elapsedTime('wizzi-mtree.jsWizziRunner.Call function ' + node.callee.name + ' end')
        return result;
    }
    if (node.callee.type === 'FunctionExpression') {
        // log 'FunctionExpression', node.callee, true
        var f = node.callee;
        if (f.params.length !== node.arguments.length) {
            return local_error(ctx, 'A jsWizziFunction call must have the same number of arguments of the callee. Found: ' + f.params.length + ' and ' + node.arguments.length, null, node, 'CallExpression');
        }
        ctx.beginLoadingCallArguments();
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            value = runner(item, ctx);
            if (value && value.__is_error) {
                // log '__is_error CallExpression argument', value
                return value;
            }
            args.push(value);
        }
        ctx.endLoadingCallArguments();
        f.type = 'FunctionDeclaration';
        return runnerCall(f, ctx, args);
    }
    return local_error(ctx, 'Not implemented. CallExpression.node.callee.type: "' + node.callee.type + '"', null, node, 'CallExpression');
};
runner.MemberExpression = function(node, ctx) {
    log('MemberExpression.node', node);
    var obj = runner(node.object, ctx);
    if (obj && obj.__is_error) {
        // log '__is_error MemberExpression', obj
        return obj;
    }
    if (!obj) {
        return local_error(ctx, 'The value must be an object. It is "' + getTypeDescription(obj) + '".', node.object, node, 'MemberExpression');
    }
    if (node.computed) {
        var property = runner(node.property, ctx);
        if (property && property.__is_error) {
            // log '__is_error MemberExpression node.property', property
            return property;
        }
        return obj[property];
    }
    else {
        var property = node.property.name;
        return obj[property];
    }
};
runner.MemberExpression_Set = function(node, ctx, data) {
    log('MemberExpression_Set.node', node);
    var obj = runner(node.object, ctx);
    if (obj && obj.__is_error) {
        // log '__is_error MemberExpression_Set', obj
        return obj;
    }
    if (!obj) {
        return local_error(ctx, 'The value must be an object. It is "' + getTypeDescription(obj) + '".', node.object, node, 'MemberExpression_Set');
    }
    if (node.computed) {
        var property = runner(node.property, ctx);
        if (property && property.__is_error) {
            // log '__is_error MemberExpression_Set node.property', property
            return property;
        }
        obj[property] = data;
    }
    else {
        var property = node.property.name;
        obj[property] = data;
    }
};
runner.AssignmentExpression = function(node, ctx) {
    log('AssignmentExpression.node', node);
    var l = runner(node.left, ctx);
    if (l && l.__is_error) {
        // log '__is_error AssignmentExpression l', l
        return l;
    }
    var r = runner(node.right, ctx);
    if (r && r.__is_error) {
        // log '__is_error AssignmentExpression r', r
        return r;
    }
    var v;
    if (node.operator === '=') {
        v = l = r;
    }
    else if (node.operator === '*=') {
        v = l *= r;
    }
    else if (node.operator === '/=') {
        v = l /= r;
    }
    else if (node.operator === '%=') {
        v = l %= r;
    }
    else if (node.operator === '+=') {
        v = l += r;
    }
    else if (node.operator === '-=') {
        v = l -= r;
    }
    else if (node.operator === '<<=') {
        v = l <<= r;
    }
    else if (node.operator === '>>=') {
        v = l >>= r;
    }
    else if (node.operator === '>>>=') {
        v = l >>>= r;
    }
    else if (node.operator === '&=') {
        v = l &= r;
    }
    else if (node.operator === '^=') {
        v = l ^= r;
    }
    else if (node.operator === '|=') {
        v = l |= r;
    }
    else {
        return local_error(ctx, 'Unmanaged expression operator ' + node.operator, node.operator, node, 'AssignmentExpression');
    }
    // log 'jsWizziRunner.AssignmentExpression.node.left', node.left
    var notUsed = runnerSet(node.left, ctx, v);
    if (notUsed && notUsed.__is_error) {
        // log '__is_error AssignmentExpression node.left', notUsed
        return notUsed;
    }
    return v;
};
runner.ArrayExpression = function(node, ctx) {
    log('ArrayExpression.node', node);
    var ret = [],
        value;
    var i, i_items=node.elements, i_len=node.elements.length, element;
    for (i=0; i<i_len; i++) {
        element = node.elements[i];
        value = runner(element, ctx);
        if (value && value.__is_error) {
            // log '__is_error ArrayExpression', value
            return value;
        }
        ret.push(value);
    }
    return ret;
};
runner.ObjectExpression = function(node, ctx) {
    log('ObjectExpression.node', node);
    if (node.properties.length == 0) {
        return {};
    }
    var ret = {},
        prop;
    var i, i_items=node.properties, i_len=node.properties.length, property;
    for (i=0; i<i_len; i++) {
        property = node.properties[i];
        prop = runner(property, ctx);
        if (prop && prop.__is_error) {
            // log '__is_error ObjectExpression', prop
            return prop;
        }
        ret[prop.key] = prop.value;
    }
    return ret;
};
runner.Property = function(node, ctx) {
    log('Property.node', node);
    var key = node.key.name;
    var value = runner(node.value, ctx);
    if (value && value.__is_error) {
        // log '__is_error Property', value
        return value;
    }
    return {
            key: key, 
            value: value
        };
};
runner.NewExpression = function(node, ctx) {
    log('NewExpression.node', node);
    // log 'NewExpression.node', node
    if (node.callee.type === 'Identifier') {
        var l = node.arguments.length;
        var args = [];
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            var value = runner(item, ctx);
            if (value && value.__is_error) {
                // log '__is_error NewExpression argument', value
                return value;
            }
            args.push(value);
        }
        // log 'NewExpression.args', args
        if (node.callee.name === 'String' && l === 0) {
            return new String();
        }
        else if (node.callee.name === 'String' && l === 1) {
            return new String(args[0]);
        }
        else if (node.callee.name === 'Number' && l === 0) {
            return new Number();
        }
        else if (node.callee.name === 'Number' && l === 1) {
            return new Number(args[0]);
        }
        else if (node.callee.name === 'Date' && l === 0) {
            return new Date();
        }
        else if (node.callee.name === 'Date' && l === 1) {
            return new Date(args[0]);
        }
        else if (node.callee.name === 'Date' && l === 2) {
            return new Date(args[0],args[1]);
        }
        else if (node.callee.name === 'Date' && l === 3) {
            return new Date(args[0],args[1], args[2]);
        }
        else if (node.callee.name === 'Date' && l === 4) {
            return new Date(args[0],args[1], args[2], args[3]);
        }
        else if (node.callee.name === 'Date' && l === 5) {
            return new Date(args[0],args[1], args[2], args[3], args[4]);
        }
        else if (node.callee.name === 'Date' && l === 6) {
            return new Date(args[0],args[1], args[2], args[3], args[4], args[5]);
        }
        else if (node.callee.name === 'RegExp' && l === 1) {
            return new RegExp(args[0]);
        }
        else if (node.callee.name === 'Array' && l === 0) {
            return new Array();
        }
        else if (node.callee.name === 'Array' && l === 1) {
            return new Array(args[0]);
        }
        else if (node.callee.name === 'Object' && l === 0) {
            return new Object();
        }
        else if (node.callee.name === 'Object' && l === 1) {
            return new Object(args[0]);
        }
        else if (node.callee.name === 'Map' && l === 0) {
            return new Map();
        }
        else if (node.callee.name === 'Map' && l === 1) {
            return new Map(args[0]);
        }
        else if (node.callee.name === 'Set' && l === 0) {
            return new Set();
        }
        else if (node.callee.name === 'Set' && l === 1) {
            return new Set(args[0]);
        }
        else if (node.callee.name === 'RegExp' && l === 1) {
            return new RegExp(args[0]);
        }
        else if (node.callee.name === 'RegExp' && l === 2) {
            return new RegExp(args[0], args[1]);
        }
        else {
            return local_error(ctx, ('Builtin object (or number of arguments) not managed ' + node.callee.name + ', num arguments ' + l), node.callee, node, 'NewExpression');
        }
    }
    return local_error(ctx, 'Not implemented. NewExpression.node.callee.type: "' + node.callee.type + '"', null, node, 'NewExpression');
};
runner.FunctionCall = function(node, ctx) {
    log('FunctionCall.node', node);
    var objbase,
        value;
    // log 'wizzi-mtree.jswizzi.runner.functions.FunctionCall'
    if (node.name.base) {
        objbase = runner(node.name.base, ctx);
        if (objbase && objbase.__is_error) {
            // log '__is_error FunctionCall node.name.base', objbase
            return objbase;
        }
    }
    else {
        objbase = ctx.values;
    }
    if (_.isObject(objbase) == false) {
        return local_error(ctx, 'The value must be an object. It is "' + getTypeDescription(obj) + '".', node.name.base, node, 'FunctionCall');
    }
    var args = [];
    if (Object.prototype.toString.call(node.arguments) == '[object Array]') {
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            // log 'wizzi-mtree.jswizzi.runner.functions.FunctionCall.item', item
            value = runner(item, ctx);
            if (value && value.__is_error) {
                // log '__is_error FunctionCall item', value
                return value;
            }
            // log 'wizzi-mtree.jswizzi.runner.functions.FunctionCall.value', value
            args.push(value);
        }
    }
    var f = objbase[node.name.name];
    if (!f) {
        return local_error(ctx, 'Missing function.', node.name.base, node, 'FunctionCall');
    }
    if (verify.isFunction(f)) {
        try {
            var v = objbase[node.name.name].apply(objbase, args);
            return v;
        } catch (ex) {
            return local_error(ctx, (ex ? ex.message : 'Error calling function'), node.callee.property, node, 'CallExpression', ex);
        }
    }
};
runner.FunctionDeclaration = function(node, ctx) {
    log('FunctionDeclaration.node', node);
    ctx.declareFunction(node.id.name, node);
    return {};
};
runner.FunctionDeclaration_Call = function(node, ctx, data) {
    log('FunctionDeclaration_Call.node', node);
    // log 'wizzi-mtree.jswizzi.runner.functions.FunctionDeclaration_Call'
    var save_brick_key = ctx.get_currentMTreeBrickKey();
    var ctx = ctx.push();
    for (var i = 0; i < node.params.length; i++) {
        // log 'wizzi-mtree.jswizzi.runner.functions.FunctionDeclaration_Call.param', node.params[i].name
        if (data.length > i) {
            // log 'wizzi-mtree.jswizzi.runner.functions.FunctionDeclaration_Call.value', data[i]
            ctx.declareCallParam(node.params[i].name, data[i]);
        }
    }
    var state = runner(node.body, ctx);
    if (state && state.__is_error) {
        // log '__is_error FunctionCall node.body', state
        return state;
    }
    ctx.set_MTreeBrickEvalContext(save_brick_key, 0);
    ctx.pop();
    return state.value;
};
function local_error(ctx, message, node, parentnode, method, ex) {
    // throw new Error('boing')
    message = message || '';
    var errorCode = 'JsWizziError', ss = message.split('|');
    if (ss.length == 2) {
        errorCode = ss[0];
        message = ss[1];
    }
    var node, errorLines;
    if (node) {
        if (node.errorLines) {
            node = node.node;
            errorLines = node.errorLines;
        }
        else {
            node = node;
        }
    }
    var nodeStm;
    try {
        nodeStm = node ? escodegen.generate(node) : '';
    } catch (escodegenErr) {
        nodeStm = 'escodegen failed: ' + escodegenErr.message;
    }
    var nodeInsp = node ? util.inspect(node, {depth:2}) : '';
    var parentnodeStm;
    try {
        parentnodeStm = parentnode ? escodegen.generate(parentnode) : '';
    } catch (escodegenErr) {
        parentnodeStm = 'escodegen failed: ' + escodegenErr.message;
    }
    var parentnodeInsp = node ? util.inspect(node, {depth:2}) : '';
    var currentModelInfo = ctx.get_currentMTreeBrickInfo();
    return error(errorCode, method, {
            message: message, 
            parameter: {
                errorLines: errorLines, 
                nodeStatement: nodeStm, 
                nodeInspected: nodeInsp, 
                parentNodeStatement: parentnodeStm, 
                parentNodeInspected: parentnodeInsp, 
                currentModelUri: currentModelInfo.currentModel_uri, 
                currentModelMixerUri: currentModelInfo.currentModel_mixerUri
            }
        }, ex);
}
function getTypeDescription(obj) {
    if (obj == null) {
        return 'null';
    }
    return typeof(obj);
}
module.exports = {
    getParsed: function(source, callback) {
        // FIXME caching provokes errors, now disbled
        // should be:  CACHE_MAX_LEN = 100
        var CACHE_MAX_LEN = 0;
        if (source.length < CACHE_MAX_LEN) {
            parsed = parsedCache[source];
            if (parsed) {
                if (callback) {
                    return callback(null, parsed);
                }
                else {
                    return parsed;
                }
            }
        }
        var parsed;
        try {
            parsed = esprima.parse(source, {
                attachComment: true, 
                loc: true, 
                sourceType: 'module'
            });
        } catch (ex) {
            if (callback) {
                return callback(new errors.JsWizziSynthaxError(ex, source));
            }
            else {
                return new errors.JsWizziSynthaxError(ex, source);
            }
        }
        if (source.length < CACHE_MAX_LEN) {
            parsedCache[source] = parsed;
        }
        if (callback) {
            return callback(null, parsed);
        }
        else {
            return parsed;
        }
    }, 
    run: function run(source, ctx, options, callback) {
        // ctx : instance-of wizzi-mtree.jswizzi.jsWizziContext
        ctx.__source = source;
        if (verify.isNotEmpty(source) === false) {
            var err = error('InvalidArgument', 'run', {
                parameter: 'source', 
                message: 'The source parameter must be a string. Received: ' + source
            });
            if (callback) {
                return callback(err);
            }
            else {
                return err;
            }
        }
        if (verify.isObject(ctx) === false) {
            var err = error('InvalidArgument', 'run', {
                parameter: 'ctx', 
                message: 'The ctx parameter must be an object. Received: ' + ctx
            });
            if (callback) {
                return callback(err);
            }
            else {
                return err;
            }
        }
        options = (options || defaultOptions);
        if (callback) {
            this.getParsed(source, function(err, parsed) {
                if (err) {
                    return callback(err);
                }
                return execute_run_cb(parsed, ctx, options, callback);
            });
        }
        else {
            var parsed = this.getParsed(source);
            return execute_run_cb(parsed, ctx, options);
        }
    }
};
function execute_run_cb(parsed, ctx, options, callback) {
    if (options.dumpfile) {
        options.dumpfile(JSON.stringify(parsed, null, 2));
    }
    var result = runner(parsed, ctx);
    if (result && result.__is_error) {
        console.log('wizzi-mtree.jswizzi.jsWizziRunner. Result has errors: ', result);
    }
    if (callback) {
        if (result && result.__is_error) {
            delete (result.__is_error);
            callback(result);
        }
        else {
            callback(null, result);
        }
    }
    else {
        return result;
    }
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-mtree.jsWizzi.jsWizziRunner.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}

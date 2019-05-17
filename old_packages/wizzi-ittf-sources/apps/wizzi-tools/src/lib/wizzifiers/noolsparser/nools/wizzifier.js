var util = require('util');
var verify = require('../../../util/verify');
var file = require('../../../util/file');
var parse = require('nools').parse;
var cloner = require('./cloner');

var verbose = false;

function log(label, obj) {
    if (verbose) console.log(label, util.inspect(obj, { depth: 1 }));
}

var format = function (ast, options) {
    if (ast.define && ast.rules)
        return format.nools(ast);
    throw new Error('no formatter for node: ' + util.inspect(ast, { depth: 1 }));
};

format.nools = function (ast) {
    log('format.ast', ast)
    var ret = {
        tag: 'nools',
        children: []
    }
    ast.define.map(function (node) {
        ret.children.push(format.define(node));
    });
    ast.rules.map(function (node) {
        ret.children.push(format.rule(node));
    });
    return ret;
};

format.define = function (ast) {
    var ret = {
        tag: 'define',
        name: ast.name,
        children: []
    }
    ret.children.push({
        tag: '+',
        name: ast.properties,
        children: []
    });
    return ret;
}

format.rule = function (ast) {
    var ret = {
        tag: 'rule',
        name: ast.name,
        children: []
    }
    if (verify.isObject(ast.options)) {
        for (var k in ast.options) {
            ret.children.push({
                tag: 'opt',
                name: k + ' ' + ast.options[k],
                children: []
            });
        }
    }
    ast.constraints.map(function (node) {
        ret.children.push(format.constraint(node));
    });
    ret.children.push({
        tag: 'action',
        name: ast.action,
        children: []
    });
    return ret;
}

format.options = function (ast) {
    var ret = {
        tag: 'options',
        children: []
    }
    return ret;
}

format.constraint = function (ast) {
    var ret = {
        tag: 'k',
        children: []
    }
    ast.map(function (node) {
        ret.children.push(format.constraintItem(node));
    });
    return ret;
}

format.constraintItem = function (ast) {
    var ret = {
        tag: '@',
        name: ast,
        children: []
    }
    return ret;
}

exports.getWizziTree = function (input, options) {
    options = options || {};
    if (typeof options.verbose !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    var syntax = parse(input, true);
    syntax = cloner(syntax);
    console.log('Parsed in ' + (Date.now() - startTime) + ' ms');
    if (options.dumpfile) {
        file.write(options.dumpfile, JSON.stringify(syntax, null, 2));
    }
    var node = format(syntax);
    log("wizziTree", node);
    return node;
};
exports.parse = function (input) {
    return parse(input);
};
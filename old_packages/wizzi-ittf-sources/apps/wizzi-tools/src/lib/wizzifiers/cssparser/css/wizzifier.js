var util = require('util');
var verify = require('../../../util/verify');
var file = require('../../../util/file');
var parser = require('css');
var cloner = require('./cloner');
var ittfwriter = require("../../../util/ittfwriter");

var verbose = false;

function log(label, obj) {
    if (verbose) console.log(label, util.inspect(obj, { depth: 1 }));
}

var format = function (ast, options) {
    var formatter = format[ast.type];
    if (verbose) console.log('ast.type', ast.type);
    if (formatter) return formatter(ast, options);
    throw new Error('no formatter for type: ' + ast.type);
};

format.stylesheet = function (ast) {
    log('stylesheet.ast', ast)
    var ret = {
        tag: 'css',
        children: []
    }
    ast.stylesheet.rules.map(function (node) {
        ret.children.push(format(node));
    });
    return ret;
};

format.comment = function (ast) {
    var ret = {
        tag: '#',
        children: []
    }
    var lines = file.splitLines(ast.comment);
    if (lines.length == 1) ret.name = lines[0];
    else {
        lines.forEach(function (l) {
            ret.children.push({
                tag: '#',
                name: l,
                children: []
            });
        });
    }
    return ret;
}

format.rule = function (ast) {
    var ret = {
        tag: '<',
        children: []
    }
    var ls = ast.selectors.length;
    for (var i = 0; i < ls; i++) {
        if (i == 0) {
            ret.name = ast.selectors[i];
            if (ret.name.trim()[0] === '.') {
                ret.tag = '.';
                ret.name = ret.name.trim().substr(1);
            }
        }
        else {
            ret.children.push({
                tag: '+',
                name: ast.selectors[i],
                children: []
            });
        }
    }
    ast.declarations.map(function (node) {
        ret.children.push(format(node));
    });
    return ret;
}

format.declaration = function (ast) {
    var ret = {
        tag: ast.property,
        name: ast.value,
        children: []
    }
    return ret;
}

format.media = function (ast) {
    var ret = {
        tag: 'media',
        name: ast.media,
        children: []
    }
    ast.rules.map(function (node) {
        ret.children.push(format(node));
    });
    return ret;
}

format["font-face"] = function (ast) {
    var ret = {
        tag: 'font-face',
        children: []
    }
    ast.declarations.map(function (node) {
        ret.children.push(format(node));
    });
    return ret;
}

format.keyframes = function (ast) {
    var ret = {
        tag: 'keyframes',
        name: ast.name,
        children: []
    }
    ret.children.push({
        tag: 'vendor',
        name: ast.vendor,
        children: []
    });
    ast.keyframes.map(function (node) {
        ret.children.push(format(node));
    });
    return ret;
}
format.keyframe = function (ast) {
    var ret = {
        tag: 'keyframe',
        children: []
    }
    var ls = ast.values.length;
    for (var i = 0; i < ls; i++) {
        if (i == 0) ret.name = ast.values[i];
        else {
            ret.children.push({
                tag: 'value',
                name: ast.values[i],
                children: []
            });
        }
    }
    ast.declarations.map(function (node) {
        ret.children.push(format(node));
    });
    return ret;
}

format.import = function (ast) {
    console.log('import', util.inspect(ast, { depth: null }));
    var ret = {
        tag: 'import',
        name: ast.import,
        children: []
    }
    return ret;
}

format.charset = function (ast) {
    console.log('charset', util.inspect(ast, { depth: null }));
    var ret = {
        tag: 'charset',
        name: ast.charset,
        children: []
    }
    return ret;
}

var md = module.exports = {};

md.parse = function (input) {
    var syntax = parser.parse(input);
    return cloner(syntax);
};

md.getWizziTree = function (input, options) {
    options = options || {};
    verbose = options.verbose;
    var startTime = Date.now();
    var syntax = parser.parse(input, true);
    syntax = cloner(syntax);
    console.log('Css parsed in ' + (Date.now() - startTime) + ' ms');
    if (options.dumpfile) {
        file.write(options.dumpfile, JSON.stringify(syntax, null, 2));
    }
    var node = format(syntax);
    log("wizziTree", node);
    return node;
};

md.getWizziIttf = function (input, options, cb) {
    try
    {
        var node = md.getWizziTree(input, options);
        cb(null, ittfwriter.stringify(node, { lang: 'css' }));
    } catch (ex)
    {
        cb({ message: ex.message, stack: ex.stack });
    }
};
/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-tools-next\src\ittf\lib\wizzifiers\cssparser\scss_salesforce\wizzifier.js.ittf
    utc time: Sat, 28 Jul 2018 07:48:17 GMT
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var lineparser = require('../../../util/lineparser');
var file = require('wizzi-utils').file;
var cloner = require('../../utils/cloner');
var ittfwriter = require("../../../util/ittfwriter");
var scss_parser = require('scss-parser').parse;
function parseInternal(scss, callback) {
    var syntax = css_parser(scss);
    return callback(null, syntax);
}
var verbose = false;
function log(label, obj, force) {
    if (verbose || force) {
        console.log(label, util.inspect(obj, {
            depth: null
        }));
    }
}
var format = function(ast, options) {
    return ast;
    var formatter = format[ast.type];
    if (verbose) {
        console.log('ast.type', ast.type);
    }
    if (formatter) {
        return formatter(ast, options);
    }
    throw new Error('no formatter for type: ' + ast.type);
};
function wizzify(scss, options, callback) {
    parseInternal(scss, function(err, syntax) {
        if (err) {
            return callback(err);
        }
        var node = format(syntax);
        log("wizziTree", node);
        return callback(null, node);
    });
}
var md = module.exports = {};
md.getCodeAST = function(input, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = options || {};
    parseInternal(input, options, callback);
};
md.getWizziTree = function(input, options, callback) {
    options = (options || {});
    if (typeof (options.verbose) !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    console.log('startTime', startTime);
    wizzify(input, options, function(err, syntax) {
        if (err) {
            return callback(err);
        }
        syntax = cloner(syntax);
        console.log('Parsed in ' + Date.now() - startTime + ' ms');
        callback(null, syntax);
    });
};
md.getWizziIttf = function(input, options, callback) {
    md.getWizziTree(input, options, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, ittfwriter.stringify(result, options));
    });
};

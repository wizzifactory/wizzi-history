var util = require('util');
var xml2js = require('xml2js');
var verify = require('../../../util/verify');
var file = require('../../../util/file');
var cloner = require('./cloner');
var ittfwriter = require("../../../util/ittfwriter");

var parser = new xml2js.Parser();

var verbose = false;

function log(label, obj, force) {
    if (verbose || force) console.log(label, util.inspect(obj, { depth: null }));
}

function parse(xml, options, callback) {
    var wizziTree = {
        children: []
    };
    return parser.parseString(xml, function (err, result) {
        if (err) { callback(err, null); return; }
        if (options.dumpfile) {
            file.write(options.dumpfile, JSON.stringify(result, null, 2));
        }
        for (var prop in result) {
            if (result.hasOwnProperty(prop)) {
                var root = result[prop];
                if (verify.isObject(root) === false) throw new Error("Root is not an object");
                var ac = getAttribsAndChilds(root);
                wizziTree = {
                    tag: prop,
                    attribs: [],
                    children: []
                };
                var aObj = ac.a;
                for (var aName in aObj) {
                    wizziTree.children.push({
                        tag: '@',
                        name: aName + ' ' + aObj[aName],
                        children: []
                    });
                }
                for (var j = 0; j < ac.c.length; j++) {
                    var childnode = ac.c[j];
                    if (verify.isArray(childnode.value) === false)
                        console.log("Error: value is not an array: " + childnode.name + ',' + childnode.value);
                    else
                        appendChilds(childnode.name, childnode.value, wizziTree);
                }
            }
        }
        console.log("wizziTree", wizziTree);
        callback(null, wizziTree);
    });
}

function appendChilds(name, nodeArray, parent) {
    console.log('appendChilds.name', name);
    for (var i = 0; i < nodeArray.length; i++) {
        var node = nodeArray[i];
        if (verify.isString(node)) {
            parent.name = node;
        } else {
            var ac = getAttribsAndChilds(node);
            var tag = {
                tag: name,
                children: []
            };
            parent.children.push(tag);
            var aObj = ac.a;
            for (var aName in aObj) {
                tag.children.push({
                    tag: '@',
                    name: aName + ' ' + aObj[aName],
                    children: []
                });
            }
            for (var j = 0; j < ac.c.length; j++) {
                var childnode = ac.c[j];
                if (verify.isArray(childnode.value) === false)
                    console.log("Error: value is not an array: " + childnode.name + ',' + childnode.value);
                else
                    appendChilds(childnode.name, childnode.value, tag);
            }
        }
    }
}

function getAttribsAndChilds(node) {
    var attribs = {};
    var children = [];
    for (var prop in node) {
        if (node.hasOwnProperty(prop)) {
            if (prop === '$') {
                var attribsObj = node[prop];
                log('getAttribsAndChilds.$', attribsObj, true);
                for (var k in attribsObj) {
                    attribs[k] = attribsObj[k];
                }
            } else {
                var value = node[prop];
                var isArray = verify.isArray(value);
                children.push({ name: prop, value: node[prop] });
            }
        }
    }
    return { a: attribs, c: children };
}


var md = module.exports = {};

md.parse = function (input, callback) {
    return parser.parseString(input, function (err, result) {
        if (err) { callback(err, null); return; }
        callback(null, result);
    });
};

md.getWizziTree = function (input, options, callback) {
    options = options || {};
    if (typeof options.verbose !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    // for this, syntax is wizziTree
    parse(input, options, function (err, syntax) {
        if (err) { callback(err, null); return; }
        syntax = cloner(syntax);
        console.log('Parsed in ' + (Date.now() - startTime) + ' ms');
        // for this, syntax is wizziTree
        callback(null, syntax);
    });
};

md.getWizziIttf = function (input, options, callback) {
    md.getWizziTree(input, options, function (err, result) {
        if (err) { return callback(err, null); return; }
        callback(null, ittfwriter.stringify(result));
    });
};




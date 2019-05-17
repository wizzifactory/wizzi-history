/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\tests\mocks\basicloader\index.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
/**
     This basic loader is for testing plugins.
     The loadMTree function loads an mTree from a
     single IttfDocument without include, mix, append and evaluate.
     Does not require a requestContext.
     The IttfDocument must be stored in the
     filesystem (mongodb and localstorage store kinds
     are not supported).
*/
var util = require('util');
var path = require('path');
var file = require('./file');
var liner = require('./liner');
var nodifier = require('./nodifier');
var MTree = require('./mTree').MTree;
var md = module.exports = {};
md.loadMTree = function(primaryIttfDocumentUri, notUsed, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error("wizzi-mtree/lib/basicloader/loadMTree. A callback is required. Uri: " + primaryIttfDocumentUri);
    }
    var sourceText = file.read(primaryIttfDocumentUri)
    ;
    var mTree = new MTree(primaryIttfDocumentUri);
    mTree.load(sourceText, {
        sourceKey: 's1'
    });
    var nodes = mTree.nodes;
    mTree.nodes = [];
    var i, i_len=nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = nodes[i];
        var final_node = _to_final_mtree(null, item);
        mTree.nodes.push(final_node);
    }
    return callback(null, mTree)
    ;
};
function _to_final_mtree(parent, node) {
    var final_node = {
        parent: parent, 
        children: [], 
        n: node.name, 
        v: node.value, 
        r: node.row, 
        c: node.col, 
        s: node.modelKey, 
        u: node.sourceKey
    };
    var i, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        var final_node_child = _to_final_mtree(final_node, item);
        final_node.children.push(final_node_child);
    }
    return final_node;
}
function error(message) {
    return {
            __is_error: true, 
            operation: 'wizzi-mtree/lib/basicloader/index', 
            message: message
        };
}

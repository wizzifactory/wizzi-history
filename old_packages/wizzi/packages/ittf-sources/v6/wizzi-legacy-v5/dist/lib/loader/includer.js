/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\includer.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var verify = require('../util/verify');
var util = require('util');
var path = require('path');
var async = require('async');
var errors = require('../errors');
var utilnode = require('../util/node');
/**
     Ittf commands
     $include
     $json
*/
var includer = module.exports = function(primaryMTreeBrick, mTreeBrickProvider, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(primaryMTreeBrick) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'primaryMTreeBrick', message: 'The primaryMTreeBrick parameter must be an object. Received: ' + primaryMTreeBrick }
        ));
    }
    if (verify.isObject(mTreeBrickProvider) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mTreeBrickProvider', message: 'The mTreeBrickProvider parameter must be an object. Received: ' + mTreeBrickProvider }
        ));
    }
    var includes = [];
    var jsons = [];
    var i, i_len=primaryMTreeBrick.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = primaryMTreeBrick.nodes[i];
        searchIncludes(node, includes, jsons);
    }
    async.mapSeries(includes, function(item, callback) {
        var v = item.value.trim();
        var mixeruri = item.model.uri;
        var mixerbasedir = path.dirname(mixeruri);
        mTreeBrickProvider.get({
            from: 'store', 
            basedir: mixerbasedir, 
            relpath: v, 
            include: true, 
            includerBrickKey: item.model.brickKey
        }, function(err, includedWipNodifiedMTree) {
            if (err) {
                return callback(err)
                ;
            }
            mTreeBrickProvider.enterFragmentCall(mixeruri, includedWipNodifiedMTree.uri);
            if (mTreeBrickProvider.checkForRecursion()) {
                return callback(local_error('InvalidIttfError', 'default', 'Recursive mixin or include: ' + v, node)
                    )
                ;
            }
            includer(includedWipNodifiedMTree, mTreeBrickProvider, function(err, includeResult) {
                if (err) {
                    return callback(err)
                    ;
                }
                mTreeBrickProvider.exitFragmentCall();
                // _ mTreeBrickProvider.callChain.pop()
                utilnode.replace(item, includeResult.nodes);
                return callback(null)
                ;
            });
        });
    }, function(err, results) {
        if (err) {
            return callback(err)
            ;
        }
        var i, i_len=jsons.length, item;
        for (i=0; i<i_len; i++) {
            item = jsons[i];
            var json = JSON.parse(item.value)
            ;
            if (verify.isArray(json)) {
                var normalized = [];
                var j, j_len=json.length, jsonitem;
                for (j=0; j<j_len; j++) {
                    jsonitem = json[j];
                    normalized.push(normalizeNode(jsonitem, item.parent, item.model, item.row, item.col, item.sourceKey)
                    );
                }
                utilnode.replace(item, normalized);
            }
            else {
                var normalized = normalizeNode(json, item.parent, item.model, item.row, item.col, item.sourceKey)
                ;
                utilnode.replace(item, [
                    normalized
                ]);
            }
        }
        callback(null, primaryMTreeBrick);
    });
};
function searchIncludes(item, includes, jsons) {
    if (item.name === '$include') {
        includes.push(item);
    }
    else if (item.name === '$json') {
        jsons.push(item);
    }
    var i, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        searchIncludes(child, includes, jsons);
    }
}
function normalizeNode(node, parent, model, r, c, u) {
    node.parent = parent;
    node.model = model;
    node.row = r;
    node.col = c;
    node.souceKey = u;
    if (node.children) {
        var i, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            normalizeNode(item, node, model, r, c, u);
        }
    }
    else {
        node.children = [];
    }
}
function local_error(name, method, message, node, inner) {
    if (node) {
        // log 'local_error.node', node
        var nodeError = new errors.NodeError(message, node);
        message = nodeError.message;
    }
    return error(name, method, message, inner)
    ;
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
        method: 'wizzi-mtree.loader.includer.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}

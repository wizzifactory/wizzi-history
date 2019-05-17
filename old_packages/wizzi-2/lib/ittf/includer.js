/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\includer.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var errors = require('../errors');
var verify = require('../util/verify');
var fail = require('../util/fail');
var utilnode = require('../util/node');
var log = require('../util/log')(module)

;
// $include, $json
var includer = module.exports = function(parsedIttfModel,ittfLoadState,callback) {
    var includes = [];
    var jsons = [];
    var i, i_len=parsedIttfModel.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = parsedIttfModel.nodes[i];
        searchIncludes(node, includes, jsons);
    }
    async.mapSeries(includes, function(item,callback) {
        var v = item.value.trim();
        var calleruri = item.model.uri;
        var callerbasedir = path.dirname(calleruri);
        ittfLoadState.provider.get({
            from: 'store', 
            basedir: callerbasedir, 
            relpath: v, 
            include: true, 
            includerModelKey: item.model.modelKey
        }, function(err,includedIttfModel) {
            if (err) {
                return callback(err)
                ;
            }
            ittfLoadState.callChain.push({
                caller: calleruri, 
                callee: includedIttfModel.uri
            });
            if (ittfLoadState.checkForLoops()) {
                var error = new errors.IttfLoadError(('Recursive mixin or include: ' + v), includedIttfModel.uri, node, new Error());
                fail.warn(error.message);
                return callback(error);
            }
            includer(includedIttfModel, ittfLoadState, function(err,includeResult) {
                if (err) {
                    return callback(err)
                    ;
                }
                ittfLoadState.callChain.pop();
                utilnode.replace(item, includeResult.nodes);
                return callback(null)
                ;
            });
        });
    }, function(err,results) {
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
        callback(null, parsedIttfModel);
    });
};
function searchIncludes(item,includes,jsons) {
    if (item.name === '$include') {
        includes.push(item);
    }
    else if (item.name === '$json') {
        jsons.push(item);
    }
    var i, i_len=item.childs.length, child;
    for (i=0; i<i_len; i++) {
        child = item.childs[i];
        searchIncludes(child, includes, jsons);
    }
}

function normalizeNode(node,parent,model,r,c,u) {
    node.parent = parent;
    node.model = model;
    node.row = r;
    node.col = c;
    node.souceKey = u;
    if (node.childs) {
        var i, i_len=node.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = node.childs[i];
            normalizeNode(item, node, model, r, c, u);
        }
    }
    else {
        node.childs = [];
    }
}


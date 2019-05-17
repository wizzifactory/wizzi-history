var util = require('util');
var path = require('path');
var errors = require('../errors');
var verify = require('../util/verify');
var fail = require('../util/fail');
var utilnode = require('../util/node');
var log = require('../util/log')(module);
/*
    ittf commands:
        $include
        $json
*/
var includer = module.exports = function (ittfDocumentTree, ittfLoadState, callback) {
    var includes = [];
    var jsons = [];
    for (var i = 0, l = ittfDocumentTree.nodes.length; i < l; i++) {
        node = ittfDocumentTree.nodes[i];
        // console.log('Ittf.Includer.start', wizzi.utilnode.getDump(item));
        searchIncludes(ittfDocumentTree.nodes[i], includes, jsons);
    }
    // console.log('Ittf.Includer.includes', util.inspect(includes, { depth: 1 }));
    // apply includes
    includes.forEach(function (item) {
        // console.log('Ittf.Includer.item', util.inspect(item, { depth: 1 }));
        var v = item.value.trim();
        // console.log('Ittf.Includer.value', v);
        var calleruri = item.model.uri;
        var callerbasedir = path.dirname(calleruri);
        // console.log('Ittf.Includer.calleruri,callerbasedir,v', calleruri, callerbasedir, v);
        // load the ittf document to include
        ittfLoadState.provider.get({
            from: 'store',
            basedir: callerbasedir,
            relpath: v,
            include: true,
            includerModelKey: item.model.modelKey
        }, function (err, includedDocumentTree) {
            if (err) { return callback(err); }
            ittfLoadState.callChain.push({
                caller: calleruri,
                callee: includedDocumentTree.uri
            });
            if (ittfLoadState.checkForLoops()) {
                var error = new errors.IttfLoadError('Recursive mixin or include: ' + v, includedDocumentTree.uri, node, new Error());
                fail.warn(error.message);
                return callback(error);
            }
            includer(includedDocumentTree, ittfLoadState, function (err, includeResult) {
                if (err) { return callback(err); }
                ittfLoadState.callChain.pop();
                utilnode.replace(item, includeResult.nodes);
            });
        });
    });
    // parse stringified ittf nodes and replace the $json node with them
    // console.log('IttfAppender.jsons', util.inspect(jsons, { depth: 1 }));
    jsons.forEach(function (item) {
        var json = JSON.parse(item.value);
        if (verify.isArray(json)) {
            var normalized = [];
            json.forEach(function (jsonitem) {
                normalized.push(
                    normalizeNode(jsonitem, item.parent, item.model, item.row, item.col, item.souceKey)
                    );
            });
            utilnode.replace(item, normalized);
        } else {
            var normalized = normalizeNode(json, item.parent, item.model, item.row, item.col, item.souceKey);
            utilnode.replace(item, [normalized]);
        }
    });
    callback(null, ittfDocumentTree);
};
function searchIncludes(item, includes, jsons) {
    if (item.name === '$include') {
        includes.push(item);
    } else if (item.name === '$json') {
        jsons.push(item);
    }
    for (var i = 0, l = item.childs.length; i < l; i++) {
        searchIncludes(item.childs[i], includes, jsons);
    };
};
function normalizeNode(node, parent, model, r, c, u) {
    node.parent = parent;
    node.model = model;
    node.row = r;
    node.col = c;
    node.souceKey = u;
    if (node.childs) {
        node.childs.forEach(function (item) {
            normalizeNode(item, node, model, r, c);
        });
    } else {
        node.childs = []
    }
}

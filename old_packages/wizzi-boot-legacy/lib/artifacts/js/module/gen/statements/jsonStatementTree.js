var util = require('util');
var verify = require('../../../../../util/verify');
var jsschema = require('../../../../../wizzi/models/js-model.g');
var md = module.exports = {};
md.getStatements = function (model) {
    var ret = [];
    var json = JSON.parse(model.wzName);
    if (verify.isArray(json)) {
        json.forEach(function (jsonitem) {
            ret.push(normalizeJSTNode(jsonitem, model.wzParent));
        });
        utilnode.replace(item, normalized);
    } else {
        ret.push(
            normalizeJSTNode(json, model.wzParent)
        );
    }
    // console.log('jsonStatementTree.getStatements', util.inspect(ret, { depth: 2 }));
    return ret;
}
function normalizeJSTNode(node, parent) {
    node.wzParent = parent;
    node.wzTag = node.n;
    if (jsschema.__tagElementMapping[node.n]) {
        node.wzElement = jsschema.__tagElementMapping[node.n];
    } else {
        node.wzElement = node.n;
    }
    node.wzName = node.v;
    node.statements = []
    if (node.childs) {
        node.childs.forEach(function (item) {
            node.statements.push(normalizeJSTNode(item, node));
        });
    }
    return node;
}

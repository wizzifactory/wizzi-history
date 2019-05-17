/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\js\module\gen\statements\jsonStatementTree.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var verify = require('../../../../../util/verify');
var jsschema = require('../../../../../wizzi/models/js-model.g');
var md = module.exports = {};
md.getStatements = function(model) {
    var ret = [];
    var json = JSON.parse(model.wzName)
    ;
    if (verify.isArray(json)) {
        var i, i_len=json.length, jsonitem;
        for (i=0; i<i_len; i++) {
            jsonitem = json[i];
            ret.push(normalizeJSTNode(jsonitem, model.wzParent)
            );
        }
        utilnode.replace(item, normalized);
    }
    else {
        ret.push(normalizeJSTNode(json, model.wzParent)
        );
    }
    return ret;
};
function normalizeJSTNode(node,parent) {
    node.wzParent = parent;
    node.wzTag = node.n;
    if (jsschema.__tagElementMapping[node.n]) {
        node.wzElement = jsschema.__tagElementMapping[node.n];
    }
    else {
        node.wzElement = node.n;
    }
    node.wzName = node.v;
    node.statements = [];
    var i, i_len=node.childs.length, item;
    for (i=0; i<i_len; i++) {
        item = node.childs[i];
        node.statements.push(normalizeJSTNode(item, node));
    }
    return node;
}


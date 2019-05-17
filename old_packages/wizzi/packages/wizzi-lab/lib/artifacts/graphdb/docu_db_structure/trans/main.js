/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-lab\src\ittf\lib\artifacts\graphdb\docu_db_structure\trans\main.js.ittf
    utc time: Tue, 14 Aug 2018 15:17:52 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var DocuDbNode = require('./docuDbNode');
var md = module.exports = {};
var myname = 'graphdb.docu_db_structure.main';
md.trans = function(model, ctx, callback) {
    var graphStructure = {
        name: model.wzName, 
        nodes: []
    };
    if (model.domainRootNodes.length == 1) {
        var domainRoot = model.domainRootNodes[0];
        if (domainRoot.relations.length == 1) {
            var ddn = new DocuDbNode(graphStructure, null, domainRoot, domainRoot.relations[0]);
            callback(null, orderStructure(graphStructure));
        }
        else {
            callback({
                message: 'The graphdb of a docu_db_structure must have one domainRootNode with one relation. ' +'In graphdb ' + model.wzName + ' found ' + domainRoot.relations.length + ' relations.'
            });
        }
    }
    else {
        callback({
            message: 'The graphdb of a docu_db_structure must have one domainRootNode. ' +'In graphdb ' + model.wzName + ' found ' + model.domainRootNodes.length + ' domainRootNodes.'
        });
    }
};
function orderStructure(graphStructure) {
    var check = {};
    var newNodes = [];
    while (true) {
        var done = true;
        var i, i_items=graphStructure.nodes, i_len=graphStructure.nodes.length, node;
        for (i=0; i<i_len; i++) {
            node = graphStructure.nodes[i];
            if (!check[node.name] && ( node.isRoot || check[node.startNode.name] )) {
                newNodes.push(node);
                check[node.name] = true;
                done = false;
            }
        }
        if (done) {
            graphStructure.nodes = newNodes;
            return graphStructure;
        }
    }
}

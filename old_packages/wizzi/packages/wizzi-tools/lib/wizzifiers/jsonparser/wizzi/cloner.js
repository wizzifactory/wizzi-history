/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\lib\wizzifiers\jsonparser\wizzi\cloner.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
function transform(node, options) {
    // log 'cloner.transform', node.tag, node.name
    var ret = {
        tag: node.tag, 
        name: node.name, 
        children: []
    };
    node.children.forEach(function(item) {
        var child = transform(item, options);
        if (child) {
            ret.children.push(child);
        }
    });
    return ret;
}
module.exports = function(ast, options) {
    return transform(ast, options);
};

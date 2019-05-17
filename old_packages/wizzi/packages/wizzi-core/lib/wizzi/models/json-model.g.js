/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\lib\wizzi\models\json-model.g.js.ittf
*/
'use strict';
/** -àà
     Pseudo schema json
*/
var util = require('util');
var verify = require('wizzi-utils').verify;
var errors = require('wizzi-utils').errors;

module.exports = function(mTree, ittfDocumentUri, request, callback) {
    // log 'wizzi-core.wizzi.models.json-model.g', mTree
    if (!(mTree.nodes && mTree.nodes.length == 1)) {
        return callback(error('Malformed mTree. Must have one root node. Found mTree.nodes: ' + mTree.nodes, {}));
    }
    var root = mTree.nodes[0];
    root.__mTree = mTree;
    if (root.n !== "{" && root.n !== "[") {
        return callback(error('The root node of a json ittf document must be : "{" or "[". Found: ' + root.n + ' ' + root.v, root));
    }
    if (root.n === "{") {
        var json = toJsonObject(root.children);
        if (json && json.__is_error) {
            console.log('__is_error ', json);
            return callback(json);
        }
    }
    else {
        var json = toJsonArray(root.children);
        if (json && json.__is_error) {
            console.log('__is_error ', json);
            return callback(json);
        }
    }
    return callback(null, json);
};
function toJsonObject(mTreeNodeChilds) {
    var ret = {}, value;
    if (mTreeNodeChilds) {
        var i, i_items=mTreeNodeChilds, i_len=mTreeNodeChilds.length, node;
        for (i=0; i<i_len; i++) {
            node = mTreeNodeChilds[i];
            if (node.n === '#') {
                // skip comment
            }
            else if (node.n === '{' || node.n === '[') {
                if (!node.v || node.v.length == 0) {
                    return error('A json object must contain property items. Found: ' + node.n + ' ' + node.v, node);
                }
                else {
                    if (node.n === '{') {
                        value = toJsonObject(node.children);
                        if (value && value.__is_error) {
                            return value;
                        }
                    }
                    else {
                        value = toJsonArray(node.children);
                        if (value && value.__is_error) {
                            return value;
                        }
                    }
                    ret[node.v] = value;
                }
            }
            else if (node.v && node.v.length > 0) {
                var value = jsonValue(node.v, node);
                if (value && value.__is_error) {
                    return value;
                }
                ret[node.n] = value;
                if (node.children && node.children.length > 0) {
                    return error('A json property node cannot have children nodes. Found: ' + node.n + ' ' + node.v + ' children.length: ' + node.children.length, node);
                }
            }
            else {
                if (!node.children || node.children.length == 0) {
                    return error('A json property must have a value or a child object or array. Found: ' + node.n + ' ' + node.v, node);
                }
                if (node.children[0].n === '{') {
                    var value = toJsonObject(node.children[0].children);
                    if (value && value.__is_error) {
                        return value;
                    }
                    ret[node.n] = value;
                }
                else if (node.children[0].n === '[') {
                    var value = toJsonArray(node.children[0].children);
                    if (value && value.__is_error) {
                        return value;
                    }
                    ret[node.n] = value;
                }
                else {
                    return error('A json property must have a value or a child object or array. Found: ' + node.n + ' ' + node.v + ' first child: ' + node.children[0].n + ' ' + node.children[0].v, node);
                }
            }
        }
    }
    return ret;
}
function toJsonArray(mTreeNodeChilds) {
    var ret = [];
    if (mTreeNodeChilds) {
        var i, i_items=mTreeNodeChilds, i_len=mTreeNodeChilds.length, node;
        for (i=0; i<i_len; i++) {
            node = mTreeNodeChilds[i];
            if (node.n === '#') {
                // skip comment
            }
            else if (node.n === '{') {
                var value = toJsonObject(node.children);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value);
            }
            else if (node.n === '[') {
                var value = toJsonArray(node.children);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value);
            }
            else if (node.v && node.v.length && isQuoted(node.n + ' ' + node.v) == false) {
                return error('A json array item must be an object, an array or a value not a property. Found: ' + node.n + ' ' + node.v, node);
            }
            else {
                var value = jsonValue(node.n + (verify.isNotEmpty(node.v) ? ' ' + node.v : ''), node);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value);
            }
        }
    }
    return ret;
}
function jsonValue(value, node) {
    var jsonString = "{ \"value\": " + check(value) + "}";
    try {
        var json = JSON.parse(jsonString);
        return json.value;
    } catch (ex) {
        return error('Error parsing json value. Message: ' + ex.message + '. Value: ' + value, node);
    }
}
function check(value) {
    if ((value.length > 1 && value[0] === "'" && value[value.length-1] === "'") || (value.length > 1 && value[0] === '"' && value[value.length-1] === '"')) {
        return "\"" + verify.replaceAll(verify.replaceAll(unquote(value), "\\", "\\\\"), '"', '\\"') + "\"";
    }
    else if (value.indexOf('"') > -1 && value.indexOf("'") > -1) {
        return "\"" + verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"') + "\"";
    }
    else {
        return value;
    }
}
function isQuoted(value) {
    if ((value.length > 1 && value[0] === "'" && value[value.length-1] === "'") || (value.length > 1 && value[0] === '"' && value[value.length-1] === '"')) {
        return true;
    }
    else {
        return value;
    }
}
function unquote(str) {
    return str.substr(1, str.length -2);
}
function error(message, node) {
    console.log('wizzi-core.wizzi.models.json-model.g.error', node);
    nodeInfo(node, message);
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/wizzi/models/json-model.g', 
            node: node.n + ' ' + node.v + ' pos: ' + node.r + ', ' + node.c, 
            message: message, 
            errorLines: nodeInfo(node, message)
        };
}
function nodeInfo(node, message) {
    return errors.getErrorLinesFromMTreeNode(node, message);
}

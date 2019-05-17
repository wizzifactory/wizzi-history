/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\appender.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var verify = require('../util/verify');
var util = require('util');
var errors = require('../errors');
var utilnode = require('../util/node');
/**
     Ittf commands
     $group
     $append
     $override
*/
module.exports = function(mixedMTreePiece, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(mixedMTreePiece) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mixedMTreePiece', message: 'The mixedMTreePiece parameter must be an object. Received: ' + mixedMTreePiece }
        ));
    }
    var appends = {};
    var groups = [];
    var overrides = [];
    var ctx = {
        id: 1
    };
    var i, i_len=mixedMTreePiece.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedMTreePiece.nodes[i];
        assignId(node, ctx);
    }
    var errors = [];
    var i, i_len=mixedMTreePiece.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedMTreePiece.nodes[i];
        searchAppend(node, node, appends, groups, overrides, errors);
        if (errors.length > 0) {
            return callback(errors[0])
            ;
        }
    }
    for (var key in appends) {
        var appobj = appends[key];
        utilnode.replace(appobj.appto, appobj.items);
    }
    for (var key in overrides) {
        var overobj = overrides[key];
        utilnode.replace(overobj.virt, overobj.items);
    }
    var i, i_len=groups.length, item;
    for (i=0; i<i_len; i++) {
        item = groups[i];
        if (!item.parent) {
            return callback(local_error('InvalidIttfError', 'default', "The tag $group must have a parent and cannot be the root of a primary ittf document. Hint: check for ittf fragments not in a tfolder.", item)
                )
            ;
        }
        utilnode.replace(item, item.children);
    }
    var toremove = [];
    var i, i_len=mixedMTreePiece.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedMTreePiece.nodes[i];
        searchPendingNodes(node, toremove);
    }
    var i, i_len=toremove.length, item;
    for (i=0; i<i_len; i++) {
        item = toremove[i];
        utilnode.remove(item);
    }
    callback(null, mixedMTreePiece);
};
function searchAppend(item, root, appends, groups, overrides, errors) {
    if (item.name === '$group') {
        groups.push(item);
    }
    else if (item.name === '$append') {
        if (!item.value) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', "The tag $append requires a node-value.", item)
            );
            return ;
        }
        var appto = utilnode.findHookExt(item, item.value.trim())
        ;
        if (appto == null) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', 'Cannot find hook ' + (item.value || '') + ', root is ' + root.name + ' ' + (root.value || '') + ', in ' + item.model.uri + ', remember that $hook/$append does not work between sibling nodes.' + 'After mixup the $hook node must be a parent node or a descendant of a parent node of $append' + ', but not a sibling node.', item)
            );
            return ;
        }
        var appobj = appends[item.id];
        if (appobj) {
            appobj.items = appobj.items.concat(item.children);
        }
        else {
            appobj = {
                appto: appto, 
                items: item.children
            };
            appends[item.id] = appobj;
        }
    }
    else if (item.name === '$override') {
        if (!(item.value)) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', "The tag $override requires a value.", item)
            );
            return ;
        }
        var virt = utilnode.findVirtual(item, item.value.trim())
        ;
        if (virt == null) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', 'Cannot find virtual to override ' + (item.value || '') + ', root is ' + root.name + ' ' + root.value, item)
            );
            return ;
        }
        var overobj = overrides[item.value];
        if (overobj) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', 'The virtual node ' + item.value + ' has already been overridden. Root is ' + root.name + ' ' + root.value, item)
            );
            return ;
        }
        else {
            overobj = {
                virt: virt, 
                over: item, 
                items: item.children
            };
            overrides[item.value] = overobj;
        }
    }
    var i, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        searchAppend(child, root, appends, groups, overrides, errors);
    }
}
function searchPendingNodes(item, toremove) {
    if (['$hook', '$append', '$override'].indexOf(item.name) >= 0) {
        toremove.push(item);
    }
    var i, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        searchPendingNodes(child, toremove);
    }
}
function assignId(item, ctx) {
    item._id = ctx.id++;
    var i, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        assignId(child, ctx);
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
        method: 'wizzi-mtree.loader.appender.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}

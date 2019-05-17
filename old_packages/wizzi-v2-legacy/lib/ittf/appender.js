/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\appender.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var errors = require('../errors');
var fail = require('../util/fail');
var utilnode = require('../util/node');
var log = require('../util/log')(module)

;
module.exports = function(mixedIttfModel,callback) {
    var appends = {};
    var groups = [];
    var overrides = [];
    var ctx = {
        id: 1
    };
    var i, i_len=mixedIttfModel.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedIttfModel.nodes[i];
        assignId(node, ctx);
    }
    var errors = [];
    var i, i_len=mixedIttfModel.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedIttfModel.nodes[i];
        searchAppend(node, node, appends, groups, overrides, errors);
        if (errors.length > 0) {
            callback(errors[0]);
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
        utilnode.replace(item, item.childs);
    }
    var toremove = [];
    var i, i_len=mixedIttfModel.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedIttfModel.nodes[i];
        searchPendingNodes(node, toremove);
    }
    var i, i_len=toremove.length, item;
    for (i=0; i<i_len; i++) {
        item = toremove[i];
        utilnode.remove(item);
    }
    callback(null, mixedIttfModel);
};
function searchAppend(item,root,appends,groups,overrides,errors) {
    if (item.name === '$group') {
        groups.push(item);
    }
    else if (item.name === '$append') {
        if (!item.value) {
            errors.push(error("The tag $append requires a value.", item)
            );
            return ;
        }
        var appto = utilnode.findHookExt(item, item.value.trim())
        ;
        if (appto == null) {
            errors.push(error('Cannot find hook ' + (item.value || '') + ', root is ' + root.name + ' ' + (root.value || '') + ', in ' + item.model.uri + ', remember that $hook/$append does not work between siebling nodes.' + 'After mixup the $hook node must be a parent node or a descendant of a parent node of $append' + ', but not a siebling node.', item)
            );
            return ;
        }
        var appobj = appends[item.id];
        if (appobj) {
            appobj.items = appobj.items.concat(item.childs);
        }
        else {
            appobj = {
                appto: appto, 
                items: item.childs
            };
            appends[item.id] = appobj;
        }
    }
    else if (item.name === '$override') {
        if (! (item.value)) {
            errors.push(error("The tag $override requires a value.", item)
            );
            return ;
        }
        var virt = utilnode.findVirtual(item, item.value.trim())
        ;
        if (virt == null) {
            errors.push(error('Cannot find virtual to override ' + (item.value || '') + ', root is ' + root.name + ' ' + root.value, item)
            );
            return ;
        }
        var overobj = overrides[item.value];
        if (overobj) {
            errors.push(error('The virtual node ' + item.value + ' has already been overridden. Root is ' + root.name + ' ' + root.value, item)
            );
            return ;
        }
        else {
            overobj = {
                virt: virt, 
                over: item, 
                items: item.childs
            };
            overrides[item.value] = overobj;
        }
    }
    var i, i_len=item.childs.length, child;
    for (i=0; i<i_len; i++) {
        child = item.childs[i];
        searchAppend(child, root, appends, groups, overrides, errors);
    }
}

function searchPendingNodes(item,toremove) {
    if (['$hook', '$append', '$override'].indexOf(item.name) >= 0) {
        toremove.push(item);
    }
    var i, i_len=item.childs.length, child;
    for (i=0; i<i_len; i++) {
        child = item.childs[i];
        searchPendingNodes(child, toremove);
    }
}

function assignId(item,ctx) {
    item._id = ctx.id++;
    var i, i_len=item.childs.length, child;
    for (i=0; i<i_len; i++) {
        child = item.childs[i];
        assignId(child, ctx);
    }
}

function error(message,node) {
    if (node && node.name) {
        console.log('************************* node', node);
        return {
                __is_error: true, 
                message: message, 
                nodeInfo: 'Node ' + node.name + ' ' + (node.value || '') + ' row: ' + node.row + ' col: ' + node.col, 
                document: node.model.uri
            };
    }
    else {
        return {
                __is_error: true, 
                message: message
            };
    }
}


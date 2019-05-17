var util = require('util');
var errors = require('../errors');
var fail = require('../util/fail');
var utilnode = require('../util/node');
var log = require('../util/log')(module);
/*
    $group
    $append [label]
    $hook [label]
    $override [$id]
*/
module.exports = function (primaryModel) {
    var appends = {};
    var groups = [];
    var overrides = [];
    var ctx = { id: 1};
    for (var node, i = 0, l = primaryModel.nodes.length; i < l; i++) {
        assignId(primaryModel.nodes[i], ctx);
    }
    
    for (var node, i = 0, l = primaryModel.nodes.length; i < l; i++) {
        node = primaryModel.nodes[i];
        // console.log('IttfAppender.start', utilnode.getDump(item));
        searchAppend(node, node, appends, groups, overrides);
    }
    // console.log('IttfAppender.appends', util.inspect(appends, { depth: 1 }));
    // apply appends replacing hooks
    for (var key in appends) {
        var appobj = appends[key];
        utilnode.replace(appobj.appto, appobj.items);
    }
    // apply overrides replacing virtuals
    for (var key in overrides) {
        var overobj = overrides[key];
        utilnode.replace(overobj.virt, overobj.items);
    }
    // apply grouping
    // console.log('IttfAppender.groups', util.inspect(groups, { depth: 1 }));
    groups.forEach(function (item) {
        utilnode.replace(item, item.childs);
    });
    // At this point the tree is built.
    // Search pending hooks that can be removed.
    var toremove = [];
    primaryModel.nodes.forEach(function (item) {
        searchPendingNodes(item, toremove);
    });
    // remove pending hooks
    // console.log('IttfAppender.beforeRemove', utilnode.getDump(primaryModel.nodes[0]));
    toremove.forEach(function (item) {
        utilnode.remove(item);
        // console.log('IttfAppender.removed', util.inspect(item, { depth: 1 }));
    });
    // console.log('IttfAppender.afterRemove', utilnode.getDump(primaryModel.nodes[0]));
    return primaryModel;
};
function searchAppend(item, root, appends, groups, overrides) {
    if (item.name === '$group') {
        groups.push(item);
    } else if (item.name === '$append') {
        if (!item.value) {
            throw new Error(
                "The tag $append requires a value." +
                "\nNode " + item.name + ' ' + (item.value || '') + ' row: ' + item.row + ' col: ' + item.col +
                "\nDocument: " + item.model.uri
                );
        }
        // if (item.value == "attrs") console.log('searchAppend.item', item.id, item.value);
        // console.log('searchAppend.item.name,value', item.name, item.value);
        //OLD var appto = utilnode.findHook(root, item.value.trim());
        //if (item.value.trim() === 'code-js') {
        //    console.log('searchAppend', item.name, item.value, item.parent.name);
        //}
        var appto = utilnode.findHookExt(item, item.value.trim());
        // console.log('IttfAppender.searchAppend.appto', appto);
        if (appto == null) {
            /*
            var error = new errors.IttfLoadError('Recursive mixin or include: ' + v, includedDocumentTree.uri)
            fail.warn(error.message);
            return callback(error);
            */
            throw new Error(
                'Cannot find hook ' + (item.value || '') + ', root is ' + root.name + ' ' + root.value +
                "\nNode " + item.name + ' ' + (item.value || '') + ' row: ' + item.row + ' col: ' + item.col +
                "\nDocument: " + item.model.uri
                );
        }
        var appobj = appends[item.id];
        if (appobj) {
            // the hook already has appends, add the new ones
            appobj.items = appobj.items.concat(item.childs);
        } else {
            // the hook has no append yet, add the first ones
            appobj = {
                appto: appto,
                items: item.childs
            };
            appends[item.id] = appobj;
        }
        // appends.push({ item: item, appto: appto });
    } else if (item.name === '$override') {
        if (!item.value) {
            throw new Error(
                "The tag $override requires a value." +
                "\nNode " + item.name + ' ' + (item.value || '') + ' row: ' + item.row + ' col: ' + item.col +
                "\nDocument: " + item.model.uri
                );
        }
        var virt = utilnode.findVirtual(item, item.value.trim());
        // console.log('IttfAppender.searchAppend.appto', appto);
        if (virt == null) {
            throw new Error(
                'Cannot find virtual to override ' + (item.value || '') + ', root is ' + root.name + ' ' + root.value +
                "\nNode " + item.name + ' ' + (item.value || '') + ' row: ' + item.row + ' col: ' + item.col +
                "\nDocument: " + item.model.uri
                );
        }
        var overobj = overrides[item.value];
        if (overobj) {
            // the virtual has already been overridden
            // TODO say by which node (row, col, file)
            throw new Error(
                'The virtual node ' + item.value + ' has already been overridden. Root is ' + root.name + ' ' + root.value +
                "\nNode " + item.name + ' ' + (item.value || '') + ' row: ' + item.row + ' col: ' + item.col +
                "\nDocument: " + item.model.uri
                );
        } else {
            // the hook has no append yet, add the first ones
            overobj = {
                virt: virt,
                over: item,
                items: item.childs
            };
            overrides[item.value] = overobj;
        }
    }
    for (var child, i = 0, l = item.childs.length; i < l; i++) {
        child = item.childs[i];
        searchAppend(child, root, appends, groups, overrides);
    };
};
function searchPendingNodes(item, toremove) {
    if (['$hook', '$append', '$override'].indexOf(item.name) >= 0) {
        toremove.push(item);
    }
    for (var child, i = 0, l = item.childs.length; i < l; i++) {
        child = item.childs[i];
        searchPendingNodes(child, toremove);
    };
};
function assignId(item, ctx) {
    item._id = ctx.id++;
    for (var child, i = 0, l = item.childs.length; i < l; i++) {
        child = item.childs[i];
        assignId(child, ctx);
    };
};

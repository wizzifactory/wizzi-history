var util = require('util');
var path = require('path');
var async = require('async');
var errors = require('../errors');
var verify = require('../util/verify');
var fail = require('../util/fail');
var log = require('../util/log')(module);
var includer = require('./includer');
var utilnode = require("../util/node");
module.exports = function (primaryModel, ittfLoadState, callback) {
    primaryModel.mixed = false;
    mixNodeCollection(primaryModel.nodes, null, function (err, mixedNodes) {
        if (err) { return callback(err); }
        primaryModel.nodes = mixedNodes;
        return callback(null, primaryModel);
    });
    function mixNodeCollection(callerNodes, resultingNodes_Parent, callback) {
        var mixedNodesAccumulator = []; // mixed nodes top level accumulator
        var l = callerNodes.length;
        function repeater(index) {
            if (index === l) {
                return callback(null, mixedNodesAccumulator);
            }
            mixNode(callerNodes[index], function (err, mixedNodes) {
                if (err) { return callback(err); }
                appendItemsToCollection(mixedNodes, mixedNodesAccumulator, resultingNodes_Parent);
                process.nextTick(function () { repeater(index + 1) });
            });
        }
        repeater(0);
    }
    /*
        params
            callerNode: Object - may contain a mixin call if name ends with '('; example: class()  
        If the callerNode is a mixin call
          fetches the callee document and mixes it
        else
          go down and execute the mix operation on the childs nodes of the callerNode.
    */
    function mixNode(callerNode, callback) {
        var isMixinCall = false;
        if (callerNode.tagSuffix === '(') {
            if (utilnode.isParentOfName(callerNode, ['$', '$global']) == false) {
                isMixinCall = true;
            } else {
                // is not a mixin call, restore the callerNode name 
                callerNode.name += callerNode.tagSuffix;
                callerNode.tagSuffix = null;
            }
        }
        if (isMixinCall) { // callerNode contains a MIXIN call
            var v = callerNode.value.trim();
            if (v.substr(-1, 1) === ')') {
                callerNode.value = v.substring(0, v.length - 1);
            }
            // console.log('Mix.tagSuffix === (', callerNode.name, callerNode.value, callerNode.$params, callerNode.parent);
            var calleruri = callerNode.model.uri;
            var callerbasedir = path.dirname(calleruri);
            // console.log('mixer', calleruri, callerbasedir);
            // load the parsed ittfModel of the mixin (the callee)
            ittfLoadState.provider.get({
                from: 'store',
                basedir: callerbasedir,
                relpath: callerNode.name
            }, function (err, calleeParsedIttfModel) {
                if (err) { return callback(err); }
                // calleeParsedIttfModel is a cloned ittfModel
                ittfLoadState.callChain.push({
                    caller: calleruri,
                    callee: calleeParsedIttfModel.uri
                });
                if (ittfLoadState.checkForLoops()) {
                    var error = new errors.IttfLoadError('Recursive mixin or include: ' + callerNode.name, calleeParsedIttfModel.uri, callerNode, new Error());
                    fail.warn(error.message);
                    return callback(error);
                }
                // before mixing the callee ittfModel reselve its eventual includes
                includer(calleeParsedIttfModel, ittfLoadState, function (err, calleeIncludedIttfModel) {
                    if (err) { return callback(err); }
                    // calleeIncludedIttfModel is the calleeParsedIttfModel with $include(s) resolved
                    mixCalleeRootNodes(calleeIncludedIttfModel.nodes, callerNode, function (err, mixedNodes) {
                        if (err) { return callback(err); }
                        ittfLoadState.callChain.pop();
                        // console.log('ittfLoadState.callChain after pop', ittfLoadState.callChain)
                        callback(null, mixedNodes);
                    });
                });
            });
        } else if (callerNode.name === '$.') { // callerNode is a TEXT CONTAINER (CDATA)
            if (callerNode.childs.length > 0) {
                callerNode.value = utilnode.textToLine(callerNode);
                callerNode.childs = [];
            }
            return callback(null, [callerNode]); // TODO append to parent lines
        } else { // callerNode IS NOT a mixin call
            // but its childs could contain mixin calls
            // so analyze and mix its childs before returning it
            mixNodeCollection(callerNode.childs, callerNode, function (err, mixedNodes) {
                if (err) { return callback(err); }
                callerNode.childs = mixedNodes;
                // return a node collection with callerNode as the only element
                return callback(null, [callerNode]);
            });
        }
    }
    function mixCalleeRootNodes(calleeRootNodes, callerNode, callback) {
        var calleeRootNode,
            l = calleeRootNodes.length,
            mixedNodesAccumulation = [];
        // The calleeParsedIttfModel may contain multiple root nodes.
        // The $group command is used as the root node of an IttfDocument
        // when multiple root nodes have to be declared.
        // So the repeater function execute the mixup of every child node of the calleeParsedIttfModel
        // and accumulates the resulting mixed nodes in the var "mixedNodesAccumulation"
        function repeater(index) {
            if (index === l) {
                // we are done, return the result
                return callback(null, mixedNodesAccumulation);
            }
            calleeRootNode = calleeRootNodes[index]; // is a root node of the mixin
            // TODO to set $args and $mixerModelKey on calleeRootNodes should be the same and more clear
            //      THEY ARE NOT SET ON ROOT NODES BUT ON THE MODEL
            // sets the caller args for the evaluation step (see ./evaluator.js)
            calleeRootNode.model.$args = callerNode.value; // set caller args
            calleeRootNode.model.$mixerModelKey = callerNode.model.modelKey; // set caller modelKey
            // console.log('IttfMixer.mixCalleeRootNodes', calleeRootNode);
            primaryModel.mixed = true; 
            // search a default hook inside the calleeRootNode
            var hook = utilnode.findIttfCommand(calleeRootNode, 'default', 'hook'); // search a hook in the calleeRootNode tree
            // console.log('IttfMixer.Mix.hook', util.inspect(hook, { depth: 2 }));
            // The callerNode.childs, when mixed, must be added to
            // each calleeRootNode.
            mixNodeCollection(callerNode.childs, calleeRootNode, function (err, mixedNodes) {
                if (err) { return callback(err); }
                if (hook) { // found default hook
                    // the caller node childs must replace the $hook node
                    // utilnode.replace will set the parent of the nodes of 
                    // mixedNodes to the parent of hook 
                    utilnode.replace(hook, mixedNodes);
                } else { // default hook not found
                    // the caller node childs must be
                    // appended to the last child of the calleeRootNode
                    // the calleeRootNode becomes the parent of the caller node childs.
                    for (var item, i = 0, l = mixedNodes.length; i < l; i++) {
                        calleeRootNode.childs.push(mixedNodes[i]);
                    }
                }
                // It seams we are done, but there is a notch.
                // calleeRootNode could contain itself a mixin call.
                // It must be analyzed and mixed if the case.
                // set the callerNode.parent as its parent
                // and add it to the resultMixedNodes collection
                mixNode(calleeRootNode, function (err, mixedNodes) {
                    if (err) { return callback(err); }
                    appendItemsToCollection(mixedNodes, mixedNodesAccumulation, callerNode.parent);
                    repeater(index + 1); // process the next root node of the mixin, if any
                });
            });
        }
        repeater(0);
    }
    function appendItemsToCollection(items, collection, parent) {
        for (var item, i = 0, l = items.length; i < l; i++) {
            item = items[i];
            if (parent) {
                item.parent = parent;
            }
            collection.push(item);
        }
    }
}

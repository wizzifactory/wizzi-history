/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\mixer.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var verify = require('../util/verify');
var util = require('util');
var path = require('path');
var assert = require('assert');
var async = require('async');
var errors = require('../errors');
var includer = require('./includer');
var utilnode = require("../util/node");
module.exports = function(mTreePiece, mTreeBrickProvider, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(mTreePiece) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mTreePiece', message: 'The mTreePiece parameter must be an object. Received: ' + mTreePiece }
        ));
    }
    if (verify.isObject(mTreeBrickProvider) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mTreeBrickProvider', message: 'The mTreeBrickProvider parameter must be an object. Received: ' + mTreeBrickProvider }
        ));
    }
    assert.equal(mTreeBrickProvider.__type, 'MTreeBrickProvider', 'param mTreeBrickProvider must be of type MTreeBrickProvider');
    mTreePiece.mixed = false;
    mixNodeCollection(mTreePiece.nodes, null, function(err, mixedNodes) {
        if (err) {
            return callback(err)
            ;
        }
        mTreePiece.nodes = mixedNodes;
        return callback(null, mTreePiece);
    });
    function mixNodeCollection(mixerNodes, resultingNodes_Parent, callback) {
        var mixedNodesAccumulator = [];
        var len = mixerNodes.length;
        function repeater(index) {
            if (index === len) {
                return callback(null, mixedNodesAccumulator);
            }
            mixNodeIfTheCase(mixerNodes[index], function(err, mixedNodes) {
                if (err) {
                    return callback(err)
                    ;
                }
                appendItemsToCollection(mixedNodes, mixedNodesAccumulator, resultingNodes_Parent);
                process.nextTick(function() {
                    repeater(index + 1);
                });
            });
        }
        repeater(0);
    }
    /**
         params
         mixerNode: Object - may contain a mixin call if name ends with '('; example: class()
         If the mixerNode is a mixin call
         fetches the mixed document and mixes it
         else
         go down and execute the mix operation on the children nodes of the mixerNode.
    */
    function mixNodeIfTheCase(mixerNode, callback) {
        var isMixinCall = false;
        if (mixerNode.tagSuffix === '(') {
            if (utilnode.isParentOfName(mixerNode, ['$', '$global']) == false) {
                isMixinCall = true;
            }
            else {
                mixerNode.name += mixerNode.tagSuffix;
                mixerNode.tagSuffix = null;
            }
        }
        if (isMixinCall) {
            // mixerNode.name is the name of the mixin to include (IttfFragment)
            // mixerNode.value is a comma separated list of arguments of the mixin call
            // mixerNode.model.uri is the mixer IttfDocument uri; its folder is the base path
            // for resolving the uri of the mixin
            var args = mixerNode.value.trim();
            if (args.substr(-1, 1) === ')') {
                mixerNode.value = args.substring(0, args.length - 1);
            }
            var mixeruri = mixerNode.model.uri;
            var mixerbasedir = path.dirname(mixeruri);
            /**
                load the parsed mTreeBrickModel of the mixin (we name it 'the mixed')
            */
            mTreeBrickProvider.get({
                from: 'store', 
                basedir: mixerbasedir, 
                relpath: mixerNode.name
            }, function(err, mixedWipNodifiedMTree) {
                if (err) {
                    return callback(err)
                    ;
                }
                mTreeBrickProvider.enterFragmentCall(mixeruri, mixedWipNodifiedMTree.uri);
                if (mTreeBrickProvider.checkForRecursion()) {
                    return callback(local_error('InvalidIttfError', 'default', 'Recursive mixin or include: ' + mixerNode.name, mixerNode)
                        )
                    ;
                }
                // before mixing the mixed parsedMTree
                // resolve its eventual includes
                includer(mixedWipNodifiedMTree, mTreeBrickProvider, function(err, mixedIncludedMTree) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    // now mix the mixed root nodes
                    mixCalleeRootNodes(mixedIncludedMTree.nodes, mixerNode, function(err, mixedNodes) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        mTreeBrickProvider.exitFragmentCall();
                        callback(null, mixedNodes);
                    });
                });
            });
        }
        else if (mixerNode.name === '$.') {
            // mixerNode is a TEXT CONTAINER (CDATA)
            if (mixerNode.children.length > 0) {
                mixerNode.value = utilnode.textToLine(mixerNode);
                mixerNode.children = [];
            }
            return callback(null, [
                    mixerNode
                ])
            ;
        }
        else {
            // mixerNode IS NOT a mixin call
            // but its children could contain mixin calls
            // so analyze and mix its children before returning it
            mixNodeCollection(mixerNode.children, mixerNode, function(err, mixedNodes) {
                if (err) {
                    return callback(err)
                    ;
                }
                mixerNode.children = mixedNodes;
                // return a node collection with mixerNode as the only element
                return callback(null, [
                        mixerNode
                    ])
                ;
            });
        }
    }
    function mixCalleeRootNodes(mixedRootNodes, mixerNode, callback) {
        var mixedRootNode,
            len = mixedRootNodes.length,
            mixedNodesAccumulation = [];
        /**
             The mixedWipNodifiedMTree may contain multiple root nodes.
             The $group command is used as the root node of an IttfDocument
             when multiple root nodes have to be declared.
             So the repeater function execute the mixup of every child node of the mixedWipNodifiedMTree
             and accumulates the resulting mixed nodes in the var "mixedNodesAccumulation"
        */
        function repeater(index) {
            if (index === len) {
                // we are done, return the result
                return callback(null, mixedNodesAccumulation);
            }
            mixedRootNode = mixedRootNodes[index];
            // TODO to set $args and $mixerBrickKey on mixedRootNodes should be the same and more clear
            // THEY ARE NOT SET ON ROOT NODES BUT ON THE MODEL
            // sets the mixer args for the evaluation step (see ./evaluator.js)
            mixedRootNode.model.$args = mixerNode.value;
            mixedRootNode.model.$mixerBrickKey = mixerNode.model.brickKey;
            mTreePiece.mixed = true;
            // search a default hook inside the mixedRootNode
            var hook = utilnode.findIttfCommand(mixedRootNode, 'default', 'hook');
            // The mixerNode.children, when mixed,
            // must be added to each mixedRootNode.
            mixNodeCollection(mixerNode.children, mixedRootNode, function(err, mixedNodes) {
                if (err) {
                    return callback(err)
                    ;
                }
                if (hook) {
                    // A default hook was found,
                    // the mixer node children must replace the $hook node;
                    // utilnode.replace will set the parent of the nodes of
                    // mixedNodes to the parent of hook.
                    utilnode.replace(hook, mixedNodes);
                }
                else {
                    // A default hook was not found,
                    // the mixer node children must be
                    // appended to the last child of the mixedRootNode;
                    // the mixedRootNode becomes the parent of the mixer node children.
                    var i, i_len=mixedNodes.length, item;
                    for (i=0; i<i_len; i++) {
                        item = mixedNodes[i];
                        mixedRootNode.children.push(item);
                    }
                }
                /**
                     It seams we are done, but there is a notch.
                     mixedRootNode could contain itself a mixin call.
                     It must be analyzed and mixed if the case.
                     Set the mixerNode.parent as its parent
                     and add it to the resultMixedNodes collection.
                */
                mixNodeIfTheCase(mixedRootNode, function(err, mixedNodes) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    appendItemsToCollection(mixedNodes, mixedNodesAccumulation, mixerNode.parent);
                    process.nextTick(function() {
                        repeater(index + 1);
                    });
                });
            });
        }
        repeater(0);
    }
    function appendItemsToCollection(items, collection, parent) {
        var i, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            if (parent) {
                item.parent = parent;
            }
            collection.push(item);
        }
    }
};
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
        method: 'wizzi-mtree.loader.mixer.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}

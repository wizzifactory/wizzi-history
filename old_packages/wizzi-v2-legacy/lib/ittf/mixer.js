/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\mixer.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var errors = require('../errors');
var verify = require('../util/verify');
var fail = require('../util/fail');
var log = require('../util/log')(module)

;
var includer = require('./includer');
var utilnode = require("../util/node");
module.exports = function(includedIttfModel,ittfLoadState,callback) {
    includedIttfModel.mixed = false;
    mixNodeCollection(includedIttfModel.nodes, null, function(err,mixedNodes) {
        if (err) {
            return callback(err)
            ;
        }
        includedIttfModel.nodes = mixedNodes;
        return callback(null, includedIttfModel);
    });
    function mixNodeCollection(callerNodes,resultingNodes_Parent,callback) {
        var mixedNodesAccumulator = [];
        var len = callerNodes.length;
        function repeater(index) {
            if (index === len) {
                return callback(null, mixedNodesAccumulator);
            }
            mixNodeIfTheCase(callerNodes[index], function(err,mixedNodes) {
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
         callerNode: Object - may contain a mixin call if name ends with '('; example: class()
         If the callerNode is a mixin call
         fetches the callee document and mixes it
         else
         go down and execute the mix operation on the childs nodes of the callerNode.
    */
    function mixNodeIfTheCase(callerNode,callback) {
        var isMixinCall = false;
        if (callerNode.tagSuffix === '(') {
            if (utilnode.isParentOfName(callerNode, ['$', '$global']) == false) {
                isMixinCall = true;
            }
            else {
                callerNode.name += callerNode.tagSuffix;
                callerNode.tagSuffix = null;
            }
        }
        if (isMixinCall) {
            // callerNode.name is the name of the mixin to include (IttfFragment)
            // callerNode.value is a comma separated list of arguments of the mixin call
            // callerNode.model.uri is the caller IttfDocument uri; its folder is the base path
            // for resolving the uri of the mixin
            var args = callerNode.value.trim();
            if (args.substr(-1, 1) === ')') {
                callerNode.value = args.substring(0, args.length - 1);
            }
            var calleruri = callerNode.model.uri;
            var callerbasedir = path.dirname(calleruri);
            /**
                load the parsed ittfModel of the mixin (we name it 'the callee')
            */
            ittfLoadState.provider.get({
                from: 'store', 
                basedir: callerbasedir, 
                relpath: callerNode.name
            }, function(err,calleeParsedIttfModel) {
                if (err) {
                    return callback(err)
                    ;
                }
                ittfLoadState.callChain.push({
                    caller: calleruri, 
                    callee: calleeParsedIttfModel.uri
                });
                if (ittfLoadState.checkForLoops()) {
                    var error = new errors.IttfLoadError(('Recursive mixin or include: ' + callerNode.name), calleeParsedIttfModel.uri, callerNode, new Error());
                    fail.warn(error.message);
                    return callback(error);
                }
                // before mixing the callee parsedIttfModel
                // resolve its eventual includes
                includer(calleeParsedIttfModel, ittfLoadState, function(err,calleeIncludedIttfModel) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    // now mix the callee root nodes
                    mixCalleeRootNodes(calleeIncludedIttfModel.nodes, callerNode, function(err,mixedNodes) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        ittfLoadState.callChain.pop();
                        callback(null, mixedNodes);
                    });
                });
            });
        }
        else if (callerNode.name === '$.') {
            // callerNode is a TEXT CONTAINER (CDATA)
            if (callerNode.childs.length > 0) {
                callerNode.value = utilnode.textToLine(callerNode);
                callerNode.childs = [];
            }
            return callback(null, [
                    callerNode
                ])
            ;
        }
        else {
            // callerNode IS NOT a mixin call
            // but its childs could contain mixin calls
            // so analyze and mix its childs before returning it
            mixNodeCollection(callerNode.childs, callerNode, function(err,mixedNodes) {
                if (err) {
                    return callback(err)
                    ;
                }
                callerNode.childs = mixedNodes;
                // return a node collection with callerNode as the only element
                return callback(null, [
                        callerNode
                    ])
                ;
            });
        }
    }
    function mixCalleeRootNodes(calleeRootNodes,callerNode,callback) {
        var calleeRootNode,
            len = calleeRootNodes.length,
            mixedNodesAccumulation = [];
        /**
             The calleeParsedIttfModel may contain multiple root nodes.
             The $group command is used as the root node of an IttfDocument
             when multiple root nodes have to be declared.
             So the repeater function execute the mixup of every child node of the calleeParsedIttfModel
             and accumulates the resulting mixed nodes in the var "mixedNodesAccumulation"
        */
        function repeater(index) {
            if (index === len) {
                // we are done, return the result
                return callback(null, mixedNodesAccumulation);
            }
            calleeRootNode = calleeRootNodes[index];
            // TODO to set $args and $mixerModelKey on calleeRootNodes should be the same and more clear
            // THEY ARE NOT SET ON ROOT NODES BUT ON THE MODEL
            // sets the caller args for the evaluation step (see ./evaluator.js)
            calleeRootNode.model.$args = callerNode.value;
            calleeRootNode.model.$mixerModelKey = callerNode.model.modelKey;
            includedIttfModel.mixed = true;
            // search a default hook inside the calleeRootNode
            var hook = utilnode.findIttfCommand(calleeRootNode, 'default', 'hook');
            // The callerNode.childs, when mixed,
            // must be added to each calleeRootNode.
            mixNodeCollection(callerNode.childs, calleeRootNode, function(err,mixedNodes) {
                if (err) {
                    return callback(err)
                    ;
                }
                if (hook) {
                    // A default hook was found,
                    // the caller node childs must replace the $hook node;
                    // utilnode.replace will set the parent of the nodes of
                    // mixedNodes to the parent of hook.
                    utilnode.replace(hook, mixedNodes);
                }
                else {
                    // A default hook was not found,
                    // the caller node childs must be
                    // appended to the last child of the calleeRootNode;
                    // the calleeRootNode becomes the parent of the caller node childs.
                    var i, i_len=mixedNodes.length, item;
                    for (i=0; i<i_len; i++) {
                        item = mixedNodes[i];
                        calleeRootNode.childs.push(item);
                    }
                }
                /**
                     It seams we are done, but there is a notch.
                     calleeRootNode could contain itself a mixin call.
                     It must be analyzed and mixed if the case.
                     Set the callerNode.parent as its parent
                     and add it to the resultMixedNodes collection.
                */
                mixNodeIfTheCase(calleeRootNode, function(err,mixedNodes) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    appendItemsToCollection(mixedNodes, mixedNodesAccumulation, callerNode.parent);
                    repeater(index + 1);
                });
            });
        }
        repeater(0);
    }
    function appendItemsToCollection(items,collection,parent) {
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

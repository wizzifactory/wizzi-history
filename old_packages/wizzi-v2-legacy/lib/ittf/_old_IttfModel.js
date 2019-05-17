/*
    An IttfModel is a parsed IttfDocument.
    The load method parses an IttfDocument content into a 'nodes' array.
    In the build-up of an Ittf model, the same Ittf document can be mixed 
    or included many times, so it is cloned when mixed or included.
    // TODO Actualy the nodes do not require cloning,
    //      only passed $args, and evalContext require separated objects.
    //      But on each cloned node is set the cloned IttfModel
*/
var util = require('util');
var errors = require('../errors');
var types = require('../util/types');
var lexer = require('./lexer');
var parser = require('./parser');
/*
    IttfModel : {
        uri: String // The location of the source IttfDocument.
        schema: String // The IttfDocument schema.
        loadContext: Object, // The loadContext object
        // NO not stored in the object, see ittfDocumentDatas in loadContext : String, // The source text
        lines: Array, // lexed source lines
        nodes: Array, // parsed source nodes
        sourceKey: String, // key to the source info of the IttfDocument
        modelKey: String // key to the cloned IttfModel
        ... these are set by the mixer, on the cloned object
        mixed: Boolean // true if has been mixed
        $mixerModelKey: String // the modelKey of the calling node
        $args: String // the value of the calling node
        $argArray: String // the $arg array of the calling node
        
        ... these are set by the parser on the original model, then cloned
        $params: // the node value of the $params node, if declared
    }
    load
    setKeys
    clone
    dump
*/
function IttfModel(uri, loadContext) {
    this.uri = uri;
    this.loadContext = loadContext;
}
IttfModel.prototype.load = function (ittfSourceTextContent, ittfDocumentData) {
    if (typeof ittfSourceTextContent !== 'string') {
        throw new TypeError('ittfSourceTextContent must be a string');
    }
    if (!(ittfDocumentData && typeof ittfDocumentData.sourceKey === 'string')) {
        throw new TypeError('ittfDocumentData.sourceKey must be a string');
    }
    // this.inputContent = ittfSourceTextContent;
    var lines = lexer(ittfSourceTextContent, ittfDocumentData);
    this.nodes = parser(lines, this);
}
//IttfModel.prototype.setCallContext = function (callContext) {
//    this.callContext = callContext;
//}
IttfModel.prototype.setKeys = function (sourceKey, modelKey) {
    this.sourceKey = sourceKey;
    this.modelKey = modelKey;
}
IttfModel.prototype.clone = function () {
    var clonedModel = new IttfModel(this.uri, this.loadContext);
    // clonedModel.inputContent = this.inputContent;
    if (this.$params) {
        clonedModel.$params = this.$params;
    }
    clonedModel.nodes = this._cloneNodes(this.nodes, null, clonedModel);
    return clonedModel;
}
IttfModel.prototype._cloneNodes = function (nodes, parent, clonedModel) {
    var self = this;
    var clnode, clnodes = [];
    nodes.forEach(function (node) {
        clnode = {
            id: self.loadContext.getNewNodeId(),
            parsedId: node.id,
            name: node.name,
            value: node.value,
            tagSuffix: node.tagSuffix,
            row: node.row,
            col: node.col,
            sourceKey: node.sourceKey,
            parent: parent,
            model: clonedModel
        };
        clnode.childs = self._cloneNodes(node.childs, clnode, clonedModel);
        clnodes.push(clnode);
    });
    return clnodes;
}
/**
     Calculates the value of the parameters of
     the mix callee IttfModel.
     param args
     the values of the arguments of the mixin call
*/
IttfModel.prototype.getParamValues = function (args) {
    var params = this.$params;
    var ittfModelRootNode = this.nodes[0];
    var _paramArray = [],
        _argsArray = [];
    if (params !== null && (typeof params === 'string') && params.length > 0) {
        _paramArray = params.trim().split(',');
    }
    if (args !== null && (typeof args === 'string') && args.length > 0) {
        _argsArray = args.trim().split(',');
    }
    var result = [];
    for (var i = 0; i < _paramArray.length; i++) {
        var name,
            type = 'string',
            defaultValue = null,
            value = null,
            hasparamvalue = false,
            hasdefaultvalue = false;
        var param_parts = _paramArray[i].trim().split(/[|]/)
        ;
        if (param_parts.length > 2) {
            throw errors.NodeError('Argument ' + i + ' is malformed. Expected name[:type[|default]]', ittfModelRootNode);
        }
        if (param_parts.length == 2) {
            defaultValue = param_parts[1].trim();
            hasdefaultvalue = true;
        }
        var param_parts = param_parts[0].trim().split(/[:]/)
        ;
        if (param_parts.length > 2) {
            throw errors.NodeError('Argument ' + i + ' is malformed. Expected name[:type[|default]]', ittfModelRootNode);
        }
        if (param_parts.length == 2) {
            type = param_parts[1];
        }
        name = param_parts[0];
        if (name.substr(0, 1) === '&') {
            name = name.substr(1);
            type = 'object';
        }
        if (_argsArray.length > i) {
            value = _argsArray[i].trim();
            if (type === 'object') {
                if (value.substr(0, 1) !== '&') {
                    throw errors.NodeError('Error getParamValues. Argument (' + i + ') must be an object reference. Found ' + value, ittfModelRootNode);
                }
                else {
                    value = value.substr(1);
                }
            }
            else {
                value = types.objectify(_argsArray[i].trim(), type, ittfModelRootNode, true);
            }
            hasparamvalue = true;
        }
        else if (hasdefaultvalue) {
            value = types.objectify(defaultValue, type, ittfModelRootNode, true);
        }
        else {
            throw errors.NodeError('Error getParamValues. Missing value for not optional argument ' + i + ') = ' + name, ittfModelRootNode);
        }
        // TODO ??? What happen when the parameter is a template ???
        var isTemplate = type === 'object' ? false : types.isTemplate(value);
        result.push({
            name: name.substr(0, 1) === '&' ? name.substr(1) : name,
            value: value,
            type: type,
            isTemplate: isTemplate,
            isByRef: type === 'object'
        });
    }
    return result;
}
IttfModel.prototype.dump = function (evaluated) {
    var
        buffer = [],
        ctx = { evaluated: evaluated };
    this.nodes.forEach(function (node) {
        _dumpNodeDeep(node, 1, buffer, ctx);
    });
    return buffer.join('\n');
}
function _dumpNodeDeep(node, indent, buffer, ctx) {
    if (ctx.evaluated) {
        buffer.push(
            spaces(indent * 2) + node.n + ' ' + (node.v || '') + ' ids: ' + node.parsedId + ' ' + node.id
            );
    } else {
        buffer.push(
            spaces(indent * 2) + node.name + ' ' + (node.value || '') + ' ids: ' + node.parsedId + ' ' + node.id
            );
    }
    if (node.model) {
        if (node.model.$args || node.model.$params) {
            if (!ctx[node.model.modelKey]) {
                ctx[node.model.modelKey] = node.model;
                buffer.push(
                    spaces(indent * 2) + '  $args: ' + node.model.$args + ' $params: ' + node.model.$params
                    );
            }
        }
    }
    indent++;
    node.childs.forEach(function (n) {
        _dumpNodeDeep(n, indent, buffer, ctx);
    })
}
IttfModel.prototype.toIttf = function () {
    var buffer = [];
    this.nodes.forEach(function (node) {
        _toIttfNodeDeep(node, 0, buffer);
    });
    return buffer.join('\n');
}
function _toIttfNodeDeep(node, indent, buffer) {
    buffer.push(
        spaces(indent * 4) + node.n + ' ' + (node.v || '') 
        );
    indent++;
    node.childs.forEach(function (n) {
        _toIttfNodeDeep(n, indent, buffer);
    });
}
IttfModel.prototype.toText = function () {
    var buffer = [];
    if (this.nodes.length == 1) {
        var root = this.nodes[0];
        root.childs.forEach(function (node) {
            _toTextNodeDeep(node, 0, buffer);
        });
    }
    return buffer.join('\n');
}
function _toTextNodeDeep(node, indent, buffer) {
    buffer.push(
        spaces(indent * 4) + node.n + ' ' + (node.v || '')
        );
    indent++;
    node.childs.forEach(function (n) {
        _toTextNodeDeep(n, indent, buffer);
    });
}
function spaces(num) {
    return Array(num + 1).join(" ");
}
module.exports = IttfModel;

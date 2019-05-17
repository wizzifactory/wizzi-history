/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\errors.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/

// Taken from wizzi-mtree

'use strict';
var util = require('util');
var md = module.exports = {};
function NodeError(message, node) {
    this.name = 'NodeError';
    var msg = [
        message
    ];
    if (node) {
        if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            var filePath = 'TODO';
            if (node.wzSourceFilepath) {
                filePath = node.wzSourceFilepath(info.sourceKey);
            }
            msg.push(' at row: ' + info.row);
            msg.push(', col: ' + info.col);
            msg.push(', source: ' + info.sourceKey);
            msg.push(', in file: ' + filePath);
        }
        else if (node.row) {
            msg.push(' at row: ' + node.row);
            msg.push(', col: ' + node.col);
            msg.push(', source: ' + node.sourceKey);
            msg.push(', in file: ' + (node.model ? node.model.uri : 'unavailable'));
        }
    }
    this.message = msg.join('');
    // log 'NodeError', this.message
    // set this.node = node
    // 5/8/17 set this.stack = (new Error()).stack
}
NodeError.prototype.toString = function () {
    return this.message;
};
NodeError.prototype = Object.create(Error.prototype);
NodeError.prototype.constructor = NodeError;
md.NodeError = NodeError;

function IttfNotFoundError(resourceType, name, sourceUri) {
    this.name = 'IttfNotFoundError';
    this.message = resourceType + ': ' + name + ' not found, processing document ' + md.getSrcPathInfo(sourceUri);
    // 5/8/17 set this.stack = (new Error()).stack
}
IttfNotFoundError.prototype.toString = function () {
    return this.message;
};
IttfNotFoundError.prototype = Object.create(Error.prototype);
IttfNotFoundError.prototype.constructor = IttfNotFoundError;
md.IttfNotFoundError = IttfNotFoundError;

function IttfLoadError(message, srcPath, node, ex) {
    this.name = 'IttfLoadError';
    if (!(ex)) {
        ex = node;
        node = null;
    }
    this.message = 'Error: ' + message + '\nLoading ittf document ' + md.getSrcPathInfo(srcPath);
    if (node) {
        this.message += ('\n' + new NodeError('', node).message);
    }
    // 5/8/17 set this.stack = (new Error()).stack
}
IttfLoadError.prototype.toString = function () {
    return this.message;
};
IttfLoadError.prototype = Object.create(Error.prototype);
IttfLoadError.prototype.constructor = IttfLoadError;
md.IttfLoadError = IttfLoadError;

function RepoIOError(message, uri, innerEx) {
    this.name = 'RepoIOError';
    this.message = message + '\nuri: ' + uri;
    // 5/8/17 set this.stack = (new Error()).stack
}
RepoIOError.prototype.toString = function () {
    return this.message;
};
RepoIOError.prototype = Object.create(Error.prototype);
RepoIOError.prototype.constructor = RepoIOError;
md.RepoIOError = RepoIOError;

md.getSrcPathInfo = function (srcPath) {
    if (typeof (srcPath) === 'string') {
        return srcPath;
    }
    if (srcPath && (typeof (srcPath) === 'object')) {
        var msg = md.getSrcPathInfoFromNode(srcPath);
        return msg ? msg : srcPath.toString();
    }
    return 'unavailable';
};
md.getSrcPathInfoFromNode = function (node) {
    var msg = [];
    if (node) {
        if (node.WmtSourceLineInfo) {
            var info = node.WmtSourceLineInfo;
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.source));
            msg.push((', in file: ' + 'TODO'));
        }
        else if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            var filePath = 'TODO';
            if (node.wzSourceFilepath) {
                filePath = node.wzSourceFilepath(info.sourceKey);
            }
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + filePath));
        }
    }
    return msg.length == 0 ? null : msg.join('');
};

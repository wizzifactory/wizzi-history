/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\tests\mocks\errors.js.ittf
*/
'use strict';

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
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + filePath));
        }
        else if (node.row) {
            msg.push((' at row: ' + node.row));
            msg.push((', col: ' + node.col));
        }
    }
    this.message = msg.join('');
    // log 'NodeError', this.message
    // set this.node = node
    this.stack = (new Error()).stack;
}
NodeError.prototype.toString = function() {
    return this.message;
};
NodeError.prototype = Object.create(Error.prototype);
NodeError.prototype.constructor = NodeError;
md.NodeError = NodeError;

function WizziModelLoadError(message, srcPath, ex) {
    this.name = 'WizziModelLoadError';
    this.message = 'Error: ' + message + '\nLoading ittf document ' + md.getSrcPathInfo(srcPath);
    this.stack = (new Error()).stack;
}
WizziModelLoadError.prototype.toString = function() {
    return this.message;
};
WizziModelLoadError.prototype = Object.create(Error.prototype);
WizziModelLoadError.prototype.constructor = WizziModelLoadError;
md.WizziModelLoadError = WizziModelLoadError;

function ArtifactGenerationError(message, generation, srcPath, ex) {
    this.name = 'ArtifactGenerationError';
    this.message = 'Error: ' + message +'\nDuring generation:' + generation +', processing document ' + md.getSrcPathInfo(srcPath);
    this.stack = (new Error()).stack;
}
ArtifactGenerationError.prototype.toString = function() {
    return this.message;
};
ArtifactGenerationError.prototype = Object.create(Error.prototype);
ArtifactGenerationError.prototype.constructor = ArtifactGenerationError;
md.ArtifactGenerationError = ArtifactGenerationError;

md.getSrcPathInfo = function(srcPath) {
    if (typeof (srcPath) === 'string') {
        return srcPath;
    }
    if (srcPath && (typeof (srcPath) === 'object')) {
        var msg = md.getSrcPathInfoFromNode(srcPath);
        return msg ? msg : srcPath.toString();
    }
    return 'unavailable';
};
md.getSrcPathInfoFromNode = function(node) {
    var msg = [];
    if (node) {
        if (node.wzSourceLineInfo) {
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

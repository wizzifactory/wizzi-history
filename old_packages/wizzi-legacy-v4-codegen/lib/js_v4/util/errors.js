/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\util\errors.js.ittf
    utc time: Tue, 14 Nov 2017 08:44:10 GMT
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


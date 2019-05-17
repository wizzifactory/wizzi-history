/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\tests\mocks\basicloader\mtree.js.ittf
*/
'use strict';
// generated by wizzi.codegen.js4.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var liner = require('./liner');
var nodifier = require('./nodifier');
var MTree = (function () {
    function MTree(uri) {
        _classCallCheck(this, MTree);
        this.uri = uri;
        this.nodes = null;
        this.nodeCount = 0;
    }
    MTree.prototype.load = function(ittfSourceTextContent, ittfDocumentData) {
        if (typeof(ittfSourceTextContent) !== 'string') {
            throw new TypeError('ittfSourceTextContent must be a string');
        }
        if (!ittfDocumentData || typeof(ittfDocumentData.sourceKey) !== 'string') {
            throw new TypeError('ittfDocumentData.sourceKey must be a string');
        }
        var lines = liner(ittfSourceTextContent, ittfDocumentData);
        if (lines && lines.__is_error) {
            return lines;
        }
        var nodes = nodifier(lines, this);
        if (nodes && nodes.__is_error) {
            return nodes;
        }
        this.nodes = nodes;
    }
    MTree.prototype.getNewNodeId = function() {
        return ++this.nodeCount;
    }
    return MTree;
})();


module.exports = {
    MTree: MTree
};
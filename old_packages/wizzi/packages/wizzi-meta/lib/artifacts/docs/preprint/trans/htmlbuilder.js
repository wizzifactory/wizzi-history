/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\lib\artifacts\docs\preprint\trans\htmlbuilder.js.ittf
*/
'use strict';
// generated by wizzi.codegen.js4.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require('util');
var HtmlWriter = require('./htmlwriter').HtmlWriter;
var md = module.exports = {};
var HtmlBuilder = (function () {
    function HtmlBuilder(noLF) {
        _classCallCheck(this, HtmlBuilder);
        this.noLF = noLF;
        this.nodes = [];
        this.currentNode = null;
    }
    HtmlBuilder.prototype.openTag = function(tag, options) {
        options = options || {};
        if (this.currentNode == null) {
            this.currentNode = this.createNode(tag, null, options);
            this.nodes.push(this.currentNode);
        }
        else {
            var newTag = this.createNode(tag, this.currentNode, options);
            this.currentNode.children.push(newTag);
            this.currentNode = newTag;
        }
    }
    HtmlBuilder.prototype.closeTag = function() {
        this.currentNode = this.currentNode.parent;
    }
    HtmlBuilder.prototype.writeText = function(text) {
        if (this.currentNode == null) {
            this.nodes.push({
                tag: '_text', 
                text: text
            });
        }
        else {
            this.currentNode.text += (text || '');
        }
    }
    HtmlBuilder.prototype.writeAttribute = function(name, value) {
        this.currentNode.attribs.push({
            name: name, 
            value: value
        });
    }
    HtmlBuilder.prototype.createNode = function(tag, parent, options) {
        return {
                parent: parent, 
                tag: tag, 
                children: [], 
                attribs: [], 
                text: '', 
                inline: options.inline
            };
    }
    HtmlBuilder.prototype.toLines = function() {
        var hw = new HtmlWriter(this.noLF);
        var i, i_items=this.nodes, i_len=this.nodes.length, node;
        for (i=0; i<i_len; i++) {
            node = this.nodes[i];
            hw.writeElement(node);
        }
        return hw.toLines();
    }
    HtmlBuilder.prototype.toText = function() {
        return this.toString();
    }
    HtmlBuilder.prototype.toString = function() {
        var hw = new HtmlWriter(this.noLF);
        var i, i_items=this.nodes, i_len=this.nodes.length, node;
        for (i=0; i<i_len; i++) {
            node = this.nodes[i];
            hw.writeElement(node);
        }
        return hw.toString();
    }
    return HtmlBuilder;
})();

md.HtmlBuilder = HtmlBuilder;

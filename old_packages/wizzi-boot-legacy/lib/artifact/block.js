'use strict';
var line = require('./line');
var Block = function (options) {
    // console.log('Block.options', options);
    this.lines = [];
    this.options = options || {};
    this.indentValue = this.options.indent || 0;
    // console.log('this.indentValue', this.indentValue);
    this.currentline = null;
}
// force indentation
Block.prototype.forceIndent = function (value) {
    var save = this.indentValue;
    this.indentValue = value;
    return save;
}
// increments indentation
Block.prototype.indent = function (value) {
    this.indentValue += (typeof value !== 'undefined') ? value : 1;
}
// decrement indentation
Block.prototype.deindent = function (value) {
    this.indentValue -= (typeof value !== 'undefined') ? value : 1;
    this.indentValue = Math.max(0, this.indentValue); // avoid indentation < 0
}
// write an output text line plus linefeed
Block.prototype.w = function (text) {
    if (this.currentline != null) {
        this.currentline.add(text);
        this.lines.push(this.currentline);
        this.currentline = null;
    }
    else
        this.lines.push(new line(text, this.indentValue, this.options));
}
// write an output text line without linefeed
Block.prototype.write = function (text) {
    if (this.currentline != null) {
        this.currentline.add(text);
    }
    else
        this.currentline = new line(text, this.indentValue, this.options);
}
// write an entire file
Block.prototype.writeFile = function (filePath) {
    if (this.currentline != null) {
        this.currentline.addFile(filePath);
        this.lines.push(this.currentline);
        this.currentline = null;
    }
    else
        this.lines.push(new line(filePath, this.indentValue, this.options, true));
}
Block.prototype.toStream = function (stream, ctx) {
    this.lines.forEach(function (item) {
        item.toStream(stream, ctx);
    });
    if (this.currentline != null) this.currentline.toStream(stream, ctx);
}
Block.prototype.terminate = function () {
    delete this.options;
    delete this.currentline;
    this.lines.forEach(function (item) {
        item.terminate();
    });
}
Block.prototype.hydrate = function (lines, options) {
    this.currentline = null;
    this.lines = [];
    var l;
    var self = this;
    lines.forEach(function (item) {
        l = new line('', 0, options);
        l.hydrate(item);
        self.lines.push(l);
    });
}
module.exports = Block;

'use strict';
var file = require('../util/file');
var Line = function (textOrPath, indentValue, options, isFilePath) {
    this.containsFilePath = isFilePath;
    this.text = [];
    if (isFilePath) {
        this.text.push({ k: 0, t: textOrPath });
    } else {
        this.text.push(textOrPath);
    }
    this.indentValue = indentValue;
    this.options = options;
}
Line.prototype.add = function (text) {
    if (this.containsFilePath)
        this.text.push({ k: 1, t: text });
    else
        this.text.push(text);
}
Line.prototype.addFile = function (filePath) {
    if (this.containsFilePath)
        this.text.push({ k: 0, t: filePath });
    else {
        for (var i = 0; i < text.length; i++) {
            text[i] = { k: 1, t: text[i] };
        }
        this.text.push({ k: 0, t: filePath });
    }
}
Line.prototype.toStream = function (stream, ctx) {
    if (this.options.isDebugLine && !ctx.isDebug) return;
    // console.log('Line', this.indentValue, this.text.join(''));
    if (this.containsFilePath) {
        var i,t,l = this.text.length;
        for (i = 0; i < l; i++) {
            var t = this.text[i];
            if (t.k === 1) {
                stream.write(t.t);
            } else {
                this._fileToStream(stream, t.t, ctx);
            }
            if (i == l - 1) stream.write(this.options.CRLF);
        }
    } else {
        stream.write(
            spaces(this.indentValue * this.options.indentSpaces) +
            this.text.join('') + this.options.CRLF
        );
    }
}
Line.prototype._fileToStream = function (stream, filePath, ctx) {
    var lines = file.readLines(filePath);
    var indent = spaces(this.indentValue * this.options.indentSpaces);
    var i, t, l = lines.length;
    for (i = 0; i < l; i++) {
        if (i > 0) stream.write(indent);
        stream.write(lines[i]);
        if (i < (l - 1)) stream.write(this.options.CRLF);
    }
}
Line.prototype.terminate = function () {
    delete this.options;
}
Line.prototype.hydrate = function (item) {
    this.text = item.text;
    this.indentValue = item.indentValue;
}
function spaces(num) {
    return Array(num + 1).join(" ");
}
module.exports = Line;

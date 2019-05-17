'use strict';
// module dependencies
var StringWriter = require('../util/stringwriter');
var verify = require('../util/verify');
var block = require('./block');
var interpolate = require('../util/interpolate');
var errors = require('../errors');
var GenWriter = function (genconfig) {
    if (!verify.isObject(genconfig)) throw new Error('GenWriter: genconfig argument must be an Object');
    if (!verify.isObject(genconfig.options)) throw new Error('GenWriter: genconfig.options argument must be an Object');
    this.genconfig = genconfig;
    this.model = genconfig.model;
    this.srcPath = genconfig.srcPath;
    this.pman = genconfig.pman;
    // console.log('GenWriter.genconfig.data', genconfig.data);
    // console.log('GenWriter.genconfig.options', genconfig.options);
    // output lines accumulator
    this.block = new block(this.genconfig.options);
    // secondary contexts for Artifact(s) that emit many output files
    /* VIA 2/10/2015 this.subGenWriters = {}; */
    // Interpolation context values
    this.values = {};
    var vs = this.genconfig.options.data || {};
    for (var x in vs) { this.values[x] = vs[x]; }
}
// force indentation
GenWriter.prototype.forceIndent = function (value) {
    return this.block.forceIndent(value);
}
// increments block indentation
GenWriter.prototype.indent = function (value) {
    this.block.indent(value);
}
// decrements block indentation
GenWriter.prototype.deindent = function (value) {
    value = typeof value === 'undefined' ? 1 : value;
    this.block.deindent(value);
}
// add a value to the interpolation context
GenWriter.prototype.a = function (name, value) {
    this.values[name] = value;
}
// get a value from the interpolation context
GenWriter.prototype.g = function (name) {
    return this.values[name];
}
// remove a value from the interpolation context
GenWriter.prototype.r = function (name) {
    if (this.values[name]) delete this.values[name];
}
// write an output text line plus linefeed (interpolated)
GenWriter.prototype.w = function (text) {
    if (verify.isString(text)) {
        this.block.w(text.indexOf('{') > -1 ? interpolate(text, this.values) : text);
    } else {
        this.block.w('');
    }
}
// write an output text line without linefeed (interpolated)
GenWriter.prototype.write = function (text) {
    if (!verify.isString(text)) return;
    this.block.write(interpolate(text, this.values));
}
// write an entire file (the filePath is interpolated)
GenWriter.prototype.writeFile = function (filePath) {
    this.block.writeFile(interpolate(filePath, this.values));
}
/* VIA 2/10/2015
// create a secondary context
GenWriter.prototype.createContext = function (name, contextvalues) {
    var newctx = new GenWriter(this.genconfig);
    var vs = contextvalues || {};
    // merge with override
    for (var x in vs) { newctx.values[x] = vs[x]; }
    this.subGenWriters[name] = newctx;
    return newctx;
}
*/
GenWriter.prototype.toStream = function (stream) {
    this.block.toStream(stream);
}
GenWriter.prototype.getContent = function () {
    var sw = new StringWriter();
    this.block.toStream(sw);
    return sw.toString();
}
GenWriter.prototype.getContentInLine = function () {
    return verify.replaceAll(this.getContent(), '\n', '__1_2_3__')
}
GenWriter.prototype.error = function (message, node) {
    return new errors.NodeError(message, node);
}
GenWriter.prototype.artifactGenerationError = function (message, location, node) {
    errors.ArtifactGenerationError(message, location, node);
}
GenWriter.prototype.terminate = function () {
    delete this.pman;
    delete this.genconfig.pman;
    this.block.terminate();
}
GenWriter.prototype.hydrate = function (block, options) {
    this.block = new block(options);
    this.block.hydrate(block.lines, options);
}
GenWriter.toStringFromJSON = function (block, options) {
    if (!block || !block.lines) return 'NO TEXT';
    var gw = new GenWriter({
        options: options
    });
    gw.block.hydrate(block.lines, options);
    return gw.getContent();
}
module.exports = GenWriter;

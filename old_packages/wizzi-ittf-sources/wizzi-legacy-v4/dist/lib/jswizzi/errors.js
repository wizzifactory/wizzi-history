/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\jswizzi\errors.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
var util = require('util');
var f_verify = require('./functions/verify');

var md = module.exports = {};

function JsWizziRunnerError(message, node) {
    this.name = 'JsWizziRunnerError';
    this.message = message + util.inspect(node.loc, {depth: null});
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziRunnerError.prototype.toString = function() {
    return this.message;
};
JsWizziRunnerError.prototype = Object.create(Error.prototype);
JsWizziRunnerError.prototype.constructor = JsWizziRunnerError;
md.JsWizziRunnerError = JsWizziRunnerError;

function InvalidVariableNameError(message) {
    this.name = 'InvalidVariableNameError';
    this.message = message;
    // 5/8/17 set this.stack = (new Error()).stack
}
InvalidVariableNameError.prototype.toString = function() {
    return this.message;
};
InvalidVariableNameError.prototype = Object.create(Error.prototype);
InvalidVariableNameError.prototype.constructor = InvalidVariableNameError;
md.InvalidVariableNameError = InvalidVariableNameError;

function JsWizziSynthaxError(message, node) {
    this.name = 'JsWizziSynthaxError';
    console.log('JsWizziSynthax.message', message);
    if (f_verify.isObject(message) && message.lineNumber) {
        // In this case node = WizziJS source
        this.message = "Synthax error. " + message.description +' at line ' + message.lineNumber +' column ' + message.column +'\n' +getEsprimaErrorLines(message, node) +'\n';
    }
    else {
        this.message = message;
    }
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziSynthaxError.prototype.toString = function() {
    return this.message;
};
JsWizziSynthaxError.prototype = Object.create(Error.prototype);
JsWizziSynthaxError.prototype.constructor = JsWizziSynthaxError;
md.JsWizziSynthaxError = JsWizziSynthaxError;

/**
    For
     vars or functions undeclared
     invalid values
*/
function JsWizziTypeError(message, node) {
    this.name = 'JsWizziTypeError';
    this.message = message;
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziTypeError.prototype.toString = function() {
    return this.message;
};
JsWizziTypeError.prototype = Object.create(Error.prototype);
JsWizziTypeError.prototype.constructor = JsWizziTypeError;
md.JsWizziTypeError = JsWizziTypeError;

function getEsprimaErrorLines(esprimaException, source) {
    var statements = source.split('\n');
    var start = Math.max(0, (esprimaException.lineNumber - 4));
    var end = Math.min(statements.length, (esprimaException.lineNumber + 4))
    ;
    var ret = [];
    for (var i = start; i < end; i++) {
        ret.push(formatLineNumber(i + 1) + ' ' + statements[i]);
        if (i == esprimaException.lineNumber - 1) {
            var col = esprimaException.column;
            ret.push(spaces(col + 4) + '^ ' + esprimaException.description);
        }
    }
    return ret.join('\n');
}
function spaces(num) {
    return Array(num + 1).join(" ");
}
function formatLineNumber(num) {
    if (num > 999) {
        return num;
    }
    if (num > 99) {
        return ('0' + num);
    }
    if (num > 9) {
        return ('00' + num);
    }
    return ('000' + num);
}

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\esprima\errors.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var f_verify = require('./functions/verify');

var md = module.exports = {};

function WizziJsRunnerError(message,node) {
    this.name = 'WizziJsRunnerError';
    this.message = message + util.inspect(node.loc, {depth: null});
    this.stack = (new Error()).stack;
}

WizziJsRunnerError.prototype.toString = function() {
    return this.message;
};
WizziJsRunnerError.prototype = Object.create(Error.prototype);
WizziJsRunnerError.prototype.constructor = WizziJsRunnerError;
md.WizziJsRunnerError = WizziJsRunnerError;

function InvalidVariableNameError(message) {
    this.name = 'InvalidVariableNameError';
    this.message = message;
    this.stack = (new Error()).stack;
}

InvalidVariableNameError.prototype.toString = function() {
    return this.message;
};
InvalidVariableNameError.prototype = Object.create(Error.prototype);
InvalidVariableNameError.prototype.constructor = InvalidVariableNameError;
md.InvalidVariableNameError = InvalidVariableNameError;

function WizziJsSynthaxError(message,node) {
    this.name = 'WizziJsSynthaxError';
    console.log('WizziJsSynthax.message', message);
    if (f_verify.isObject(message) && message.lineNumber) {
        // In this case node = WizziJS source
        this.message = "Synthax error. " + message.description +' at line ' + message.lineNumber +' column ' + message.column +'\n' +getEsprimaErrorLines(message, node) +'\n';
    }
    else {
        this.message = message;
    }
    this.stack = (new Error()).stack;
}

WizziJsSynthaxError.prototype.toString = function() {
    return this.message;
};
WizziJsSynthaxError.prototype = Object.create(Error.prototype);
WizziJsSynthaxError.prototype.constructor = WizziJsSynthaxError;
md.WizziJsSynthaxError = WizziJsSynthaxError;

/**
    For
     vars or functions undeclared
     invalid values
*/
function WizziJsTypeError(message,node) {
    this.name = 'WizziJsTypeError';
    this.message = message;
    this.stack = (new Error()).stack;
}

WizziJsTypeError.prototype.toString = function() {
    return this.message;
};
WizziJsTypeError.prototype = Object.create(Error.prototype);
WizziJsTypeError.prototype.constructor = WizziJsTypeError;
md.WizziJsTypeError = WizziJsTypeError;

function getEsprimaErrorLines(esprimaException,source) {
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


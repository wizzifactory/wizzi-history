/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\codegen\statements\class.js.ittf
*/
'use strict';
var util = require('util');
var node = require('wizzi-utils').node;
var u = require('../util/stm');
var xclass;
var xclass_es6;
var xclass_react;
var method;
var html;

var myname = 'wizzi-codegen.js.statements.class';
var md = module.exports = {};

function hasStatements(model) {
    return model.statements && model.statements.length > 0;
}
md.load = function(cnt) {
    cnt.stm.xclass = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xclass');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xclass. Got: ' + callback);
        }
        if (ctx.__jskind === 'react') {
            // log 111
            if (!xclass_react) {
                xclass_react = require('../react/class');
            }
            xclass_react.gen(model, ctx, callback);
        }
        else if (ctx.__ecma === 'es6') {
            // log 112
            if (!xclass_es6) {
                xclass_es6 = require('../es6/class');
            }
            xclass_es6.gen(model, ctx, callback);
        }
        else {
            // log 113
            if (!xclass) {
                xclass = require('../class');
            }
            new xclass.gen(model, ctx, callback);
        }
    };
    cnt.stm.ctor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.ctor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.ctor. Got: ' + callback);
        }
        // done by zclass
        ;
        return callback(null, null);
    };
    cnt.stm.method = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.method');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.method. Got: ' + callback);
        }
        if (!method) {
            method = require('../method');
        }
        new method.gen(model, ctx, callback);
    };
    cnt.stm.tohtml = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.tohtml');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.tohtml. Got: ' + callback);
        }
        if (!html) {
            html = require('../html');
        }
        new html.gen(model, ctx, callback);
    };
};

/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\codegen\statements\template.js.ittf
*/
'use strict';
var util = require('util');
var node = require('wizzi-utils').node;
var u = require('../util/stm');

var myname = 'wizzi-codegen.js.statements.template';
var md = module.exports = {};

function hasStatements(model) {
    return model.statements && model.statements.length > 0;
}
md.load = function(cnt) {
    cnt.stm.template = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.template');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.template. Got: ' + callback);
        }
        ctx.write('`');
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('`');
            return callback(null, null);
        });
    };
    cnt.stm.taggedTemplate = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.taggedTemplate');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.taggedTemplate. Got: ' + callback);
        }
        ctx.write('`');
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('`');
            return callback(null, null);
        });
    };
    cnt.stm.tagFunctionCall = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.tagFunctionCall');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.tagFunctionCall. Got: ' + callback);
        }
        ctx.w( model.wzName + '`');
        var i, i_items=model.statements, i_len=model.statements.length, s;
        for (i=0; i<i_len; i++) {
            s = model.statements[i];
            ctx.w( s.wzName );
        }
        ctx.write( '`');
        if (u.isTopStatement(model) && u.isDescendentOf(model, 'iif') == false) {
            ctx.w(';');
        }
        return callback(null, null);
    };
    cnt.stm.macroExpr = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.macroExpr');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.macroExpr. Got: ' + callback);
        }
        ctx.write('${' + (model.wzName || ''));
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.write('}');
            return callback(null, null);
        });
    };
};

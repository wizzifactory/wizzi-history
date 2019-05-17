/*
    artifact generator: C:\My\wizzi\v6\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v6\plugins\wizzi-js\src\ittf\lib\artifacts\ts\module\gen\codegen\statements\call.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../../../../../js/module/gen/codegen/util/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.call';
var md = module.exports = {};

function hasStatements(model) {
    return model.statements && model.statements.length > 0;
}
md.load = function(cnt) {
    cnt.stm.typeCallSignature = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeCallSignature');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeCallSignature. Got: ' + callback);
        }
        ctx.write('(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            var ptype = u.extractTSSimpleType(model);
            if (ptype) {
                console.log('property', ptype.wzElement);
                ctx.write(': ');
                cnt.stm[ptype.wzElement](ptype, ctx, () => {});
            }
            ctx.w();
            return callback(null, null);
        });
    };
};

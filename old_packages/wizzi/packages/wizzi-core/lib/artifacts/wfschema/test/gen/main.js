/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\lib\artifacts\wfschema\test\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wizzischema.test.main';
md.gen = function(model, ctx, callback) {
    // log myname + 'model', model
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wizzischema-test.js.ittf');
    var mTreeBuildUpContext = {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || 'node-js', 
            toJson: ctx.toJson || false
        }
    };
    legacy.jsModule(ittfDocumentPath, mTreeBuildUpContext, function(err, result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};

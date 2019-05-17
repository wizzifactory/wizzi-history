/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\wizzischema\test\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wizzischema.test.main';
md.gen = function(model,ctx,callback) {
    // log myname + 'model', model
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wizzischema-test.js.ittf');
    legacy.jsModule(ittfDocumentPath, {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || 'node-js', 
            toJson: ctx.toJson || false
        }
    }, function(err,result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};

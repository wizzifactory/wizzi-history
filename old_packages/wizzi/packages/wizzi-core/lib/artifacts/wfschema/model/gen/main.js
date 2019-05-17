/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\lib\artifacts\wfschema\model\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wfschema.model.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wfschema-model.js.ittf');
    console.log('wizzi-core.wfschema.gen.model started', ittfDocumentPath);
    // log 'wizzi-core.artifacts.wfschema.model.model', model
    var mTreeBuildUpContext = {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || null, 
            toJson: model.exportToJson(), 
            toXml: model.exportToXml(), 
            toPrettify: model.exportToPrettify()
        }
    };
    legacy.jsModule(ittfDocumentPath, mTreeBuildUpContext, function(err, result) {
        if (err) {
            console.log(__dirname, myname, 'err', err);
        }
        console.log('wizzi-core.wfschema.gen.model ended', ittfDocumentPath);
        ctx.w(result);
        callback(null, ctx);
    });
};

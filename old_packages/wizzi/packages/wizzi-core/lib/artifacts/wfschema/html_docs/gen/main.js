/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\lib\artifacts\wfschema\html_docs\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wfschema.html.docs.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wfschema-docs.html.ittf');
    var mTreeBuildUpContext = {
        schema: model, 
        request: {}
    };
    // log 'htmlContext', util.inspect(htmlContext, { depth: 2 })
    legacy.htmlDocument(ittfDocumentPath, mTreeBuildUpContext, function(err, result) {
        if (err) {
            return callback(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};

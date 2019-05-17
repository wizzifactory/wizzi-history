/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\wizzischema\html_docs\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wizzischema.html.docs.main';
md.gen = function(model,ctx,callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wizzischema-docs.html.ittf');
    var htmlContext = {
        schema: model, 
        request: {}
    };
    // log 'htmlContext', util.inspect(htmlContext, { depth: 2 })
    legacy.htmlDocument(ittfDocumentPath, htmlContext, function(err,result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};

// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:41 GMT
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

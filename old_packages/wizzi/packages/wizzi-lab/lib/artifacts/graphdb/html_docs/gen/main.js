/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-lab\src\ittf\lib\artifacts\graphdb\html_docs\gen\main.js.ittf
    utc time: Tue, 14 Aug 2018 15:17:52 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var site = require('wizzi-lab-site');
var md = module.exports = {};
var myname = 'graphdb.html.docs.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'graphdb-docs.html.ittf');
    var htmlContext = {
        graphdb: model, 
        request: {}
    };
    // log 'htmlContext', util.inspect(htmlContext, { depth: 2 })
    site.htmlDocument(ittfDocumentPath, htmlContext, function(err, result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};

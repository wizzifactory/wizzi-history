/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-lab\src\ittf\lib\artifacts\raml\nodejs_server\gen\main.js.ittf
    utc time: Sat, 22 Sep 2018 10:57:57 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'raml.nodejs.server.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'nodejs-server.js.ittf');
    var jsContext = {
        raml: model, 
        request: {}
    };
    wizzi.jsModule(ittfDocumentPath, jsContext, function(err, result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};

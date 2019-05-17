/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-lab\src\ittf\lib\artifacts\graphdb\jsonmodel_tests\gen\main.js.ittf
    utc time: Tue, 14 Aug 2018 15:17:52 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'graphdb.jsonmodel_tests.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'jsonmodel_tests.js.ittf');
    wizzi.wizzi.ittf.loadModel(ittfDocumentPath, {
        graphdb: model, 
        request: {}
    }, function(err, result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result.toIttf());
        callback(null, ctx);
    });
};

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v2\sources\plugins\wizzi-lab-spa\ittf\lib\artifacts\spa\gulp\gen\main.js.ittf
    utc time: Mon, 17 Jul 2017 15:07:32 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'spa.package.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'gulp.js.ittf');
    wizzi.jsModule(ittfDocumentPath, {
        spa: model, 
        request: {}
    }, function(err, result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};
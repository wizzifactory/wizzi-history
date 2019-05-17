/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v2\sources\plugins\wizzi-lab-spa\ittf\lib\artifacts\spa\gulp_browserify\gen\main.js.ittf
    utc time: Mon, 17 Jul 2017 15:07:32 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'spa.gulp_browserify.main';
md.gen = function(model, ctx, callback) {
    console.log('GOT ', myname);
    if (!model || !model.browserify) {
        return {
                error: 'The artifact generator spa/gulp_browserify requires a browserify object in the spa object'
            };
    }
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'main.js.ittf');
    wizzi.jsModule(ittfDocumentPath, {
        browserify: model.browserify, 
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

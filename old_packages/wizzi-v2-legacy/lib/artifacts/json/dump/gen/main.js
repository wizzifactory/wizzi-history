/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\json\dump\gen\main.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var util = require('util');
var md = module.exports = {};
var myname = 'json.dump.main';
md.gen = function(model,ctx,callback) {
    var json = model.toJson ? model.toJson() : "{ error: 'The model has no toJson method'}";
    ctx.w(JSON.stringify(json, null, 4));
    callback(null, ctx);
};

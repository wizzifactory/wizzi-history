/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\lib\artifacts\json\dump\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var stringify = require('json-stringify-safe');

var md = module.exports = {};
var myname = 'json.dump.main';

md.gen = function(model, ctx, callback) {
    if (model.wzElement !== 'json') {
        console.log('wizzi-core', 'artifact', 'model', model);
        callback(error('Invalid model schema. Expected "json". Received: ' + model.wzElement));
    }
    var json;
    if (model.toJson) {
        json = model.toJson();
    }
    else {
        return callback(error('The model has no toJson method'));
    }
    ctx.w(stringify(json, null, 4));
    callback(null, ctx);
};
// DEPRECATED USE json/export
console.log('json/dump is deprecated, use json/export instead');
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/json/dump', 
            message: message
        };
}

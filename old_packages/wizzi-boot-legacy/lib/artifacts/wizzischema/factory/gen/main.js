// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:41 GMT
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wizzischema.factory.main';
md.gen = function(model,ctx,callback) {
    var wizzischemaIttfPath = path.join(__dirname, 'ittf', 'wizzischema-factory.js.ittf');
    legacy.jsModule(wizzischemaIttfPath, {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || 'node-js', 
            toJson: ctx.toJson || false, 
            isWizziPackageSchema: isWizziPackageSchema(model.wzName)
        }
    }, function(err,result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};
function isWizziPackageSchema(name) {
    var ndx = [
        'js', 
        'nools', 
        'npmpackage', 
        'wftest', 
        'wfjob', 
        'wfpackage', 
        'wizzischema'
    ].indexOf(name);
    return ndx > -1;
}


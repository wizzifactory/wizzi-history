/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\lib\artifacts\wfschema\factory\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wfschema.factory_darvin.main';
md.gen = function(model, ctx, callback) {
    var wfschemaIttfPath = path.join(__dirname, 'ittf', 'wfschema-factory.js.ittf');
    var mTreeBuildUpContext = {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || 'node-js', 
            toJson: ctx.toJson || false, 
            isWizziPackageSchema: isWizziPackageSchema(model.wzName)
        }
    };
    legacy.jsModule(wfschemaIttfPath, mTreeBuildUpContext, function(err, result) {
        if (err) {
            return callback(err);
        }
        ctx.w(result);
        callback(null, ctx);
    });
};
function isWizziPackageSchema(name) {
    var ndx = [
        'nools', 
        'npmpackage', 
        'wftest', 
        'wfjob', 
        'wfpackage', 
        'wfschema'
    ].indexOf(name);
    return ndx > -1;
}

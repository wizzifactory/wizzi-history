/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\lib\production\asyncwizzimodeltypesrunner.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var chalk = require('chalk');
var verify = require('wizzi-utils').verify;
var log = require('../util/log')(module);
/** -àà
    
*/
var AsyncWizziModelTypesRunner = {
    run: function(wmtRequest, callback) {
        var modelInfo = wmtRequest.modelInfo;
        var productionManager = modelInfo.productionManager();
        var wizziFactory = productionManager.wizziFactory;
        // log "AsyncWizziModelTypesRunner.run: I should run " + wmtRequest.wfschemaIttfDocumentUri
        wizziFactory.generateModelTypes(wmtRequest.wfschemaIttfDocumentUri, wmtRequest.outputPackageFolder, wmtRequest.schemaName, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            console.log(chalk.green('WIZZI MODEL TYPES GENERATED FOR SCHEMA ' + wmtRequest.schemaName));
            callback(null, result);
        });
    }
};
module.exports = AsyncWizziModelTypesRunner;

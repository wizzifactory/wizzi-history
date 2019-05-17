// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:43 GMT
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var thisPackageIndex = require('../../index');
var verify = require('../util/verify');
var log = require('../util/log')(module);
function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}

/**
    
*/
var AsyncWfJobRunner = {
    run_many: function(modelInfos,callback) {
        async.map(modelInfos, AsyncWfJobRunner._run_item, callback);
    }, 
    _run_item: function(modelInfo,callback) {
        var srcFullPath = modelInfo.srcFullPath();
        console.log("AsyncWfJobRunner._run_item: I should run " + srcFullPath);
        thisPackageIndex.executeJob({
            name: 'wizzi-studio dev-dashboard-incubator', 
            path: srcFullPath, 
            options: thisPackageIndex.options({
                indentSpaces: 4, 
                basedir: path.dirname(srcFullPath), 
                verbose: 2
            })
            
        }, callback);
    }
};
module.exports = AsyncWfJobRunner;

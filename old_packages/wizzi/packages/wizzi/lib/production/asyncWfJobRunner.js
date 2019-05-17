/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\lib\production\asyncwfjobrunner.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var thisPackageIndex = require('../../index');
var verify = require('wizzi-utils').verify;
var log = require('../util/log')(module);
function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}
/** -àà
    
*/
var AsyncWfJobRunner = {
    run_many: function(modelInfos, callback) {
        async.mapSeries(modelInfos, AsyncWfJobRunner._run_item, callback);
    }, 
    _run_item: function(modelInfo, callback) {
        var srcFullPath = modelInfo.srcFullPath();
        // log "AsyncWfJobRunner._run_item: I should run " + srcFullPath
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

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\production\asyncWfJobRunner.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
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

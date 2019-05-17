/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\quick\quick.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var stringify = require('json-stringify-safe');
var file = require('../../lib/util/file');
var ProductionManager = require('../../lib/production/manager');
var productionManager = new ProductionManager({
    verbose: false, 
    basedir: __dirname, 
    indentSpaces: 4
});
productionManager.addWfJob({
    options: {
        verbose: true
    }, 
    wfjob: {
        src: path.join(__dirname, 'ittf', 'test_with_collection.wfjob.ittf')
        
    }
});
var jobRunResult;
productionManager.run(function(err,result) {
    console.log('test manager err', err);
    jobRunResult = result;
    file.write(path.join(__dirname, 'ittf', 'test_with_collection.wfjob.run.json')
    , stringify(jobRunResult, null, 2)
    );
    productionManager.persistToFile(function(err,result) {
        if (err) {
            var msg = 'Package-examples ' + jobName + '\nError persisting production to file: ' + path + '\n' + util.inspect(err, {depth: null});
            wizzi.fail.warn(msg);
            throw new Error(msg);
        }
    });
});

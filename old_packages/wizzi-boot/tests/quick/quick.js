// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:27 GMT
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

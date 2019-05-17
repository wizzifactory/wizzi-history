/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\examples\js_job.js.ittf
    utc time: Tue, 11 Jul 2017 18:49:56 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var log = require('./lib/util/log')(module);
var ProductionManager = require('./lib/production/manager');
var options = require('./lib/production/options');
var verify = require('./lib/util/verify');
var fail = require('./lib/util/fail');
var thisWizziModule = require('../index');
var md = module.exports = {};
md.name = 'wizzi';
md.executeWizziFactoryJob = function(path,wizziFactoryPackages) {
    var pman = new ProductionManager(options({
        indentSpaces: 4, 
        basedir: __dirname, 
        verbose: 2
    })
    );
    if (wizziFactoryPackages && verify.isArray(wizziFactoryPackages)) {
        var i, i_len=wizziFactoryPackages.length, wfp;
        for (i=0; i<i_len; i++) {
            wfp = wizziFactoryPackages[i];
            pman.registerWizziFactoryPackage(wfp);
        }
    }
    pman.registerWizziFactoryPackage(thisWizziModule);
    pman.addWfJob({
        options: {}, 
        wfjob: {
            src: path
        }
    });
    pman.run(function(err,result) {
        if (err) {
            var msg = 'Package-examples ' + md.name + '\nError running production: ' + path + '\n' + util.inspect(err, { depth: null });
            fail.warn(msg);
            throw new Error(msg);
        }
        log.success('run completed');
        pman.persistToFile(function(err,result) {
            if (err) {
                var msg = 'Package-examples ' + md.name + '\nError persisting production to file: ' + path + '\n' + util.inspect(err, { depth: null });
                fail.warn(msg);
                throw new Error(msg);
            }
            log.success('persistToFile completed');
        });
    });
};
md.execute = function() {
    md.executeWizziFactoryJob(path.join(__dirname, 'ittf', 'js', 'js-examples.wfjob.ittf')
    , [
        require('../index')
        
    ]);
};

// CLI execution
md.execute();

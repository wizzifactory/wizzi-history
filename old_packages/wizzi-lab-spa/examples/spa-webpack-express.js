/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v2\sources\plugins\wizzi-lab-spa\ittf\examples\spa-webpack-express.js.ittf
    utc time: Mon, 17 Jul 2017 15:07:33 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var wizzi = require('wizzi');
var log = wizzi.log(module);
var ProductionManager = wizzi.ProductionManager;
var productionOptions = wizzi.options;
var verify = wizzi.verify;
var fail = wizzi.fail;
var acl = wizzi.acl;
var thisWizziModule = require('../index');
var md = module.exports = {};
md.name = 'wizzi-lab-spa';
md.executeWizziFactoryJob = function(path, wizziFactoryPackages, options) {
    var aclStat = options.aclStat;
    var globalContext = options.globalContext || {};
    var pman = new ProductionManager(productionOptions({
        indentSpaces: 4, 
        basedir: __dirname, 
        verbose: 2, 
        trace: true
    })
    );
    pman.aclStat(aclStat);
    pman.globalContext(globalContext);
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
    pman.run(function(err, result) {
        if (err) {
            var msg = 'Package-examples ' + md.name + '\nError running production: ' + path + '\n' + util.inspect(err, { depth: null });
            fail.warn(msg);
            throw new Error(msg);
        }
        log.success('run completed');
        pman.persistToFile(function(err, result) {
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
    md.executeWizziFactoryJob(path.join(__dirname, 'spa', 'webpack-express', 'webpack-express.wfjob.ittf')
    , [
        require('wizzi-lab-site')
        , 
        require('../index')
        
    ]);
};

// CLI execution
md.execute();

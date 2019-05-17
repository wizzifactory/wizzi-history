var util = require('util');
var path = require('path');
var async = require('async');
var wizzi = require('wizzi');
var version = 'v5'
var generateSchemas = false;

/* begin params */
var packageName = 'wizzi-tools';
var $name = packageName + ' ' + version + ' kernel package generator';
var $isPackageDeploy = true;
var $isWebpackTarget = false;
var args = process.argv.slice(2);
args.forEach(function (val, index) {
    if (val === 'webpack') {
        $isWebpackTarget = true;
    }
    if (val === 'nodeploy') {
        $isPackageDeploy = false;
    }
});
console.log("*** $isWebpackTarget", $isWebpackTarget)
console.log("*** $isPackageDeploy", $isPackageDeploy)
/* end params */

wizzi.executeWizziJob({
    user: 'stefi',
    role: 'admin',
    storeKind: 'filesystem',
    config: {
        wfBaseFolder: 'c:/my/wizzi/' + version,
        plugins: [
            'wizzi-core',
            'wizzi-meta',
            'wizzi-js',
            'wizzi-web',
        ]
    },
    job: {
        name: $name,
        ittfDocumentUri: path.join(__dirname, 'generate.wfjob.ittf'),
        productionOptions: wizzi.productionOptions({
            indentSpaces: 4,
            basedir: __dirname,
            verbose: 2
        }),
        globalContext:
        {
            isPackageDeploy: $isPackageDeploy,
            isWebpackTarget: $isWebpackTarget,
        }
    }
}, function (err) {
    if (err) {
        wizzi.printWizziJobError($name, err);
    }
});


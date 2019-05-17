var util = require('util');
var path = require('path');
var async = require('async');
var wizzi = require('wizzi');
var version = 'v5'
var generateSchemas = false;

/*
    begin params */
var packageName = 'wizzi-utils';
var $name = packageName + ' ' + version + ' kernel package generator';
/*
    end params */

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
            'wizzi-docs'
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
        globalContext: {
            isPackageDeploy: true,
            isWebpackTarget: true,
            isBrowserTarget: false,
            isWizziUtilsPackage: true
        }
    }
}, function (err) {
    if (err) {
        wizzi.printWizziJobError($name, err);
    }
});


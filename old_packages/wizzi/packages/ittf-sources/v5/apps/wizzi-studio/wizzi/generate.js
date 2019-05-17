﻿var path = require('path');
var wizzi = require('wizzi');
var version = 'v5'

/*
    begin params */
var packageName = 'wizzi-studio';
var $name = packageName + ' ' + version + ' wizzi-studio package generator';
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
        globalContext: {
            isPackageDeploy: true
        }
    }
}, function (err) {
    if (err) {
        wizzi.printWizziJobError($name, err);
    }
});
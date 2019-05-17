﻿var util = require('util');
var path = require('path');
var async = require('async');
var wizzi = require('wizzi');

/*
    This uses wizzi-html and wizzi-docs instead of wizzi-web plugin, because
    wizzi-web is new in v5 and we
    do not have a v4 stable version. We cannot risk to overwrite
    a v5 version with a bugged generation.
*/

/* begin params */
var version = 'v5';
var packageName = 'wizzi-web';
var $name = packageName + ' ' + version + ' plugin package generator';
var destPath = path.join(__dirname, '..', 'dist');
var generateSchemas = true;
var schemasToGen = [], args = process.argv.slice(2);
if (args.length == 0) {
    schemasToGen = [
        'html',
        'css',
        'scss',
        'svg',
        'md',
        'graphql',
    ];
} else {
    args.forEach(function (val, index) {
        var ss = val.split('=')
        if (ss[0] === 'schema') {
            schemasToGen.push(ss[1])
        }
    });
}
/* end params */

wizzi.executeWizziJob({
    user: 'stefi',
    role: 'admin',
    storeKind: 'filesystem',
    config: {
        wfBaseFolder: 'c:/my/wizzi/' + version + 'next/sources',
        plugins: [
            'wizzi-core',
            'wizzi-meta',
            'wizzi-js',
            'wizzi-html',
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
        })
        ,
        globalContext: {
            isPackageDeploy: true
        }

    }
}, function (err) {
    if (err) {
        wizzi.printWizziJobError($name, err);
    }
    if (generateSchemas) {
        async.map(schemasToGen, function (schemaName, callback) {
            console.log('Generating schema ' + schemaName);
            wizzi.generateWizziModelTypes({
                configOptions: {},
                wfschema: {
                    name: schemaName,
                    ittfDocumentUri: path.join(__dirname, 'ittf', 'lib', 'wizzi', 'schemas', schemaName + '.wfschema.ittf'),
                    outputPackageFolder: destPath
                }
            },
                function (err, result) {
                    if (err) {
                        throw new Error('Package: ' + packageName +
                            ' schema ' + schemaName +
                            '  wizzi models production error: ' + util.inspect(err, { depth: null }));
                    }
                    callback(result);
                }
            );
        }, function (err, result) {
            if (err) {
                wizzi.printWizziJobError($name, err);
            }
        });
    }
});

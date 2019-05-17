var util = require('util');
var path = require('path');
var async = require('async');
var wizzi = require('wizzi');
var generateSchemas = true;
var version = 'v4';

var destPath = path.join(__dirname, '..', 'dist');

/*
    begin params */
var packageName = 'wizzi-core';
var $name = packageName + ' ' + version + ' plugin package generator';
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
            'v4-wizzi-js', 
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
        globalContext: {}
    }
}, function (err) {
    if (err) {
        wizzi.printWizziJobError($name, err);
    }
    if (generateSchemas) {
        async.map([
            'wfjob', 'wfschema'
        ], function (schemaName, callback) {
            console.log('Generating schema ' + schemaName);
            wizzi.generateWizziModelTypes({
                configOptions: {},
                wfschema: {
                    name: schemaName,
                    ittfDocumentUri: path.join(__dirname, 'ittf', 'lib', 'wizzi', 'schemas', schemaName + '.wfschema.ittf'),
                    outputPackageFolder: destPath
                }},
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


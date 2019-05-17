var util = require('util');
var path = require('path');
var async = require('async');
var wizzi = require('wizzi');

/* begin params */
var version = 'v5';
var packageName = 'wizzi-lab';
var $name = packageName + ' ' + version + ' kernel package generator';
var generateSchemas = true;
var destPath = path.join(__dirname, '..', 'dist');
var schemasToGen = [], args = process.argv.slice(2);
if (args.length == 0) {
    schemasToGen = [
        'temp', 'raml', 'rdbms'
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
        wfBaseFolder: 'c:/my/wizzi/' +  version, 
        plugins: [
            'wizzi-core',
            'wizzi-meta', 
            'wizzi-js', 
            'wizzi-web', 
        ]
    }, 
    job: {
        name: packageName + ' generation', 
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
        async.map(schemasToGen, function (schemaName, callback) {
            console.log('Generating schema ' + schemaName);
            wizzi.generateWizziModelTypes({
                configOptions: {},
                wfschema: {
                    name: schemaName,
                    ittfDocumentUri: path.join(
                        __dirname, 'ittf', 'lib', 'wizzi', 'schemas', schemaName + '.wfschema.ittf'
                        ),
                    outputPackageFolder: destPath
                }
            },
            function (err, result) {
                if (err) {
                    throw new Error('Package: ' + packageName +
                        ' schema ' + schemaName +
                        '  WizziModelProduction error: ' + util.inspect(err, { depth: null }));
                }
                callback(result);
            });
        }, function (err, result) {
            if (err) {
                wizzi.printWizziJobError($name, err);
            }
        });
    }
});


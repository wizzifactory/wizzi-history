/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\plugins\regexp\source\generate.js.ittf
*/
'use strict';
var path = require('path');
var async = require('async');
var wizzi = require('wizzi');
function exec(gen_callback) {
    // begin params
    var $name = 'wizzi-demo - regexp plugin generation';
    var $schemaNames = [
        'regexp'
    ];
    var $destFolder = path.resolve(__dirname, '..', 'local');
    // end params
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: __dirname, 
            plugins: [
                'wizzi-core', 
                'wizzi-js', 
                'wizzi-web'
            ]
        }, 
        job: {
            name: $name, 
            ittfDocumentUri: path.join(__dirname, 'ittf', 'generate.wfjob.ittf'), 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
            }), 
            globalContext: {
                
            }
        }
    }, function(err, result) {
        if (err) {
            if (gen_callback) {
                return gen_callback(wizzi.printWizziJobError($name, err));
            }
            else {
                return wizzi.printWizziJobError($name, err);
            }
        }
        async.map($schemaNames, function async_item(schemaName, callback) {
            console.log('Generating schema ' + schemaName);
            wizzi.generateWizziModelTypes({
                configOptions: {
                    
                }, 
                wfschema: {
                    name: schemaName, 
                    ittfDocumentUri: path.join(__dirname, 'ittf', 'lib', 'wizzi', 'schemas', schemaName + '.wfschema.ittf'), 
                    outputPackageFolder: $destFolder
                }
            }, function(err, result) {
                if (err) {
                    return wizzi.printWizziJobError($name, err);
                }
                callback(result);
            });
        }, function(err, result) {
            if (err) {
                if (gen_callback) {
                    return gen_callback(wizzi.printWizziJobError($name, err));
                }
                else {
                    return wizzi.printWizziJobError($name, err);
                }
            }
            else {
                if (gen_callback) {
                    return gen_callback(null, result);
                }
            }
        });
    });
}
module.exports = function(callback) {
    exec(callback);
};
if (require.main === module) {
    exec();
}

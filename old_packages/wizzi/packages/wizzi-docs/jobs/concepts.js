/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-docs\src\ittf\jobs\concepts.js.ittf
    utc time: Thu, 17 Jan 2019 12:26:38 GMT
*/
'use strict';
var path = require('path');
var wizzi = require('wizzi');
// begin params
var $name = 'docs - concepts';
// end params
function exec(callback) {
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: 'c:\\my\\wizzi\\v6', 
            plugins: [
                'wizzi-core', 
                'wizzi-meta', 
                'wizzi-js', 
                'wizzi-web'
            ]
        }, 
        job: {
            name: $name, 
            ittfDocumentUri: path.join(__dirname, 'ittf', 'docs', 'concepts.wfjob.ittf'), 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2, 
                dumps: {
                    dumpsBaseFolder: path.join(__dirname, '_debug_dumps'), 
                    mTreeBuildupJsWizziCode: {
                        dump: true
                    }
                }
            }), 
            globalContext: {}
        }
    }, function(err, result) {
        if (callback) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, result);
            }
        }
        else {
            if (err) {
                console.log("Error executing wizzi instance job", err);
            }
        }
    });
}
module.exports = function(callback) {
    exec(callback);
};
if (require && require.main === module) {
    exec();
}

/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\src\lib\wizziloader.js.ittf
*/
'use strict';
var fs = require('fs');
var wizzi = require('wizzi');
var wizziFactoryConfig = {
    plugins: {
        items: [
            'wizzi-js'
        ]
    }
};
var wizziFactory = null;
function getWizziFactory(callback) {
    if (wizziFactory == null) {
        wizzi.fsnoaclFactory(wizziFactoryConfig, function(err, wf) {
            if (err) {
                return callback(err);
            }
            wizziFactory = wf;
            return callback(null, wizziFactory);
        });
    }
    else {
        return callback(null, wizziFactory);
    }
}
var readWizziJsModuleAsync = (options, callback) => {
    var filePath = options.filePath;
    var saveTemp = options.saveTemp;
    getWizziFactory(function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(filePath, {
            modelRequestContext: {
                
            }, 
            artifactRequestContext: {
                
            }
        }, 'js/module', function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            console.log('artifactText', artifactText);
            if (saveTemp) {
                var fileTemp = filePath.substr(0, filePath.length - 5);
                fs.writeFileSync(fileTemp, artifactText);
            }
            return callback(null, {
                    code: artifactText
                });
        });
    });
};
var readWizziJsModulePromise = (options) => {
    var filePath = options.filePath;
    var saveTemp = options.saveTemp;
    return new Promise((resolve, reject) =>
            getWizziFactory((err, wf) => {
                if (err) {
                    return reject(err);
                }
                wf.loadModelAndGenerateArtifact(filePath, {
                    modelRequestContext: {
                        
                    }, 
                    artifactRequestContext: {
                        
                    }
                }, 'js/module', (err, artifactText) => {
                    if (err) {
                        return reject(err);
                    }
                    // log 'artifactText', artifactText
                    if (saveTemp) {
                        var fileTemp = filePath.substr(0, filePath.length - 5);
                        fs.writeFileSync(fileTemp, artifactText);
                    }
                    return resolve({
                            code: artifactText
                        });
                });
            }));
};
module.exports = {
    readWizziJsModuleAsync: readWizziJsModuleAsync, 
    readWizziJsModulePromise: readWizziJsModulePromise
};

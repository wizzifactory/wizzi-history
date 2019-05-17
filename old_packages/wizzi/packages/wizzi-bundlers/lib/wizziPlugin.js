/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\src\lib\wizziplugin.js.ittf
*/
'use strict';
var path = require('path');
var createFilter = require('rollup-pluginutils').createFilter;
var wizziLoader = require("./wizziLoader");
var babelLoader = require("./babelLoader");
module.exports = function wizzi(options) {
    options = options || {};
    if (!options.include) {
        options.include = '**/*.js.ittf';
    }
    var filter = createFilter(options.include, options.exclude);
    return {
            transform: function(code, filePath) {
                if (filter(filePath) == false) {
                    console.log('wizziPlugin.transform.filePath excluded', filePath);
                    return null;
                }
                console.log('wizziPlugin.transform.filePath included', filePath);
                return new Promise((resolve, reject) =>
                        wizziLoader.readWizziJsModuleAsync({
                            filePath: filePath
                        }, (err, result) => {
                            if (err) {
                                return reject(err);
                            }
                            else {
                                console.log('wizziPlugin.transform.filePath artifactText', result.code);
                                babelLoader.babelTransform(result.code).then((result) => {
                                    console.log('wizziPlugin.transform.filePath babelTransform', result.code);
                                    return resolve(result);
                                }).catch((err) => {
                                    return reject(err);
                                })
                            }
                        }));
            }
        };
};

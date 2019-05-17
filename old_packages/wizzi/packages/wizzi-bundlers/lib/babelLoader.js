/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\src\lib\babelloader.js.ittf
*/
'use strict';
var babel = require("@babel/core");
var wizziLoader = require("./wizziLoader");
var babelOptions = {
    babelrc: false, 
    presets: [
        '@babel/env', 
        '@babel/react'
    ], 
    caller: {
        name: 'wizzi-bundlers', 
        supportsStaticESM: true, 
        supportsDynamicImport: true
    }
};
function babelTransformSync(code) {
    return babel.transform(code, babelOptions);
}
function babelTransform(code) {
    return new Promise((resolve, reject) =>
            babel.transform(code, babelOptions, (err, result) => {
                if (err) {
                    return reject(err);
                }
                console.log('babelTransform', result);
                return resolve(result);
            }));
}
function babelTransformFile(filePath) {
    return new Promise((resolve, reject) =>
            babel.transformFile(filePath, babelOptions, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            }));
}
function babelTransformWizziFile(filePath) {
    return new Promise((resolve, reject) =>
            wizziLoader.readWizziJsModulePromise({
                filePath: filePath
            }).then((artifact) => {
                console.log('babelTransformWizziFile.artifact', artifact);
                babelTransform(artifact.code).then((result) => {
                    return resolve(result);
                }).catch((err) => {
                    return reject(err);
                })
            }).catch((err) => {
                return reject(err);
            })
        );
}
module.exports = {
    babelTransform: babelTransform, 
    babelTransformSync: babelTransformSync, 
    babelTransformFile: babelTransformFile, 
    babelTransformWizziFile: babelTransformWizziFile
};

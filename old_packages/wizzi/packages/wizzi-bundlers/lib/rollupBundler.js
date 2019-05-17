/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\src\lib\rollupbundler.js.ittf
*/
'use strict';
var path = require('path');
var rollup = require('rollup');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var wizziPlugin = require('./wizziRollupPlugin');
var md = module.exports = {};
md.makeBundle = function(filePath, options, callback) {
    var basename = path.basename(filePath);
    var ss = basename.split('.');
    var name = ss[0];
    var inputOptions = {
        input: filePath, 
        plugins: [
            commonjs({
                extensions: [
                    '.js', 
                    '.js.ittf'
                ], 
                include: [
                    'node_modules/**'
                ], 
                exclude: [
                    'node_modules/process-es6/**'
                ], 
                namedExports: {
                    'node_modules/react/index.js': [
                        'Children', 
                        'Component', 
                        'PropTypes', 
                        'createElement'
                    ], 
                    'node_modules/react-dom/index.js': [
                        'render'
                    ]
                }
            }), 
            resolve({
                extensions: [
                    '.js', 
                    '.js.ittf'
                ], 
                browser: true
            }), 
            wizziPlugin(), 
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    };
    var outputOptions = {
        format: 'umd', 
        name: name
    };
    rollup.rollup(inputOptions).then((bundle) => {
        return bundle.generate(outputOptions);
    }).then((result) => {
        console.log('rollupBundler ok');
        var code;
        var i, i_items=result.output, i_len=result.output.length, chunkOrAsset;
        for (i=0; i<i_len; i++) {
            chunkOrAsset = result.output[i];
            if (chunkOrAsset.isAsset) {
            }
            else {
                code = chunkOrAsset.code;
                break;
            }
        }
        console.log('rollupBundler code', code);
        callback(null, code);
    }).catch((err) => {
        console.log('rollupBundler err', err);
        callback(err);
    })
};

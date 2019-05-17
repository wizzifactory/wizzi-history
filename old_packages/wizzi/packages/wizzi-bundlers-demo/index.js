/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers-demo\wizzi\ittf\root\index.js.ittf
    utc time: Sat, 29 Dec 2018 14:04:59 GMT
*/
'use strict';
var path = require('path');
var bundlers = require("wizzi-bundlers");
var file = require('wizzi-utils').file;
var source_rollup = path.join(__dirname, 'src', 'ittf', 'rollup', 'index.js.ittf');
var output_rollup = path.join(__dirname, 'scripts', 'rollup.bundle.js');
var source_webpack = path.join(__dirname, 'src', 'ittf', 'webpack', 'index.js.ittf');
var source_parcel = path.join(__dirname, 'src', 'parcel', 'index.html');
bundlers.rollupBundler.makeBundle(source_rollup, {}, function(err, generated) {
    console.log('err', err);
    if (err) {
        throw new Error(JSON.stringify(err, null, 2));
    }
    console.log('wizzi-bundlers-demo.generated rollup', generated);
    file.write(output_rollup, generated);
});
bundlers.webpackBundler.makeBundle(source_webpack, {
    outputPath: path.join(__dirname, 'scripts'), 
    outputFileName: 'webpack.bundle.js'
}, function(err, generated) {
    console.log('err', err);
    if (err) {
        throw new Error(JSON.stringify(err, null, 2));
    }
    console.log('wizzi-bundlers-demo.generated webpack', generated);
});
bundlers.parcelBundler.makeBundle(source_parcel, {
    outputPath: path.join(__dirname, 'dist'), 
    outputFileName: 'parcel.bundle.html'
}, function(err, generated) {
    console.log('err', err);
    if (err) {
        throw new Error(JSON.stringify(err, null, 2));
    }
    console.log('wizzi-bundlers-demo.generated parcel', generated);
});

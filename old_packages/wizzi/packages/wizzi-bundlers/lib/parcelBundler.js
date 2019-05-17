/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\src\lib\parcelbundler.js.ittf
*/
'use strict';
var path = require('path');
var Parcel = require('parcel-bundler');
var md = module.exports = {};
md.makeBundle = function(filePath, options, callback) {
    // outDir         La directory nella quale posizionare l'output del bundle, di default "dist"
    // outFile        Il nome dell' outputFile
    // publicUrl      L'url del server, di default "dist"
    // watch          Se effettuare o meno il watch dei file, di default la configurazione é process.env.NODE_ENV !== 'production'
    // cache          Attiva o disattiva la cache, di default true
    // cacheDir       La directory nella quale la cache é salvata, di default é .cache
    // minify         Minifica i files, abilitata se process.env.NODE_ENV === 'production'
    // target         browser/node/electron, di default é browser
    // https          Protocollo del server: https o http, di default é false
    // logLevel       3 = tutti i log, 2 = log di avvisi & errori, 1 = log degli errori
    // hmrPort        La porta sulla quale gira l'hmr, di default é una porta casuale libera (0 in node.js restituisce una porta casuale libera)
    // sourceMaps     Attiva o disattiva le sourcemaps, di default é attivata (non sono ancora supportate nelle build minificate)
    // hmrHostname    Un hostname per l'hot module reload, di default é ''
    // detailedReport Restituisce un report dettagliato dei bundles, assets, dimensione dei file e timestamps, di default é false, i report vengono generati solo se il watch é disattivato
    console.log('wizzi-bundlers.parcelBundler.makeBundle.options', options);
    var parcelOptions = {
        outDir: options.outputPath || path.resolve(path.dirname(filePath), '..', 'scripts'), 
        outFile: options.outputFileName || 'bundle.js', 
        publicUrl: './', 
        watch: false, 
        cache: true, 
        cacheDir: '.cache', 
        minify: false, 
        target: 'browser', 
        https: false, 
        logLevel: 3, 
        hmrPort: 0, 
        sourceMaps: false, 
        hmrHostname: '', 
        detailedReport: false
    };
    var bundler = new Parcel(filePath, parcelOptions);
    bundler.bundle().then((result) => {
        return callback(null, result);
    }).catch((err) => {
        return callback(err);
    })
};

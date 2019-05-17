/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-tools\src\ittf\examples\import\index.js.ittf
*/
'use strict';
var path = require('path');
var importFolder = require('../../lib/importers').importFolder;
var importFile = require('../../lib/importers').importFile;
var thrdfolder = 'C:/My/wizzi/v5/apps/3dParty';
var jsTutorial = 'C:/My/wizzi/v5/apps/js-tutorials';
// var name = 'material'
// var name = 'react-scripts'
// var name = 'filemanager-client'
// var name = 'snack-web'
// _ go
// _ snack
react_typescript();
// _ react_webpack_typescript_babel
// _ chrome_ext
function go() {
    // var outpackage = 'firebase-hn'
    var outpackage = 'markdown-blog';
    nextjs_folder('pages', outpackage);
    nextjs_folder('lib', outpackage);
    nextjs_folder('components', outpackage);
    nextjs_file('package.json', outpackage);
    nextjs_file('next.config.js', outpackage);
    nextjs_file('server.js', outpackage);
}
function nextjs_folder(folder, outpackage) {
    importFolder(path.join(thrdfolder, 'zeit', 'learnnextjs-demo', folder), path.join(jsTutorial, 'zeit', outpackage, 'wizzi', 'ittf', 'src', folder), function(err, notUsed) {
        if (err) {
            console.log('+++++++++++++++++++++++++++++++++++err', err);
            throw err;
        }
        console.log('importFolder done');
    });
}
function nextjs_file(file, outpackage) {
    importFile(path.join(thrdfolder, 'zeit', 'learnnextjs-demo', file), path.join(thrdfolder, 'zeit', 'learnnextjs-demo'), path.join(jsTutorial, 'zeit', outpackage, 'wizzi', 'ittf', 'root'), function(err, notUsed) {
        if (err) {
            console.log('+++++++++++++++++++++++++++++++++++err', err);
            throw err;
        }
        console.log('importFile done');
    });
}
function snack() {
    importFolder("C:/My/wizzi/v5/apps/3dParty/snack-web/src/client", "C:/My/wizzi/v5/apps/3dParty/snack-web/ittf/client", {
        excludes: [
            '/vendor', 
            '\\vendor'
        ]
    }, function(err, notUsed) {
        if (err) {
            console.log('+++++++++++++++++++++++++++++++++++err', err);
            throw err;
        }
        console.log('importFolder done');
    });
}
function chrome_ext() {
    importFolder("C:/My/wizzi/v5/apps/js-tutorials/chrome/get_started_complete", "C:/My/wizzi/v5/apps/js-tutorials/chrome/ext1/wizzi/ittf/root", function(err, notUsed) {
        if (err) {
            console.log('+++++++++++++++++++++++++++++++++++err', err);
            throw err;
        }
        console.log('importFolder done');
    });
}
function react_typescript() {
    importFolder("C:/My/wizzi/v5/apps/3dParty/react-redux-typescript-guide/playground", "C:/My/wizzi/v5/apps/3dParty/react-redux-typescript-guide/ittf", function(err, notUsed) {
        if (err) {
            console.log('+++++++++++++++++++++++++++++++++++err', err);
            throw err;
        }
        console.log('importFolder done');
    });
}
function react_webpack_typescript_babel() {
    importFolder("C:/My/wizzi/v5/apps/3dParty/react-webpack-typescript-babel/original", "C:/My/wizzi/v5/apps/3dParty/react-webpack-typescript-babel/ittf", function(err, notUsed) {
        if (err) {
            console.log('+++++++++++++++++++++++++++++++++++err', err);
            throw err;
        }
        console.log('importFolder done');
    });
}

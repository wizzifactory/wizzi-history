/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\parcel-plugin-wizzi\wizzi\ittf\root\index.js.ittf
*/
'use strict';
module.exports = function(bundler) {
    bundler.addAssetType('ittf', require.resolve('./src/WizziJsAsset'));
    bundler.addAssetType('js', require.resolve('./src/WizziJsAsset'));
};

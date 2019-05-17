/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\parcel-plugin-wizzi\wizzi\ittf\src\wizzijsasset.js.ittf
*/
'use strict';
const path = require('path');
const JSAsset = require('parcel-bundler/src/assets/JSAsset');
const wizziLoader = require('./wizziLoader');
const jsIttfRegex = /\.js\.ittf$/;
const htmlIttfRegex = /\.html\.ittf$/;
class WizziJsAsset extends JSAsset {
    constructor(name, pkg, options) {
        super(name,pkg,options);
        console.log('WizziJsAsset.ctor.name', name);
        // log 'pkg', pkg
        // log 'WizziJsAsset.ctor.options', options
        this.type = 'js';
    }
    async load() {
        console.log('WizziJsAsset.load.name', this.name);
        console.log('is html ittf', htmlIttfRegex.test(this.name));
        console.log('is js ittf', jsIttfRegex.test(this.name));
        if (jsIttfRegex.test(this.name)) {
            const result = await wizziLoader.readWizziJsModulePromise({
                    filePath: this.name
                });
            ;
            // log 'WizziJsAsset.load.result', result.code
            return result.code;
        }
        else {
            return super.load();
        }
    }
}
module.exports = WizziJsAsset;

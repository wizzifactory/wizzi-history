/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\parcel-plugin-wizzi\wizzi\ittf\root\index.test.js.ittf
*/
'use strict';
const Bundler = require('parcel-bundler');
it('should compile example file', async () => {
    const bundler = new Bundler('./examples/index.html');
    bundler.addAssetType('js.ittf', require.resolve('./src/WizziJsAsset'));
    await bundler.bundle();
    await bundler.stop();
});

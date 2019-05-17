var path = require('path');
var wizzi = require('wizzi');
var version = 'v5'

/* begin params */
var packageName = 'wizzi-repo';
var $name = packageName + ' ' + version + ' kernel package generator';
var $isPackageDeploy = true;
var $isWebpackTarget = false;
var $gctx_useMongo = false;
var args = process.argv.slice(2);
args.forEach(function (val, index) {
    if (val === 'webpack') {
        $isWebpackTarget = true;
    }
    if (val === 'nodeploy') {
        $isPackageDeploy = false;
    }
    if (val === 'mongo') {
        $gctx_useMongo = true;
    }
});
console.log("*** $isWebpackTarget", $isWebpackTarget)
console.log("*** $isPackageDeploy", $isPackageDeploy)
console.log("*** $gctx_useMongo", $gctx_useMongo)
/* end params */

wizzi.executeWizziJob({
    user: 'stefi',
    role: 'admin',
    storeKind: 'filesystem',
    config: {
        wfBaseFolder: 'c:/my/wizzi/' + version,
        plugins: [
            'wizzi-core',
            'wizzi-meta',
            'wizzi-js',
            'wizzi-docs'
        ]
    },
    job: {
        name: $name,
        ittfDocumentUri: path.join(__dirname, 'generate.wfjob.ittf'),
        productionOptions: wizzi.productionOptions({
            indentSpaces: 4,
            basedir: __dirname,
            verbose: 2
        }),
        globalContext: 
        {
            gctx_useMongo: $gctx_useMongo,
            isPackageDeploy: $isPackageDeploy,
            isWebpackTarget: $isWebpackTarget,
        }
    }
}, function (err) {
    if (err) {
        wizzi.printWizziJobError($name, err);
    }
});
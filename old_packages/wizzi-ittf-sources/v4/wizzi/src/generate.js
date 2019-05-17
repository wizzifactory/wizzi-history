var path = require('path');
var wizzi = require('wizzi');
var version = 'v4'

/*
    begin params */
var packageName = 'wizzi';
var $name = packageName + ' ' + version + ' kernel package generator';
/*
    end params */

wizzi.executeWizziJob({
    user: 'stefi',
    role: 'admin',
    storeKind: 'filesystem',
    config: {
        wfBaseFolder: 'c:/my/wizzi/' + version,
        plugins: [
            'wizzi-core',
            'wizzi-meta',
            'v4-wizzi-js',
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
        globalContext: {}
    }
}, function (err) {
    if (err) {
        wizzi.printWizziJobError($name, err);
    }
});
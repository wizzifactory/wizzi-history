var path = require('path');
var wizzi = require('wizzi');

wizzi.executeInstanceJob({
    config: {
        wfBaseFolder: 'c:\\my\\wizzi\\next',
        repoUri: 'mongodb://localhost:27017/darvin',
        repoBaseFolderUri: 'c://users'
    },
    job: {
        name: 'dashboard package generator',
        path: path.join(__dirname, 'generate.wfjob.ittf'),
        /*path: 'repo://stefi/demo1/sources/generate.wfjob.ittf',*/
        aclStat: new wizzi.acl.AclStat('stefi', 'admin'),
        options: wizzi.options({
            indentSpaces: 4,
            basedir: __dirname,
            verbose: 2
        }),
        wizziFactoryPackages: [
        ],
        globalContext: {
            test: 'fuffy'
        }
    }
}, function (err) {
    if (err) {
        console.log("Error executing wizzi instance job", err)
    }
});
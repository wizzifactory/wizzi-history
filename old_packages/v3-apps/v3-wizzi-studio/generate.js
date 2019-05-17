var path = require('path');
var wizzi = require('wizzi');
var version = 'v3';

wizzi.executeInstanceJob({
    config: {
        wfBaseFolder: 'c:\\my\\wizzi\\' + version,
        repoUri: 'mongodb://localhost:27017/darvin',
        repoBaseFolderUri: 'c://users'
    },
    job: {
        name: 'wizzi-studio dashboard ' + version + ' generator',
        path: path.join(__dirname, 'generate.wfjob.ittf'),
        aclStat: new wizzi.acl.AclStat('stefi', 'admin'),
        options: wizzi.options({
            indentSpaces: 4,
            basedir: __dirname,
            verbose: 2
        }),
        wizziFactoryPackages: [
        ],
        globalContext: {
        }
    }
}, function (err) {
    if (err) {
        console.log("Error executing wizzi instance job", err)
    }
});
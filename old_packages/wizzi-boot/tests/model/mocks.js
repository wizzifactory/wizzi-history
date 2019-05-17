// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:26 GMT
'use strict';
var util = require('util');
var path = require('path');

var Repository = require('../../lib/services/repository');
var filefinder = require('../../lib/services/filefinder');
var md = module.exports = {};
md.createPmanStateForPackage = function(packageName,basedir) {
    // search and require package
    var packageObject = getPackage(packageName);
    // create repository instance
    var repository = new Repository();
    // register the package
    repository.registerWizziFactoryPackage(packageObject);
    var pmanState = {
        options: {
            verbose: 2, 
            basedir: basedir
        }, 
        getWizziModelFactory: function(wizzischema) {
            return repository.getWizziModelFactory(wizzischema);
        }, 
        getModelTransformer: function(transName) {
            return repository.getModelTransformer(transName);
        }, 
        getArtifactGenerator: function(generatorName) {
            return repository.getArtifactGenerator(generatorName);
        }
    };
    return {
            pman: pmanState, 
            models: {}
        };
};
function getPackage(pkg) {
    if (pkg === 'wizzi') {
        return require('../../index');
    }
    else if (typeof pkg === 'string') {
        pkg = searchPackage(pkg);
    }
    else if (typeof pkg === 'function') {
        pkg = pkg();
    }
    if (typeof pkg !== 'object') {
        throw new TypeError('package must be of type object');
    }
    return pkg;
}

function searchPackage(packageName) {
    var packagePath = filefinder.findNodePackage(packageName, __dirname, true)
    ;
    return packagePath;
}


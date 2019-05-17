/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\model\mocks.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var Repository = require('../../lib/services/repository');
var filefinder = require('../../lib/services/filefinder');
var md = module.exports = {};
// A mock ProductionManager only with methods
// used by a ModelInfo instance
md.createPmanForPackage = function(packageName,basedir) {
    // search and require package
    var packageObject = getPackage(packageName);
    // create repository instance
    var repository = new Repository();
    // register the package
    repository.registerWizziFactoryPackage(packageObject);
    return {
            options: {
                verbose: 2, 
                basedir: basedir
            }, 
            __state: {
                models: {}
            }, 
            getWizziModelFactory: function(wizzischema) {
                return repository.getWizziModelFactory(wizzischema);
            }, 
            getModelTransformer: function(transName) {
                return repository.getModelTransformer(transName);
            }, 
            getArtifactGenerator: function(generatorName) {
                return repository.getArtifactGenerator(generatorName);
            }, 
            setStateModel: function(key,value) {
                this.___state.models[key] = value;
            }
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


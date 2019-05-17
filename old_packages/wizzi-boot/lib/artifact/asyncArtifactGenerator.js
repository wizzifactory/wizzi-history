var path = require('path');
var util = require('util');
var async = require('async');
var verify = require('../util/verify');
var log = require('../util/log')(module);
var GenWriter = require('./genWriter');
function logme() {
    if (false) console.log.apply(console, arguments);
}
/*
    Generation functions are called by the production/runner.
    A generation produces an array of writeContext, ready for persisting the artifact,
    that are accumulated into the artifactInfo.
*/
var AsyncArtifactGenerator = {
    /*
        param artifactInfo:ArtifactInfo
        param generator:Object { // retrieved from a WizziPackage
                  gen:Function   // executes generation 
              }
        param modelInfos:Array of ModelInfo
        param contextModelsCollection:Array of Objects (WizziModelInstances or other)
                          1 Context object for each ModelInfo
    */
    generate: function (artifactInfo, generator, modelInfos, contextModelsCollection, callback) {
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            log.error('generator', generator);
            throw new Error('wizzi-factory.AsyncArtifactGenerator. parameter @generator@ must be an object and contain the @gen@ function.');
        }
        var genItems = [];
        for (var i = 0; i < modelInfos.length; i++) {
            var modelInfo = modelInfos[i];
            var contextModelItem = contextModelsCollection[i];
            var genWriter = new GenWriter({
                model: null,  // // required only by collection artifacts for resolving the destination filepath.
                srcPath: modelInfo.src(),
                srcFullPath: modelInfo.srcFullPath(),
                options: artifactInfo.options,
                pman: artifactInfo.___state.pman
            });
            genItems.push({
                generator: generator,
                genContext: contextModelItem,
                genWriter: genWriter,
            });
        }
        async.map(genItems, AsyncArtifactGenerator._gen_item, function (err, genWriters) {
            genWriters.forEach(function (item) {
                artifactInfo.addGenWriter(item); // augment artifactInfo with result
            });
            callback(null);
        });
    },
    /*
        each genCollectionContext contains the collection item context and 
        all context model instances declared
        on the element @artifact-template@ of the @wfjob@ schema
    */
    generateFromCollectionContexts: function (artifactInfo, generator, modelInfos, contextModelsCollectionCollection, callback) {
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            log.error('generator', generator);
            throw new Error('wizzi-factory.AsyncArtifactGenerator. parameter @generator@ must be an object and contain the @gen@ function.');
        }
        var genItems = [];
        for (var i = 0; i < modelInfos.length; i++) {
            var modelInfo = modelInfos[i];
            var contextModelsCollection = contextModelsCollectionCollection[i];
            for (var j = 0; j < contextModelsCollection.length; j++) {
                var contextModelItem = contextModelsCollection[j];
                logme('AsyncArtifactGenerator.generateFromCollectionContexts', 'item', j, contextModelItem);
                var genWriter = new GenWriter({
                    model: contextModelItem.___collItem, // required by collection artifacts for resolving the destination filepath.
                    srcPath: modelInfo.src(),
                    srcFullPath: modelInfo.srcFullPath(),
                    options: artifactInfo.options,
                    pman: artifactInfo.___state.pman
                });
                genItems.push({
                    generator: generator,
                    genContext: contextModelItem,
                    genWriter: genWriter
                });
            }
        }
        async.map(genItems, AsyncArtifactGenerator._gen_item, function (err, genWriters) {
            genWriters.forEach(function (item) {
                artifactInfo.addGenWriter(item); // augment artifactInfo with result
            });
            callback(null);
        });
    },
    generateCodeWrite: function (artifactInfo, generator, contextModelsCollection, callback) {
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            log.error('generator', generator);
            throw new Error('wizzi-factory.AsyncArtifactGenerator. parameter @generator@ must be an object and contain the @gen@ function.');
        }
        var genContext = {};
        contextModelsCollection.forEach(function (item) {
            genContext[item.___exportName] = item;
        })
        var genWriter = new GenWriter({
            model: null, // required by collection artifacts for resolving the destination filepath.
            srcPath: null,
            srcFullPath: null,
            options: artifactInfo.options,
            pman: artifactInfo.___state.pman
        });
        new generator.gen(
            genContext, genWriter
        );
        artifactInfo.addGenWriter(genWriter); // augment artifactInfo with result
        callback(null);
    },
    _gen_item: function (genInfo, callback) {
        // TODO make async
        logme('AsyncArtifactGenerator._gen_item', 'genInfo.genContext', genInfo.genContext);
        new genInfo.generator.gen(
            genInfo.genContext, genInfo.genWriter, callback
        );
    }
};
module.exports = AsyncArtifactGenerator;

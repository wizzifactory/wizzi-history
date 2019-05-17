/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifact\asyncArtifactGenerator.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var verify = require('../util/verify');
var log = require('../util/log')(module)

;
var GenWriter = require('./genWriter');
function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}


/**
     Generation functions are called by the production/runner.
     A generation produces an array of writeContext, ready for persisting the artifact,
     that are accumulated into the artifactInfo.
*/

var AsyncArtifactGenerator = {
    /**
         param artifactInfo:ArtifactInfo
         param generator:Object { // retrieved from a WizziPackage
         gen:Function   // executes generation
         }
         param modelInfos:Array of ModelInfo
         param contextModelsCollection:Array of Objects (WizziModelInstances or other)
         1 Context object for each ModelInfo
    */
    generate: function(artifactInfo,generator,modelInfos,contextModelsCollection,callback) {
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generate', artifactInfo)
                )
            ;
        }
        var genItems = [];
        for (var i = 0; i < modelInfos.length; i++) {
            var modelInfo = modelInfos[i];
            var contextModelItem = contextModelsCollection[i];
            var genWriter = new GenWriter({
                model: null, 
                srcPath: modelInfo.src(), 
                srcFullPath: modelInfo.srcFullPath(), 
                options: artifactInfo.options, 
                pman: artifactInfo.productionManager
            });
            genItems.push({
                generator: generator, 
                genContext: contextModelItem, 
                genWriter: genWriter
            });
        }
        async.map(genItems, AsyncArtifactGenerator._gen_item, function(err,genWriters) {
            if (err) {
                return callback(err)
                ;
            }
            var i, i_len=genWriters.length, item;
            for (i=0; i<i_len; i++) {
                item = genWriters[i];
                artifactInfo.addGenWriter(item);
            }
            callback(null, {
                oper: 'AsyncArtifactGenerator.generate', 
                status: 'success', 
                item: 'genWriters.count: ' + genWriters.length
            });
        });
    }, 
    generateFromCollectionContexts: function(artifactInfo,generator,modelInfos,contextModelsCollectionCollection,callback) {
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generateFromCollectionContexts', artifactInfo)
                )
            ;
        }
        var genItems = [];
        for (var i = 0; i < modelInfos.length; i++) {
            var modelInfo = modelInfos[i];
            var contextModelsCollection = contextModelsCollectionCollection[i];
            for (var j = 0; j < contextModelsCollection.length; j++) {
                var contextModelItem = contextModelsCollection[j];
                logme('AsyncArtifactGenerator.generateFromCollectionContexts', 'item', j, contextModelItem);
                var genWriter = new GenWriter({
                    model: contextModelItem.___collItem, 
                    srcPath: modelInfo.src(), 
                    srcFullPath: modelInfo.srcFullPath(), 
                    options: artifactInfo.options, 
                    pman: artifactInfo.productionManager
                });
                genItems.push({
                    generator: generator, 
                    genContext: contextModelItem, 
                    genWriter: genWriter
                });
            }
        }
        async.map(genItems, AsyncArtifactGenerator._gen_item, function(err,genWriters) {
            if (err) {
                return callback(err)
                ;
            }
            var i, i_len=genWriters.length, item;
            for (i=0; i<i_len; i++) {
                item = genWriters[i];
                artifactInfo.addGenWriter(item);
            }
            callback(null, {
                oper: 'AsyncArtifactGenerator.generate', 
                status: 'success', 
                item: 'genWriters.count: ' + genWriters.length
            });
        });
    }, 
    generateCodeWrite: function(artifactInfo,generator,contextModelsCollection,callback) {
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generateCodeWrite', artifactInfo)
                )
            ;
        }
        var genContext = {};
        contextModelsCollection.forEach(function(item) {
            genContext[item.___exportName] = item;
        });
        var genWriter = new GenWriter({
            model: null, 
            srcPath: null, 
            srcFullPath: null, 
            options: artifactInfo.options, 
            pman: artifactInfo.productionManager
        });
        new generator.gen(genContext, genWriter);
        artifactInfo.addGenWriter(genWriter);
        callback(null, {
            oper: 'AsyncArtifactGenerator.generateCodeWrite', 
            status: 'success'
        });
    }, 
    _gen_item: function(genInfo,callback) {
        logme('AsyncArtifactGenerator._gen_item', 'genInfo.genContext', genInfo.genContext);
        new genInfo.generator.gen(genInfo.genContext, genInfo.genWriter, callback);
    }
};
function error(message,method) {
    var err = {
        __is_error: true, 
        message: message, 
        source: "wizzi/lib/artifact/asyncArtifactGenerator.js/" + method
    };
    logme(err);
    return err;
}

module.exports = {
    AsyncArtifactGenerator: AsyncArtifactGenerator
};

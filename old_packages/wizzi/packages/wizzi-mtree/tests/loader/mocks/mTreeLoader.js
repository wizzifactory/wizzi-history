/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\loader\mocks\mtreeloader.js.ittf
*/
'use strict';
var url = require('url');
var util = require('util');
var mocks = require('./misc');
var MTreeBrickProvider = require('../../../lib/loader/mTreeBrickProvider');
var mixer = require('../../../lib/loader/mixer');
var appender = require('../../../lib/loader/appender');
var evaluator = require('../../../lib/loader/evaluator');
module.exports = function(store, content_filepath, callback) {
    var loadContext = {
        mTreeBuildUpContext: {}, 
        productionContext: mocks.ProductionContext, 
        __ittfDocumentStore: store
    };
    MTreeBrickProvider.createFromUri(content_filepath, loadContext, function(err, provider) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        var mTree = provider.getPrimaryMTreeBrick();
        mixer(mTree, provider, function(err, mixedModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            appender(mixedModel, function(err, appendedModel) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                evaluator(appendedModel, loadContext, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    callback(null, result);
                });
            });
        });
    });
};

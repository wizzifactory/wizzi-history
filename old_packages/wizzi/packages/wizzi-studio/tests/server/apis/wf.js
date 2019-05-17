/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\tests\server\apis\wf.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var path = require('path');
var util = require('util');
var del = require('del');
var expect = require('expect.js');
var resultsUri = path.join(__dirname, 'results');
var simpleJsUri = path.join(__dirname, 'ittf', 'js', 'simple.js.ittf');
var api = {};
require('../../../server/apis/wf')(null, {
    storeKind: 'filesystem', 
    plugins: [
        'wizzi-js'
    ], 
    user: 'stefi', 
    role: 'admin'
}, api, function(err, api) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    var wfApi = api.wf;
    console.log('wfApi', wfApi);
    describe("studio api", function() {
        console.log('studio creation');
        var sessionData = {};
        var modelContext = {};
        var artifactsContext = {};
        describe("creation", function() {
            before(function(done) {
                del([
                    resultsUri
                ]);
                done();
            });
            it("should load a js wizzi model", function(done) {
                wfApi.loadModel(sessionData, simpleJsUri, modelContext, function(err, wizziModel) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    expect(wizziModel).to.be.an('object');
                    done();
                });
            });
            it("should generate a js/module", function(done) {
                wfApi.loadModelAndGenerateArtifact(sessionData, simpleJsUri, modelContext, 'js/module', artifactsContext, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    console.log('should generate a js/module. result', result);
                    expect(result).to.be.an('object');
                    expect(result.status).to.be.an('object');
                    expect(result.status.__is_success).to.be(true);
                    expect(result.data).to.be.a('string');
                    done();
                });
            });
        });
    });
})

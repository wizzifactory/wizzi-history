/*
    artifact generator: C:\My\wizzi\v6\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v6\plugins\wizzi-js\src\ittf\tests\js\model_js.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var mtree = require('wizzi-mtree');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var mocks = require('wizzi-utils').mocks;

var js_factory = require('../../lib/wizzi/models/js-factory.g');
var js_artifact = require('../../lib/artifacts/js/module/gen/main');

describe("model js", function() {
    var loadModel;
    before(function() {
        loadModel = js_factory.createLoadModel(getWizziObject());
    });
    it("should load a basic js ittf document", function(done) {
        var info = getTestModelInfo('js', 'basic');
        loadModel(info.ittfPath, getLoadModelContext({}), function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            js_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                var artifactText = result.getContent();
                info.writeResult(artifactText);
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be(info.expectedContent);
                done();
            });
        });
    });
    it("should load a mixed js ittf document", function(done) {
        var info = getTestModelInfo('js', 'mixed');
        loadModel(info.ittfPath, getLoadModelContext({}), function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            js_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                var artifactText = result.getContent();
                info.writeResult(artifactText);
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be(info.expectedContent);
                done();
            });
        });
    });
});

function getWizziObject() {
    return {
            loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                useCache: false
            }), 
            file: file, 
            verify: verify
        };
}

function getLoadModelContext(mTreeBuildUpContext) {
    return mocks.getLoadModelContext(mTreeBuildUpContext);
}

function getTestModelInfo(schemaName, modelName) {
    
    var expectedPath = path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.expected');
    var expectedContent = file.read(expectedPath);
    return {
            ittfPath: path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.ittf'), 
            expectedPath: expectedPath, 
            expectedContent: expectedContent, 
            writeResult: function(content) {
                file.write(path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.result'), content);
            }
        };
}

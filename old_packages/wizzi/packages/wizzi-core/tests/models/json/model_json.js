/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\tests\models\json\model_json.js.ittf
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

var json_factory = require('../../../lib/wizzi/models/json-factory.g');
var json_artifact = require('../../../lib/artifacts/json/document/gen/main');

describe("model json", function() {
    var loadModel;
    before(function() {
        loadModel = json_factory.createLoadModel(getWizziObject());
    });
    it("should load a basic json ittf document", function(done) {
        loadModel(path.join(__dirname, 'ittf', 'basic.json.ittf'), getLoadModelContext({}), function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            json_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
                var artifactText = result.getContent();
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be('{\n    "Hello": "stefi"\n}\n');
                done();
            });
        });
    });
    it("should load a mixed json ittf document", function(done) {
        loadModel(path.join(__dirname, 'ittf', 'mixed.json.ittf'), getLoadModelContext({}), function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            json_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
                var artifactText = result.getContent();
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be('{\n    "Copyright": "(c) Wizzi"\n}\n');
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

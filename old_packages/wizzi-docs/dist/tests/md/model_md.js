/*
    artifact generator: C:\My\wizzi\v4\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-docs\src\ittf\tests\md\model_md.js.ittf
    utc time: Mon, 23 Oct 2017 10:07:40 GMT
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

var md_factory = require('../../lib/wizzi/models/md-factory.g');
var md_artifact = require('../../lib/artifacts/md/document/gen/main');

describe("model md", function() {
    var loadModel;
    before(function() {
        loadModel = md_factory.createLoadModel(getWizziObject())
        ;
    });
    it("should load a basic md ittf document", function(done) {
        loadModel(path.join(__dirname, 'ittf', 'basic.md.ittf')
        , getLoadModelContext({})
        , function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            md_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
                var artifactText = result.getContent();
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be('# Hello stefi\n');
                done();
            });
        });
    });
    it("should load a mixed md ittf document", function(done) {
        loadModel(path.join(__dirname, 'ittf', 'mixed.md.ittf')
        , getLoadModelContext({})
        , function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            md_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
                var artifactText = result.getContent();
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be('# (c) Wizzi\n');
                done();
            });
        });
    });
});

function getWizziObject() {
    return {
            loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                useCache: false
            })
            , 
            file: file, 
            verify: verify
        };
}

function getLoadModelContext(mTreeBuildUpContext) {
    return mocks.getLoadModelContext(mTreeBuildUpContext)
    ;
}

function getTestModelInfo(schemaName, modelName) {
    
    var expectedPath = path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.expected')
    ;
    var expectedContent = file.read(expectedPath)
    ;
    return {
            ittfPath: path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.ittf')
            , 
            expectedPath: expectedPath, 
            expectedContent: expectedContent, 
            writeResult: function(content) {
                file.write(path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.result')
                , content);
            }
        };
}

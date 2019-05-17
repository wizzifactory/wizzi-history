/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-core\src\ittf\tests\models\xml\model_xml.js.ittf
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

var xml_factory = require('../../../lib/wizzi/models/xml-factory.g');
var xml_artifact = require('../../../lib/artifacts/xml/document/gen/main');

describe("model xml", function() {
    var loadModel;
    before(function() {
        loadModel = xml_factory.createLoadModel(getWizziObject());
    });
    it("should load a basic xml ittf document", function(done) {
        loadModel(path.join(__dirname, 'ittf', 'basic.xml.ittf'), getLoadModelContext({}), function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            xml_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
                var artifactText = result.getContent();
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be('<?xml version="1.0">\n<user name="stefi" />\n');
                done();
            });
        });
    });
    it("should load a mixed xml ittf document", function(done) {
        loadModel(path.join(__dirname, 'ittf', 'mixed.xml.ittf'), getLoadModelContext({}), function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            xml_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
                var artifactText = result.getContent();
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be('<?xml version="1.0">\n<footer Copyright="(c) Wizzi" />\n');
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

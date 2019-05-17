/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\tests\server\apis\studio.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var path = require('path');
var util = require('util');
var del = require('del');
var expect = require('expect.js');
var studioBasePath = path.join(__dirname, 'studio');
var api = {}, studioApi, docUri, firstFragUri, secondFragUri;
describe("studio api", function() {
    console.log('studio creation');
    describe("creation", function() {
        before(function(done) {
            del([
                path.join(studioBasePath, '/**/*.*'), 
                path.join(studioBasePath, '/**/.*')
            ]).then((paths) => {
                console.log('Deleted files and folders:\n', paths.join('\n'));
                require('../../../server/apis/studio')(null, {
                    studioBasePath: studioBasePath
                }, api, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    api = result;
                    studioApi = api.studio;
                    console.log('studioApi', studioApi);
                    done();
                })
            })
        });
        it("should create a js ittf document", function(done) {
            studioApi.createDocument({
                userId: 'stefi', 
                projectName: 'demo', 
                folder: 'examples', 
                schemaName: 'js', 
                documentName: 'ecma2015'
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('create.document', err, result);
                expect(result).to.be.an('object');
                expect(result.data.uri).to.be.a('string');
                expect(result.data.uri).to.be('/stefi/demo/examples/ecma2015.js.ittf');
                docUri = result.data.uri;
                done();
            });
        });
        it("should create a second js ittf document with default user and project", function(done) {
            studioApi.createDocument({
                kind: 'genexplorer', 
                folder: 'examples', 
                schemaName: 'js', 
                documentName: 'ecma2015'
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('create.document', err, result);
                expect(result).to.be.an('object');
                expect(result.data.uri).to.be.a('string');
                expect(result.data.uri).to.be('/demo/genexplorer/examples/ecma2015.js.ittf');
                docUri = result.data.uri;
                done();
            });
        });
        it("should update a js ittf document", function(done) {
            studioApi.updateDocument(docUri, 'module new content', function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('update.document', err, result);
                expect(result).to.be.an('object');
                done();
            });
        });
        it("should create a first fragment", function(done) {
            studioApi.createFragment({
                userId: 'stefi', 
                projectName: 'test', 
                folder: 'examples', 
                schemaName: 'js', 
                fragmentName: 'libs'
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('create.fragment', err, result);
                expect(result).to.be.an('object');
                expect(result.data.uri).to.be.a('string');
                expect(result.data.uri).to.be('/stefi/test/examples/t/libs.js.ittf');
                firstFragUri = result.data.uri;
                done();
            });
        });
        it("should update the first fragment", function(done) {
            studioApi.updateFragment(firstFragUri, 'fragment content', function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('update.fragment', err, result);
                expect(result).to.be.an('object');
                done();
            });
        });
        it("should get the first fragment", function(done) {
            studioApi.getFragment(firstFragUri, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('get.fragment', err, result);
                expect(result).to.be.an('object');
                expect(result.data).to.be.a('string');
                expect(result.data).to.be('fragment content');
                done();
            });
        });
        it("should create a second fragment of kind genexplorer", function(done) {
            studioApi.createFragment({
                kind: 'genexplorer', 
                folder: 'examples', 
                schemaName: 'js', 
                fragmentName: 'aster'
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('create.document', err, result);
                expect(result).to.be.an('object');
                expect(result.data.uri).to.be.a('string');
                expect(result.data.uri).to.be('/demo/genexplorer/examples/t/aster.js.ittf');
                secondFragUri = result.data.uri;
                done();
            });
        });
        it("should update the second fragment", function(done) {
            studioApi.updateFragment(secondFragUri, 'second fragment content', function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('update.fragment', err, result);
                expect(result).to.be.an('object');
                done();
            });
        });
        it("should get the first fragment", function(done) {
            studioApi.getFragment(secondFragUri, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('get.fragment', err, result);
                expect(result).to.be.an('object');
                expect(result.data).to.be.a('string');
                expect(result.data).to.be('second fragment content');
                done();
            });
        });
        it("should get a document list", function(done) {
            studioApi.getDocuments({
                userId: 'stefi', 
                projectName: 'demo'
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('get.documents', err, result);
                expect(result).to.be.an('object');
                done();
            });
        });
        it("should get a fragment list", function(done) {
            studioApi.getFragments({
                userId: 'stefi', 
                projectName: 'demo'
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('get.fragments', err, result);
                console.log('get.fragments.data', err, result.data);
                expect(result).to.be.an('object');
                done();
            });
        });
    });
});

/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\production\manager.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var stringify = require('json-stringify-safe');
var file = require('../../lib/util/file');
var ProductionManager = require('../../lib/production/manager');
var jobRunResult = null;
describe("the productionManager.run method executes a wfjob", function() {
    before(function(done) {
        var productionManager = new ProductionManager({
            verbose: false, 
            basedir: __dirname, 
            indentSpaces: 4
        });
        productionManager.addWfJob({
            options: {
                verbose: true
            }, 
            wfjob: {
                src: path.join(__dirname, 'ittf', 'test.wfjob.ittf')
                
            }
        });
        productionManager.run(function(err,result) {
            console.log('test manager test.wfjob.ittf err', err);
            jobRunResult = result;
            file.write(path.join(__dirname, 'ittf', 'test.wfjob.run.json')
            , stringify(jobRunResult, null, 2)
            );
            done();
        });
    });
    it("should return a 2 elements array of package requires and artifact infos", function() {
        expect(jobRunResult).to.be.an('object');
    });
});
describe("the productionManager.run method executes a wfjob - with context collections", function() {
    before(function(done) {
        var productionManager = new ProductionManager({
            verbose: false, 
            basedir: __dirname, 
            indentSpaces: 4
        });
        productionManager.addWfJob({
            options: {
                verbose: true
            }, 
            wfjob: {
                src: path.join(__dirname, 'ittf', 'test_with_collection.wfjob.ittf')
                
            }
        });
        productionManager.run(function(err,result) {
            console.log('test manager test_with_collection.wfjob err', err);
            jobRunResult = result;
            file.write(path.join(__dirname, 'ittf', 'test_with_collection.wfjob.run.json')
            , stringify(jobRunResult, null, 2)
            );
            done();
        });
    });
    it("should return a 2 elements array of package requires and artifact infos", function() {
        expect(jobRunResult).to.be.an('object');
    });
});

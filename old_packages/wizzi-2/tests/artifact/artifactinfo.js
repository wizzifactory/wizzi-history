/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\artifact\artifactinfo.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var ProductionManager = require('../../lib/production/manager');
var ArtifactInfo = require('../../lib/artifact/artifactInfo').ArtifactInfo;
var productionManager = new ProductionManager({
    verbose: false, 
    basedir: __dirname
});
describe("artifactInfo wraps an artifact element of a wfjob", function() {
    it("should have options set", function() {
        var exampleCWD = path.join(__dirname, 'ittf', 'example_01')
        ;
        var artifactInfo1 = new ArtifactInfo({
            name: 'art1', 
            options: {}, 
            contexts: [], 
            gen: {
                generator: ''
            }, 
            dest: {
                baseFolder: exampleCWD, 
                folder: path.join(exampleCWD, 'resultFolder'), 
                path: path.join(exampleCWD, 'resultPath'), 
                extension: 'js'
            }
        });
        artifactInfo1.initialize(productionManager);
        // log 'artifactInfo1 after initialize', artifactInfo1
        // log 'productionManager after artifactInfo1 initialize', productionManager
        expect(artifactInfo1.options).to.be.an('object');
    });
});

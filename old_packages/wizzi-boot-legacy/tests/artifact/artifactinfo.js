// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:24 GMT
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var ProductionManager = require('../../lib/production/manager');
var ArtifactInfo = require('../../lib/artifact/artifactInfo');
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

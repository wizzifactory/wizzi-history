// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:27 GMT
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var stringify = require('json-stringify-safe');
var file = require('../../lib/util/file');
var ProductionManager = require('../../lib/production/manager');
var wfjob = require('../../lib/production/wfjob');
var productionManager = new ProductionManager({
    verbose: false, 
    basedir: __dirname
});
var wfjobConfig = {
    options: {
        verbose: true
    }, 
    wfjob: {
        src: path.join(__dirname, 'ittf', 'test.wfjob.ittf')
        
    }
};
var resultArray = null;
describe("the wfjob.getArtifactInfos method creates the parameters of a production job from a wfjob IttfDocument", function() {
    before(function(done) {
        var wfjobInstance = new wfjob(productionManager, wfjobConfig);
        wfjobInstance.getArtifactInfos(function(err,result) {
            resultArray = result;
            file.write(path.join(__dirname, 'ittf', 'test.wfjob.model.json')
            , stringify(resultArray, null, 2)
            );
            done();
        })
    });
    it("should return a 2 elements array of package requires and artifact infos", function() {
        expect(resultArray).to.be.an('array');
        expect(resultArray.length).to.be(2);
        expect(resultArray[0]).to.be.an('array');
        expect(resultArray[0].length).to.be(2);
        expect(resultArray[1]).to.be.an('array');
        expect(resultArray[1].length).to.be(3);
    });
    it("should have package requires", function() {
        var requires = resultArray[0];
        expect(requires[0]).to.be.a('string');
        expect(requires[0]).to.be('wizzi-lab-data');
        expect(requires[1]).to.be.a('string');
        expect(requires[1]).to.be('wizzi-lab-site');
    });
    it("should have package artifactInfos", function() {
        var artifactInfos = resultArray[1];
        expect(artifactInfos[0].name).to.be.a('string');
        expect(artifactInfos[0].name).to.be('any_plain_js');
        expect(artifactInfos[1].name).to.be.a('string');
        expect(artifactInfos[1].name).to.be('any_generated_js');
        expect(artifactInfos[2].name).to.be.a('string');
        expect(artifactInfos[2].name).to.be('any_generated_js_with_model_context');
    });
});

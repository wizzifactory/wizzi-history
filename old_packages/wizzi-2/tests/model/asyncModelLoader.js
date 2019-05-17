/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\model\asyncModelLoader.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var stringify = require('json-stringify-safe');
var file = require('../../lib/util/file');
var ProductionManager = require('../../lib/production/manager');
var ModelInfo = require('../../lib/model/modelInfo').ModelInfo;
var asyncModelLoader = require('../../lib/model/asyncModelLoader');
var mocks = require('./mocks');
var CWD = path.join(__dirname, 'ittf');
/**
    STOP
    describe("the asyncModelLoader loads one or many WizziModelInstances with 0-or-1-or-Many context WizziModelInstances", function() {
        it("should load a WizziModelInstance", function() {
            var modelInfo = new ModelInfo({
                cwd: null, 
                src: path.join(CWD, 'examples', 'script.test.js.ittf')
                , 
                schema: 'js', 
                contexts: []
            });
            modelInfo.productionManager(mocks.createPmanForPackage('wizzi', CWD)
            );
            asyncModelLoader.loadMany([ modelInfo ], function(err,wizziInstances) {
                if (err) {
                    throw err;
                }
                expect(wizziInstances).to.be.an('array');
                expect(wizziInstances.length).to.be(1);
                expect(wizziInstances[0]).to.be.an('object');
                var wizziInstance = wizziInstances[0];
                var text = stringify(wizziInstance, null, 2);
                file.write(path.join(CWD, 'examples', 'result', 'script.test.js.json')
                , text);
            });
        });
        it("should load a WizziModelInstance with a context wizzi model", function() {
            var modelInfo = new ModelInfo({
                cwd: null, 
                src: path.join(CWD, 'examples', 'script_context.test.js.ittf')
                , 
                schema: 'js', 
                contexts: [
                    {
                        cwd: null, 
                        src: path.join(CWD, 'examples', 'simple.wftest.ittf')
                        , 
                        schema: 'wftest', 
                        contexts: []
                    }
                ]
            });
            modelInfo.state(mocks.createPmanStateForPackage('wizzi', CWD)
            );
            asyncModelLoader.loadMany([ modelInfo ], function(err,wizziInstances) {
                if (err) {
                    throw err;
                }
                expect(wizziInstances).to.be.an('array');
                expect(wizziInstances.length).to.be(1);
                expect(wizziInstances[0]).to.be.an('object');
                var wizziInstance = wizziInstances[0];
                var text = stringify(wizziInstance, null, 2);
                file.write(path.join(CWD, 'examples', 'result', 'script_context.test.js.json')
                , text);
            });
        });
    });
*/

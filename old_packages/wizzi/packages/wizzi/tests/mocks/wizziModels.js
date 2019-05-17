/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\tests\mocks\wizzimodels.js.ittf
*/
'use strict';
var path = require('path');
var md = module.exports = {};
md.getModels = function(schema, mockBaseDir) {
    console.log('wizzi.tests.wizziModels.getModels: schema, mockBaseDir', schema, mockBaseDir);
    var ret = {};
    if (schema === 'wfjob') {
        var wfjob_mock1_path = path.join(mockBaseDir, 'ittf', 'mock1.wfjob.ittf');
        ret[wfjob_mock1_path] = wfjob_mock1();
        var wfjob_mock2_path = path.join(mockBaseDir, 'ittf', 'mock2.wfjob.ittf');
        ret[wfjob_mock2_path] = wfjob_mock2();
    }
    if (schema === 'tests') {
        var tests_mock1_path = path.join(mockBaseDir, 'ittf', 'mock1.tests.ittf');
        ret[tests_mock1_path] = tests_mock1();
        var tests_mock2_path = path.join(mockBaseDir, 'ittf', 'mock2.tests.ittf');
        ret[tests_mock2_path] = tests_mock2();
    }
    return ret;
};
function wfjob_mock1() {
    var ret = {
        destBaseFolder: path.join(__dirname, 'result'), 
        models: [], 
        productions: [
            {
                lines: [
                    {
                        wzName: 'lib', 
                        cwdFolder: path.resolve(__dirname, '../production/ittf'), 
                        destFolder: path.join(__dirname, 'result'), 
                        artifacts: [
                            {
                                wzName: 'wfjobMock2', 
                                src: 'mock2.wfjob.ittf', 
                                isWfJob: true, 
                                modelRefs: [], 
                                transformers: []
                            }, 
                            {
                                wzName: 'artifactMock1', 
                                src: 'mock1.tests.ittf', 
                                generator: {
                                    gen: 'tests/gen1'
                                }, 
                                modelRefs: [], 
                                transformers: []
                            }
                        ]
                    }
                ]
            }
        ]
    };
    return ret;
}
function wfjob_mock2() {
    var ret = {
        destBaseFolder: path.join(__dirname, 'result2'), 
        models: [], 
        productions: [
            {
                lines: [
                    {
                        wzName: 'lib', 
                        cwdFolder: __dirname, 
                        destFolder: path.join(__dirname, 'result2'), 
                        artifacts: [
                            {
                                wzName: 'artifactMock2', 
                                src: 'mock2.tests.ittf', 
                                generator: {
                                    gen: 'tests/gen1'
                                }, 
                                modelRefs: [], 
                                transformers: []
                            }
                        ]
                    }
                ]
            }
        ]
    };
    return ret;
}
function tests_mock1() {
    var ret = {
        wzElement: 'tests', 
        wzName: 'mock1', 
        items: [
            {
                wzElement: 'item', 
                wzName: 'item1'
            }, 
            {
                wzElement: 'item', 
                wzName: 'item2'
            }
        ]
    };
    return ret;
}
function tests_mock2() {
    var ret = {
        wzElement: 'tests', 
        wzName: 'mock2', 
        items: [
            {
                wzElement: 'item', 
                wzName: 'item2_1'
            }, 
            {
                wzElement: 'item', 
                wzName: 'item2_2'
            }
        ]
    };
    return ret;
}

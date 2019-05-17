/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-lab-spa\node_modules\wizzi\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 19:51:59 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var webpackWizziModel = require('../../models/webpack-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.webpack.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var webpackmodelType = webpackWizziModel[rootNode.n];
    if (!webpackmodelType) {
        var maptag = webpackWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            webpackmodelType = webpackWizziModel[maptag];
        }
        if (!webpackmodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + webpack, filepath: ' + filepath);
        }
    }
    var webpackmodel = new webpackmodelType(rootNode.v);
    webpackmodel.loadContext = ittfModel.loadContext;
    try {
        webpackmodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for webpack model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new webpackWizziModel.webpackContext();
    webpackmodel.wzInitialize(ctx);
    webpackmodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.webpack.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.webpack.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.webpack.ittf.dump.prettify.html');
    if (webpackmodel.toJson) {
        // Export to json for test
        // console.log('webpackmodel.toJson', util.inspect(webpackmodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(webpackmodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(webpackmodel, null, 2)
        );
    }
});


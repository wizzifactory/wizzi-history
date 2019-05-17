/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-lab-spa\node_modules\wizzi\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 19:51:58 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var formWizziModel = require('../../models/form-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.form.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var formmodelType = formWizziModel[rootNode.n];
    if (!formmodelType) {
        var maptag = formWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            formmodelType = formWizziModel[maptag];
        }
        if (!formmodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + form, filepath: ' + filepath);
        }
    }
    var formmodel = new formmodelType(rootNode.v);
    formmodel.loadContext = ittfModel.loadContext;
    try {
        formmodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for form model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new formWizziModel.formContext();
    formmodel.wzInitialize(ctx);
    formmodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.form.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.form.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.form.ittf.dump.prettify.html');
    if (formmodel.toJson) {
        // Export to json for test
        // console.log('formmodel.toJson', util.inspect(formmodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(formmodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(formmodel, null, 2)
        );
    }
});


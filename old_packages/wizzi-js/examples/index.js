/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\examples\index.js.ittf
*/
'use strict';
var path = require('path');
var fs = require('fs');
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var mocks = wizziUtils.mocks;
var mtree = require('wizzi-mtree');
var js_factory = require('../lib/wizzi/models/js-factory.g');
var js_artifact = require('../lib/artifacts/js/module/gen/main');

var loadModel = js_factory.createLoadModel(getWizziObject());

var ittfPath = path.join(__dirname, 'ittf');
var i, i_items=getFiles(ittfPath), i_len=getFiles(ittfPath).length, item;
for (i=0; i<i_len; i++) {
    item = getFiles(ittfPath)[i];
    item = item.substring(0, item.length - '.js.ittf'.length);
    console.log('item', item);
    execute(item);
}
// _ execute('function')

function execute(name) {
    if (name != 'graphql') {
        return ;
    }
    var ittfSource = path.join(__dirname, 'ittf', name + '.js.ittf');
    var jsOutput = path.join(__dirname, 'ittf', name + '.g.js');
    loadModel(ittfSource, getLoadModelContext({}), function(err, jsWizziModel) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('jsWizziModel', jsWizziModel);
        var ctx = new mocks.getGenContext();
        js_artifact.gen(jsWizziModel, ctx, function(err, ctxout) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('ctxout', ctxout.getContent());
            file.write(jsOutput, ctxout.getContent());
        });
    });
}
function getFiles(srcpath) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, '.js.ittf');
        })
    ;
}
function getWizziObject() {
    return {
            loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                useCache: false
            }), 
            file: wizziUtils.file, 
            verify: wizziUtils.verify
        };
}
function getLoadModelContext(mTreeBuildUpContext) {
    return mocks.getLoadModelContext(mTreeBuildUpContext);
}

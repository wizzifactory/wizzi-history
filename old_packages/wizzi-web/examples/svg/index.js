/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-web\src\ittf\examples\svg\index.js.ittf
*/
'use strict';
var path = require('path');
var fs = require('fs');
var wizzi = null;
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var mocks = wizziUtils.mocks;
var mtree = require('wizzi-mtree');
var errors = wizziUtils.exampleErrors;
var svgfactory = require('../../lib/wizzi/models/svg-factory.g');
var svggenerator = require('../../lib/artifacts/svg/document/gen/main');
function executeExample() {
    
    var loadModel = svgfactory.createLoadModel(getWizziObject());
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'svg'), i_len=getFiles(ittfPath,'svg').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'svg')[i];
        item = item.substring(0, item.length - '.svg.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.svg.ittf');
        var svgOutput = path.join(__dirname, 'ittf', name + '.g.svg');
        loadModel(ittfSource, {
            __productionManager: mocks.getProductionManager()
        }, function(err, wizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('svg wizziModel', wizziModel);
            var ctx = mocks.getGenContext();
            svggenerator.gen(wizziModel, ctx, function(err, ctxout) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('ctxout begin ========', '\n' + ctxout.getContent(), '\nctxout end ============');
                file.write(svgOutput, ctxout.getContent());
            });
        });
    }
}
function getFiles(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf');
        })
    ;
}
function getWizziObject() {
    return {
            loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                useCache: false
            }), 
            file: wizziUtils.file, 
            verify: wizziUtils.verify, 
            errors: errors
        };
}
function getLoadModelContext(mtreeBuilUpContext) {
    return mocks.getLoadModelContext(mtreeBuilUpContext);
}
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}

/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-web\src\ittf\examples\html\index.js.ittf
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
var htmlfactory = require('../../lib/wizzi/models/html-factory.g');
var htmlgenerator = require('../../lib/artifacts/html/document/gen/main');
function executeExample() {
    
    var loadModel = htmlfactory.createLoadModel(getWizziObject());
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'html'), i_len=getFiles(ittfPath,'html').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'html')[i];
        item = item.substring(0, item.length - '.html.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.html.ittf');
        var htmlOutput = path.join(__dirname, 'ittf', name + '.g.html');
        loadModel(ittfSource, {
            __productionManager: mocks.getProductionManager()
        }, function(err, htmlWizziModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('htmlWizziModel', htmlWizziModel);
            var ctx = mocks.getGenContext();
            htmlgenerator.gen(htmlWizziModel, ctx, function(err, ctxout) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                console.log('ctxout', ctxout.getContent());
                file.write(htmlOutput, ctxout.getContent());
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

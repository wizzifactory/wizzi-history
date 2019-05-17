/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\examples\loader.js.ittf
*/
'use strict';
var path = require('path');
var vfile = require('wizzi-utils').vfile;
var file = vfile();
var mocks = require('wizzi-utils').mocks;
var repo = mocks.repo;
var packageIndex = require('../index');
vfile(function(err, file) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    step_1(file);
});
function step_1(file) {
    var loadMTree = packageIndex.createLoadMTree(repo.getCreateFilesystemStore());
    loadMTree(path.join(__dirname, 'ittf', 'load_compile.html.ittf'), {
        __productionManager: mocks.getProductionManager(), 
        mTreeBuildUpContext: {
            tree: {
                id: 1, 
                title: 'a', 
                children: [
                    {
                        id: 11, 
                        title: 'aa', 
                        children: [
                            
                        ]
                    }
                ]
            }
        }, 
        options: {
            isCompile: true
        }
    }, function(err, mTree) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log("mTree.loadHistory", mTree.loadHistory);
        var el = mTree.loadHistory.getIttfDocumentErrorLines('f1', {
            row: 7, 
            col: 19, 
            description: 'could be better'
        }, true);
        console.log("mTree.loadHistory.getIttfDocumentErrorLines", el);
        file.write(path.join(__dirname, 'outputs', 'load_compile.html.ittf'), mTree.toIttf());
    });
}

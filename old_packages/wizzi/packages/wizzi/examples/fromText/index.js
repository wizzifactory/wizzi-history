/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\examples\fromtext\index.js.ittf
*/
'use strict';
var index = require('../../index');
index.createFactory('stefi', 'admin', {
    repo: {
        storeKind: 'filesystem'
    }, 
    plugins: {
        items: [
            'wizzi-web'
        ]
    }
}, function(err, wf) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    wf.loadModelFromText([
        'html', 
        '    head', 
        '    body'
    ].join('\n'), 'html', function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('loadModelFromText\n', result);
        wf.loadModelAndGenerateArtifactFromText([
            'html', 
            '    head', 
            '    body'
        ].join('\n'), {}, 'html/document', function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('loadModelAndGenerateArtifactFromText\n', result);
        });
    });
});

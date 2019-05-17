/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\examples\fs.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:05 GMT
*/
'use strict';
var fs = require('./lib/filesystem');
var repoUri = 'mongodb://localhost:27017/darvin';
var repoBaseFolderUri = 'c://users';
fs.mount(repoUri, repoBaseFolderUri, function(err, notUsed) {
    if (err) {
        return callback(err)
        ;
    }
    fs.glob(0, 'stefi', 'demo1', '/**/*.ittf', function(err, fsitems) {
        if (err) {
            return callback(err)
            ;
        }
        console.log('err, fsitems', err, fsitems);
        fs.unmount(function(err, notUsed) {
            if (err) {
                return callback(err)
                ;
            }
        });
    });
});

// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Wed, 01 Feb 2017 14:56:33 GMT
'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
gulp.task('test', function() {
    gulp.src('tests/**/*.js').pipe(mocha({
        reporter: 'spec', 
        clearRequireCache: true, 
        ignoreLeaks: true
    })
    )
    ;
});
gulp.task('default', [
    'test'
]);

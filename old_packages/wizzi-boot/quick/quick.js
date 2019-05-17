// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:22 GMT
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var file = require('../lib/util/file');
var stringify = require('json-stringify-safe');
var ittf = require('../lib/ittf/ittf');
var result;
ittf.load(path.join(__dirname, 'ittf', 'ittf_object_args.tests.ittf')
, {
    items: [
        {
            name: 'stefi', 
            value: 60
        }, 
        {
            name: 'annie', 
            value: 59
        }, 
        {
            name: 'afro', 
            value: 98
        }
    ]
}, function(err,ittfModel) {
    result = ittfModel;
    file.write(path.join(__dirname, 'ittf', 'ittf_object_args.json')
    , stringify(ittfModel, null, 2)
    );
});

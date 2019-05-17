// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Wed, 01 Feb 2017 14:56:33 GMT
'use strict';
var md = module.exports = {};
var arraycrud = require('./lib/arraycrud');
var FsJsonDb = require('./lib/fsjsondb');
var Queue = require('./lib/queue');
var Collection = require('./lib/collection');
md.dbContext = function(dataPath) {
    return {
            crud: arraycrud, 
            db: new FsJsonDb(dataPath), 
            q: new Queue
        };
};
md.collection = function(dbContext,collectionName,keyNames) {
    return new Collection(dbContext, collectionName, keyNames);
};

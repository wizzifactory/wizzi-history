# fsjsondb

A filesystem backed JSON database

## Features

Concurrency is supported for a single instance of nodejs using a simple queue.
Concurrency is not supported for multi-process instances.

A dbContext object manages the collections filepath and operations enqueuing.

A collection object manages insert, update, delete, findOne, find operations.

All operations are async.

## Getting started

### Installation

Add fsjsondb to your existing Node.js project.

`npm install fsjsondb --save`

### Usage

```javascript
var path = require('path');
var fsjsondb = require('fsjsondb');

// function fsjsondb.dbContext
// @param folderPath      The filesystem path of the storage folder
// @return                A dbContext object
var db = fsjsondb.dbContext(path.join(__dirname, 'data'));

// function fsjsondb.collection
// @param dbContext       The dbContext object returned by fsjsondb.dbContext
// @param collectionName  The name of the JSON collection. It will be an array.
// @param keyNames        An array containing the names of the collection key properties.
// @return                A JSON collection object
var authors = fsjsondb.collection(db, 'authors', ['name']);

authors.insert({
    name: 'alex drastic',
    email: 'alex.drastic@gmail.com'
}, function(err, ok) {
    console.log(err, ok);
});

authors.update({ ... }, function(err, ok) {
    console.log(err, ok);
});

authors.delete({ name: ' ... ' }, function(err, ok) {
    console.log(err, ok);
});

authors.findOne({ name: ' ... ' }, function(err, ok) {
    console.log(err, ok);
});

authors.find({ ... }, function(err, ok) {
    console.log(err, ok);
});
```

### Examples

Have a look at the .\examples folder.

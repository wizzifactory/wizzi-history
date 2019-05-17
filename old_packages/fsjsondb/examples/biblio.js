// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Wed, 01 Feb 2017 14:56:33 GMT
'use strict';
var path = require('path');
var fsjsondb = require('fsjsondb');
var dbContext = fsjsondb.dbContext(path.join(__dirname, 'data')
)
;
var authors = fsjsondb.collection(dbContext, 'authors', [
    'name'
])
;
authors.insert({
    name: 'pippo franco', 
    email: 'pippo.franco@gmail.com'
}, function(err,ok) {
    console.log(err, ok);
});
authors.insert({
    name: 'topo gigio', 
    email: 'topo.gigio@gmail.com'
}, function(err,ok) {
    console.log(err, ok);
});
authors.update({
    name: 'topo gigio', 
    email: 'topo.gigio@yahoo.com'
}, function(err,ok) {
    console.log(err, ok);
});
authors.update({
    name: 'chicca bella', 
    email: 'chicca.bella@yahoo.com'
}, function(err,ok) {
    console.log(err, ok);
});
authors.insert({
    name: 'eta beta', 
    email: 'eta.beta@gmail.com'
}, function(err,ok) {
    console.log(err, ok);
});
authors.delete({
    name: 'pippo franco'
}, function(err,ok) {
    console.log(err, ok);
});
authors.findOne({
    name: 'topo gigio'
}, function(err,ok) {
    console.log(err, ok);
});
authors.find(function(err,ok) {
    console.log(err, ok);
});

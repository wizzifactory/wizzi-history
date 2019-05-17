// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Wed, 01 Feb 2017 14:56:33 GMT
'use strict';
var uuid = require('node-uuid');
var _ = require('./utils');
var CRUD = {};
CRUD.insert = function(list,obj,callback) {
    if (_.isArray(list) == false) {
        return callback(CRUD.missingArrayError())
        ;
    }
    if (_.isObject(obj) == false) {
        return callback(CRUD.missingObjectKeyError())
        ;
    }
    obj._id = uuid.v1();
    list.push(obj);
    callback(null, obj);
};
CRUD.insertUnique = function(list,objkey,obj,callback) {
    if (_.isArray(list) == false) {
        return callback(CRUD.missingArrayError())
        ;
    }
    var keys = _.keys(objkey);
    if (keys.length == 0) {
        return callback(CRUD.missingObjectError())
        ;
    }
    if (_.isObject(obj) == false) {
        return callback(CRUD.missingObjectKeyError())
        ;
    }
    CRUD.findOne(list, objkey, function(err,foundObj) {
        if (err) {
            return callback(err);
        }
        else {
            if (foundObj) {
                callback(CRUD.keyAlreadyExistsError(_.objkeyToString(objkey)
                )
                );
            }
            else {
                obj._id = uuid.v1();
                list.push(obj);
                callback(null, obj);
            }
        }
    });
};
CRUD.update = function(list,objkey,obj,callback) {
    if (_.isArray(list) == false) {
        return callback(CRUD.missingArrayError())
        ;
    }
    var keys = _.keys(objkey);
    if (keys.length == 0) {
        return callback(CRUD.missingObjectError())
        ;
    }
    if (_.isObject(obj) == false) {
        return callback(CRUD.missingObjectKeyError())
        ;
    }
    var found = false;
    var i, i_len=list.length, item;
    for (i=0; i<i_len; i++) {
        item = list[i];
        found = true;
        var j, j_len=keys.length, key;
        for (j=0; j<j_len; j++) {
            key = keys[j];
            if (item[key] !== objkey[key]) {
                found = false;
            }
        }
        if (found) {
            obj._id = item._id;
            list[i] = obj;
            return callback(null, list[i])
            ;
        }
    }
    callback(CRUD.keyNotFoundError(_.objkeyToString(objkey)
    )
    );
};
CRUD.delete = function(list,objkey,callback) {
    if (_.isArray(list) == false) {
        return callback(CRUD.missingArrayError())
        ;
    }
    var keys = _.keys(objkey);
    if (keys.length == 0) {
        return callback(CRUD.missingObjectError())
        ;
    }
    var found = false;
    var i, i_len=list.length, item;
    for (i=0; i<i_len; i++) {
        item = list[i];
        found = true;
        var j, j_len=keys.length, key;
        for (j=0; j<j_len; j++) {
            key = keys[j];
            if (item[key] !== objkey[key]) {
                found = false;
            }
        }
        if (found) {
            console.log('CRUD.delete. found : ', keys[0], item[keys[0]]);
            list.splice(i, 1);
            return callback(null, item)
            ;
        }
    }
    console.log('CRUD.delete. not found : ', keys[0]);
    callback(CRUD.keyNotFoundError(_.objkeyToString(objkey)
    )
    );
};
CRUD.find = function(list,objkey,callback) {
    if (_.isUndefined(callback)) {
        callback = objkey;
        objkey = null;
    }
    var keys = _.keys(objkey);
    var foundList = [];
    var found = false;
    var i, i_len=list.length, item;
    for (i=0; i<i_len; i++) {
        item = list[i];
        found = true;
        var j, j_len=keys.length, key;
        for (j=0; j<j_len; j++) {
            key = keys[j];
            if (item[key] !== objkey[key]) {
                found = false;
            }
        }
        if (found) {
            foundList.push(item);
        }
    }
    callback(null, foundList);
};
CRUD.findOne = function(list,objkey,callback) {
    if (_.isArray(list) == false) {
        return callback(CRUD.missingArrayError())
        ;
    }
    var keys = _.keys(objkey);
    if (keys.length == 0) {
        return callback(CRUD.missingObjectError())
        ;
    }
    var found = false;
    var i, i_len=list.length, item;
    for (i=0; i<i_len; i++) {
        item = list[i];
        found = true;
        var j, j_len=keys.length, key;
        for (j=0; j<j_len; j++) {
            key = keys[j];
            if (item[key] !== objkey[key]) {
                found = false;
            }
        }
        if (found) {
            return callback(null, item)
            ;
        }
    }
    callback(null, null);
};
CRUD.dump = function(list) {
    console.log('dump list, items', list.length);
    var i, i_len=list.length, item;
    for (i=0; i<i_len; i++) {
        item = list[i];
        var keys = _.keys(item);
        console.log(' item ', i);
        var j, j_len=keys.length, key;
        for (j=0; j<j_len; j++) {
            key = keys[j];
            console.log('  ', key, item[key]);
        }
    }
};
CRUD.generateError = function(code,message) {
    return {
            code: code, 
            message: message
        };
};
CRUD.notFoundError = function() {
    return CRUD.generateError("404", "The requested resource does not exist.");
};
CRUD.missingObjectKeyError = function() {
    return CRUD.generateError("400", "Missing object key.");
};
CRUD.missingArrayError = function() {
    return CRUD.generateError("400", "The list parameter must be an array.");
};
CRUD.missingObjectError = function() {
    return CRUD.generateError("400", "Missing object parameter.");
};
CRUD.keyAlreadyExistsError = function(keystring) {
    return CRUD.generateError("400", "Insert failed. The object key already exists : " + keystring);
};
CRUD.keyNotFoundError = function(keystring) {
    return CRUD.generateError("400", "Operation failed. The object key does not exists : " + keystring);
};
module.exports = CRUD;

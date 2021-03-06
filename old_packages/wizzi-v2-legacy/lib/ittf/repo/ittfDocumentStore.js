/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\repo\ittfDocumentStore.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
// generated by js.module.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require('util');
var errors = require('./errors');
var FileSystemStore = require('./fileSystemStore');
var RepoStore = require('./repoStore');
var IttfDocumentStore = (function () {
    function IttfDocumentStore() {
        _classCallCheck(this, IttfDocumentStore);
    }
    /**
         param ittfDocumentInfo {
         storeKind:String oneOf("filesystem", "repo")
         }
    */
    IttfDocumentStore.prototype.init = function(ittfDocumentInfo,callback) {
        var that = this;
        if (ittfDocumentInfo.storeKind === 'filesystem') {
            this.storeImpl = new FileSystemStore();
            this.storeKind = this.storeImpl.storeKind;
            return callback(null);
        }
        else if (ittfDocumentInfo.storeKind === 'repo') {
            this.storeImpl = new RepoStore();
            this.storeImpl.init(function(err,notUsed) {
                if (err) {
                    return callback(err)
                    ;
                }
                that.storeKind = that.storeImpl.storeKind;
                return callback(null);
            });
        }
        else {
            var error = new errors.InvalidRequestError("In ittf.repo.IttfDocumentStore.ctor. Unknown storeKind: " + ittfDocumentInfo.storeKind +" , requested ittfDocumentInfo: " + util.inspect(ittfDocumentInfo, {depth: 2}));
            return callback(error)
            ;
        }
    }
    IttfDocumentStore.prototype.initSync = function(ittfDocumentInfo) {
        if (ittfDocumentInfo.storeKind === 'filesystem') {
            this.storeImpl = new FileSystemStore();
        }
        else {
            var error = new errors.InvalidRequestError('In lib/ittf/repo/IttfDocumentStore/initSync. Method "initSync" is for storeKind: ' +'"filesystem" only.');
            return callback(error)
            ;
        }
        this.storeKind = this.storeImpl.storeKind;
    }
    IttfDocumentStore.prototype.documentExists = function(documentUri,callback) {
        this.storeImpl.documentExists(documentUri, callback);
    }
    IttfDocumentStore.prototype.folderExistsSync = function(folderUri) {
        if (this.storeKind !== 'filesystem') {
            throw new errors.InvalidRequestError('In lib/ittf/repo/IttfDocumentStore/folderExistsSync. Method "folderExistsSync" is for storeKind: ' +'"filesystem" only.');
        }
        return this.storeImpl.folderExists(folderUri);
    }
    IttfDocumentStore.prototype.getFoldersSync = function(parentFolderUri,options) {
        if (this.storeKind !== 'filesystem') {
            throw new errors.InvalidRequestError('In lib/ittf/repo/IttfDocumentStore/getFoldersSync. Method "getFoldersSync" is for storeKind: ' +'"filesystem" only.');
        }
        return this.storeImpl.getFoldersSync(parentFolderUri, options);
    }
    IttfDocumentStore.prototype.getModelContent = function(documentUri,callback) {
        this.storeImpl.getModelContent(documentUri, callback);
    }
    IttfDocumentStore.createFileSystemDocumentStore = function() {
        var ret = new IttfDocumentStore();
        ret.initSync({
            storeKind: "filesystem"
        });
        return ret;
    }
    return IttfDocumentStore;
})();


module.exports = IttfDocumentStore;

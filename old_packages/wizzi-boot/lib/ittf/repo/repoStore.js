// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:43 GMT
'use strict';
// generated by js.module.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var errors = require('./errors');
// var repoapi = require(' TODO ')
var RepoStore = (function () {
    function RepoStore() {
        _classCallCheck(this, RepoStore);
        this.storeKind = 'repo';
        throw new Error("Mongodb repo not implemented.");
    }
    RepoStore.prototype.documentExists = function(documentPath,callback) {
        var repoPath = repopath(documentPath);
        repoPath.path = repoPath.path.substr(1);
        repoapi.getDocument(repoPath.userName, repoPath.projectName, repoPath.path, {}, function(err,result) {
            if (err) {
                var error = new errors.RepoIOError(util.inspect(err, {depth: null}) + '\nChecking documentExists'), uri);
                return callback(error);
            }
            callback(null, result != null);
        });
    }
    RepoStore.prototype.getModelContent = function(documentPath,callback) {
        var repoPath = repopath(documentPath);
        repoPath.path = repoPath.path.substr(1);
        repoapi.readDocument(repoPath.userName, repoPath.projectName, repoPath.path, function(err,result) {
            if (err) {
                var error = new errors.RepoIOError(util.inspect(err, {
                    depth: null
                })
                , uri);
                return callback(error);
            }
            callback(null, result);
        });
    }
    return RepoStore;
})();


module.exports = RepoStore;
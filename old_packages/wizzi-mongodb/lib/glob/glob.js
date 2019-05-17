/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\lib\glob\glob.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:07 GMT
*/
'use strict';
// generated by js.module.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

// class Glob
// function glob
module.exports = glob;
var fs = require('fs');
var minimatch = require('./minimatch');
var Minimatch = minimatch.Minimatch;
var inherits = require('inherits');
var EE = require('events').EventEmitter
;
var path = require('path');
var assert = require('assert');
var isAbsolute = require('./path-is-absolute');
var common = require('./common.js');
var alphasort = common.alphasort;
var alphasorti = common.alphasorti;
var setopts = common.setopts;
var ownProp = common.ownProp;
var inflight = require('./inflight');
var util = require('util');
var childrenIgnored = common.childrenIgnored;
var isIgnored = common.isIgnored;
var once = require('./once');
function glob(pattern,mongoFS,options,cb) {
    if (typeof (options) === 'function') {
        cb = options, options = {};
    }
    if (!options) {
        options = {};
    }
    return new Glob(pattern, mongoFS, options, cb);
}

var Glob = (function () {
    function Glob(pattern,mongoFS,options,cb) {
        _classCallCheck(this, Glob);
        if (typeof (options) === 'function') {
            cb = options;
            options = null;
        }
        if (!(this instanceof Glob)) {
            return new Glob(pattern, mongoFS, options, cb);
        }
        this.mongoFS = mongoFS;
        setopts(this, pattern, options);
        // log 'this.minimatch', this.minimatch
        // log 'this.minimatch.set', this.minimatch.set
        var n = this.minimatch.set.length;
        this.matches = new Array(n);
        if (typeof(cb) === 'function') {
            cb = once(cb);
            this.on('error', cb);
            this.on('end', function(matches) {
                console.log('on.end.cb.matches', matches.length);
                cb(null, matches);
            });
        }
        var self = this;
        this._processing = 0;
        if (this.noprocess) {
            return this;
        }
        if (n === 0) {
            return done();
        }
        var sync = true;
        for (var i = 0; i < n; i++) {
            this._process(this.minimatch.set[i], i, false, done);
        }
        sync = false;
        function done() {
            --self._processing;
            console.log('---------- done self._processing, sync', self._processing, sync);
            if (self._processing <= 0) {
                if (sync) {
                    process.nextTick(function() {
                        self._finish();
                    });
                }
                else {
                    self._finish();
                }
            }
        }
    }
    Glob.prototype._finish = function() {
        assert(this instanceof Glob);
        common.finish(this);
        this.emit('end', this.found);
    }
    Glob.prototype._mark = function(p) {
        return common.mark(this, p);
    }
    Glob.prototype._makeAbs = function(f) {
        return common.makeAbs(this, f);
    }
    Glob.prototype._process = function(pattern,index,inGlobStar,cbDone) {
        assert(this instanceof Glob);
        assert(typeof (cbDone) === 'function');
        this._processing++;
        console.log('_process.pattern.index.inGlobStar', pattern, index, inGlobStar);
        var n = 0;
        while (typeof (pattern[n]) === 'string') {
            n++;
        }
        console.log('_process.n', n);
        var prefix;
        switch (n) {
            case pattern.length: {
                console.log('_process.prefix.case._processSimple');
                this._processSimple(pattern.join('/'), index, cbDone);
                return ;
            }
            case 0: {
                prefix = null;
                console.log('_process.prefix.n=0', prefix);
                break;
            }
            default: {
                prefix = pattern.slice(0, n).join('/');
                console.log('_process.prefix.default', prefix);
                break;
            }
        }
        var remain = pattern.slice(n);
        var read;
        if (prefix === null) {
            read = '.';
        }
        else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
            if (!prefix || !isAbsolute(prefix)) {
                prefix = ('/' + prefix);
            }
            read = prefix;
        }
        else {
            read = prefix;
        }
        var abs = this._makeAbs(read);
        if (childrenIgnored(this, read)) {
            return cbDone();
        }
        var isGlobStar = remain[0] === minimatch.GLOBSTAR;
        console.log('read, abs, remain, isGlobStar', read, abs, remain, isGlobStar);
        if (isGlobStar) {
            this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cbDone);
        }
        else {
            this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cbDone);
        }
    }
    Glob.prototype._processReaddir = function(prefix,read,abs,remain,index,inGlobStar,cbDone) {
        var self = this;
        this._readdir(abs, inGlobStar, function(er, entries) {
            return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cbDone);
        });
    }
    Glob.prototype._processReaddir2 = function(prefix,read,abs,remain,index,inGlobStar,entries,cbDone) {
        if (!entries) {
            return cbDone();
        }
        var pn = remain[0];
        var negate = !!this.minimatch.negate;
        var rawGlob = pn._glob;
        var dotOk = this.dot || rawGlob.charAt(0) === '.';
        console.log('***** _processReaddir2 pn, negate, rawGlob, dotOk', pn, negate, rawGlob, dotOk);
        var matchedEntries = [];
        for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            var ePath = e.basename;
            if (ePath.charAt(0) !== '.' || dotOk) {
                var m;
                if (negate && !prefix) {
                    m = !ePath.match(pn);
                }
                else {
                    m = ePath.match(pn);
                }
                if (m) {
                    matchedEntries.push(e);
                }
            }
        }
        var len = matchedEntries.length;
        if (len === 0) {
            return cbDone();
        }
        if (remain.length === 1 && !this.mark && !this.stat) {
            if (!this.matches[index]) {
                this.matches[index] = Object.create(null);
            }
            for (var i = 0; i < len; i++) {
                var e = matchedEntries[i];
                var ePath = e.basename;
                if (prefix) {
                    if (prefix !== '/') {
                        ePath = prefix + '/' + ePath;
                    }
                    else {
                        ePath = prefix + ePath;
                    }
                }
                if (ePath.charAt(0) === '/' && !this.nomount) {
                    ePath = path.join(this.root, ePath);
                }
                this._emitMatch(index, ePath, e);
            }
            return cbDone();
        }
        remain.shift();
        for (var i = 0; i < len; i++) {
            var ePath = matchedEntries[i].basename;
            var newPattern;
            if (prefix) {
                if (prefix !== '/') {
                    ePath = prefix + '/' + ePath;
                }
                else {
                    ePath = prefix + ePath;
                }
            }
            this._process([
                ePath
            ].concat(remain), index, inGlobStar, cbDone);
        }
        cbDone();
    }
    Glob.prototype._emitMatch = function(index,ePath,e) {
        console.log('***** _emitMatch.index,ePath,e', index, ePath, e);
        if (isIgnored(this, ePath)) {
            return ;
        }
        var abs = isAbsolute(ePath) ? ePath : this._makeAbs(ePath);
        if (this.mark) {
            ePath = this._mark(ePath);
        }
        if (this.absolute) {
            ePath = abs;
        }
        if (this.matches[index][ePath]) {
            return ;
        }
        if (this.nodir) {
            var c = this.cache[abs];
            if ((c === 'DIR') || Array.isArray(c)) {
                return ;
            }
        }
        this.matches[index][ePath] = true;
        var st = this.statCache[abs];
        if (st) {
            this.emit('stat', ePath, e, st);
        }
        this.emit('match', ePath, e);
    }
    Glob.prototype._readdirInGlobStar = function(abs,cb) {
        if (this.follow) {
            return this._readdir(abs, false, cb);
        }
        var lstatkey = ('lstat\0' + abs);
        var self = this;
        var lstatcb = inflight(lstatkey, lstatcb_);
        if (lstatcb) {
            this.mongoFS._stat(abs, lstatcb);
        }
        function lstatcb_(er, lstat) {
            if (er && er.code === 'ENOENT') {
                return cb();
            }
            if (lstat && !lstat.isDirectory()) {
                self.cache[abs] = 'FILE';
                cb();
            }
            else {
                self._readdir(abs, false, cb);
            }
        }
    }
    Glob.prototype._readdir = function(abs,inGlobStar,cb) {
        cb = inflight('readdir\0' + abs + '\0' + inGlobStar, cb);
        if (!(cb)) {
            return ;
        }
        if (inGlobStar) {
            return this._readdirInGlobStar(abs, cb);
        }
        if (ownProp(this.cache, abs)) {
            var c = this.cache[abs];
            if (!c || c === 'FILE') {
                return cb();
            }
            if (Array.isArray(c)) {
                return cb(null, c);
            }
        }
        var self = this;
        console.log('readdirCb(this, abs, cb)', abs);
        this.mongoFS._readDir(abs, readdirCb(this, abs, cb));
        function readdirCb(self, abs, cb) {
            return function(er, entries) {
                    if (er) {
                        self._readdirError(abs, er, cb);
                    }
                    else {
                        self._readdirEntries(abs, entries, cb);
                    }
                };
        }
    }
    Glob.prototype._readdirEntries = function(abs,entries,cb) {
        if (!(this.mark) && !(this.stat)) {
            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];
                var ePath = e.basename;
                if (abs === '/') {
                    ePath = abs + ePath;
                }
                else {
                    ePath = abs + '/' + ePath;
                }
                this.cache[ePath] = true;
            }
        }
        this.cache[abs] = entries;
        return cb(null, entries);
    }
    Glob.prototype._readdirError = function(f,er,cb) {
        switch (er.code) {
            case 'ENOTSUP':
            case 'ENOTDIR': {
                var abs = this._makeAbs(f);
                this.cache[abs] = 'FILE';
                if (abs === this.cwdAbs) {
                    var error = new Error(((er.code + ' invalid cwd ')) + this.cwd);
                    error.path = this.cwd;
                    error.code = er.code;
                    this.emit('error', error);
                    this.abort();
                }
                break;
            }
            case 'ENOENT':
            case 'ELOOP':
            case 'ENAMETOOLONG':
            case 'UNKNOWN': {
                this.cache[this._makeAbs(f)] = false;
                break;
            }
            default: {
                this.cache[this._makeAbs(f)] = false;
                if (this.strict) {
                    this.emit('error', er);
                    this.abort();
                }
                if (! (this.silent)) {
                    console.error('glob error', er);
                }
                break;
            }
        }
        return cb();
    }
    Glob.prototype._processGlobStar = function(prefix,read,abs,remain,index,inGlobStar,cbDone) {
        var self = this;
        console.log('_processGlobStar');
        this._readdir(abs, inGlobStar, function(er, entries) {
            self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cbDone);
        });
    }
    Glob.prototype._processGlobStar2 = function(prefix,read,abs,remain,index,inGlobStar,entries,cbDone) {
        console.log('_processGlobStar2.entries', entries);
        if (!(entries)) {
            return cbDone();
        }
        var remainWithoutGlobStar = remain.slice(1);
        var gspref = prefix ? [
                prefix
            ] : [];
        var noGlobStar = gspref.concat(remainWithoutGlobStar);
        this._process(noGlobStar, index, false, cbDone);
        var len = entries.length;
        for (var i = 0; i < len; i++) {
            var ePath = entries[i].basename;
            if (ePath.charAt(0) === '.' && !this.dot) {
                continue;
            }
            var instead = gspref.concat(ePath, remainWithoutGlobStar)
            ;
            this._process(instead, index, true, cbDone);
            var below = gspref.concat(ePath, remain)
            ;
            this._process(below, index, true, cbDone);
            console.log('_processGlobStar2 e.instead.below', ePath, instead, below);
        }
        cbDone();
    }
    Glob.prototype._processSimple = function(prefix,index,cbDone) {
        console.log('***** _processSimple', prefix, index);
        var self = this;
        this._stat(prefix, function(er, exists) {
            self._processSimple2(prefix, index, er, exists, cbDone);
        });
    }
    Glob.prototype._processSimple2 = function(prefix,index,er,exists,cbDone) {
        if (!this.matches[index]) {
            this.matches[index] = Object.create(null);
        }
        if (!exists) {
            return cbDone();
        }
        if (prefix && isAbsolute(prefix) && !this.nomount) {
            var trail = /[\/\\]$/.test(prefix);
            if (prefix.charAt(0) === '/') {
                prefix = path.join(this.root, prefix);
            }
            else {
                prefix = path.resolve(this.root, prefix);
                if (trail) {
                    prefix += '/';
                }
            }
        }
        if (process.platform === 'win32') {
            prefix = prefix.replace(/\\/g, '/');
        }
        this._emitMatch(index, prefix, null);
        cbDone();
    }
    // from _processSimple
    Glob.prototype._stat = function(f,cb) {
        var abs = this._makeAbs(f);
        var needDir = f.slice(-1) === '/';
        if (f.length > this.maxLength) {
            return cb();
        }
        if (!this.stat && ownProp(this.cache, abs)) {
            var c = this.cache[abs];
            if (Array.isArray(c)) {
                c = 'DIR';
            }
            if (!needDir || c === 'DIR') {
                return cb(null, c);
            }
            if (needDir && c === 'FILE') {
                return cb();
            }
        }
        var exists;
        var stat = this.statCache[abs];
        if (stat !== undefined) {
            if (stat === false) {
                return cb(null, stat);
            }
            else {
                var type = stat.isDirectory() ? 'DIR' : 'FILE';
                if (needDir && (type === 'FILE')) {
                    return cb();
                }
                else {
                    return cb(null, type, stat);
                }
            }
        }
        var self = this;
        var statcb = inflight('stat\0' + abs, lstatcb_);
        if (statcb) {
            this.mongoFS._stat(abs, statcb);
        }
        function lstatcb_(er, lstat) {
            self._stat2(f, abs, er, lstat, cb);
        }
    }
    Glob.prototype._stat2 = function(f,abs,er,stat,cb) {
        if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
            this.statCache[abs] = false;
            return cb();
        }
        var needDir = f.slice(-1) === '/';
        this.statCache[abs] = stat;
        if (abs.slice(-1) === '/' && stat && !stat.isDirectory()) {
            return cb(null, false, stat);
        }
        var c = true;
        if (stat) {
            c = stat.isDirectory() ? 'DIR' : 'FILE';
        }
        this.cache[abs] = this.cache[abs] || c;
        if (needDir && c === 'FILE') {
            return cb();
        }
        return cb(null, c, stat);
    }
    return Glob;
})();


inherits(Glob, EE);

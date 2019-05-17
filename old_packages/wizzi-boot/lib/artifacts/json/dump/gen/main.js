var util = require('util');
var md = module.exports = {};
var myname = 'json.dump.main';
md.gen = function (model, ctx, callback) {
    var json = model.toJson ? model.toJson() : "{ error: 'The model has no toJson method'}";
    ctx.w(JSON.stringify(json, null, 4));
    callback(null, ctx);
}

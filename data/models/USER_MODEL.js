var mongoose = require('../db');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    _id         : Schema.Types.ObjectId,
    first_name  : String,
    last_name   : String,
    email       : String
});

module.exports = mongoose.model('add_user', UserSchema);

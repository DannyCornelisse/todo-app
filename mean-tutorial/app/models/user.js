// Invoke mongoose module
var mongoose = require('mongoose');

// Use mongoose method schema and assign to var
var Schema = mongoose.Schema;

// Use bcrypt-nodejs to encrypt password
var bcrypt = require('bcrypt-nodejs');


// Create new schema called UserSchema with properties username, password, email
var UserSchema = new Schema({

    username: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, lowercase: true, required: true, unique: true}

});

// Schema pre-save
UserSchema.pre('save', function(next){

    var user = this;
    
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next(err);
        // Take hash you just created from user.password and assign it to user.password
        user.password = hash;
        next();

    });
    
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

// Export as mongoose model with name User and schema userSchema
module.exports = mongoose.model('User', UserSchema);
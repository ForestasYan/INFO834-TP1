const express = require('express'),
    User = require('./Node.js');

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;


function createUser(nom, prenom, mail, password){
    var testUser = new User({
        nom: nom,
        prenom: prenom,
        mail: mail,
        password: password
    })

    testUser.save(function(err) {
        if (err) throw err;
    
        User.findOne({ mail:mail }, function(err, user) {
            if (err) throw err;
    
            user.comparePassword('Password123', function(err, isMatch) {
                if (err) throw err;
                console.log('Password123:', isMatch); 
            });
    
            // test a failing password
            user.comparePassword('123Password', function(err, isMatch) {
                if (err) throw err;
                console.log('123Password:', isMatch); // -> 123Password: false
            });
        });
    });
}


var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
    createUser("Bosé", "José", "JoseBove2@gmail.com", "password123");
});


var mongoose = require('mongoose');
var crypto = require('crypto');

var secret = 'luhutsihombing';
var password = crypto.createHmac('sha256', secret)
                   .update('password123')
                   .digest('hex');

console.log("Password: " + password);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/luhut', { useMongoClient: true });
var User = require('../models/user');

User.find({username:'poweradmin'}, function (err, user){
    if (user.length == 0)
    {
        var admin = new User({
            username: 'poweradmin',
            email: 'admin@gmail.com',
            password: password,
            firstname: 'Power',
            lastname: 'Admin',
            admin: true,
        });

        admin.save(function(err) {
          if (err) throw err;

          console.log('Admin is created!');
        });
    }
});

User.find({username:'powermember'}, function (err, user){
    if (user.length == 0)
    {
        var member = new User({
            username: 'powermember',
            email: 'member@gmail.com',
            password: password,
            firstname: 'Power',
            lastname: 'Member',
            admin: false,
        });

        member.save(function(err) {
          if (err) throw err;

          console.log('Member is created!');
        });
    }
});
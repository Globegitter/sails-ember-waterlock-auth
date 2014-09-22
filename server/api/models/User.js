/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

 module.exports = {

  attributes: require('waterlock').models.user.attributes({

    /* e.g.
    nickname: 'string'
    */
    email: { type: 'email' },
    password: { type: 'string' },
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    phone: { type: 'string'},
    company: { type: 'string'},
    role: { type: 'string', defaultsTo: 'admin'},

    hasRole: function (roleName) {
      return this.role === roleName;
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate,

//This just copies the email from the auth model into the user model for easier usage
afterCreate: function(newlyInsertedRecord, cb) {
  Auth.find().where({ user: newlyInsertedRecord.id }).then(function(auths) {
    if (newlyInsertedRecord.email !== auths[0].email) {
      User.update({ id: newlyInsertedRecord.id }, {email: auths[0].email}).exec(function(err, updated){
        if (err) {
          sails.log.err('Couldn\'t update the users\' email address.');
        }
      });
    }
    cb();
  }).fail(function(err){
    // The auth model of the uesr does not exist yet. This usually happens when you add a new user through the admin panel
    var authData = {
      email: newlyInsertedRecord.email,
      password: 'password'
    };
    waterlock.engine.attachAuthToUser(authData, newlyInsertedRecord, function (err) {
      if (err) {
        sails.log.err('Couldn\'t attach the users\' ' + updatedRecord.id + ' auth model.');
      }
      cb();
    });
  });
},

afterUpdate: function(updatedRecord, cb) {
  Auth.find().where({ user: updatedRecord.id }).then(function(auths) {
    if (updatedRecord.email !== auths[0].email) {
      User.update({ id: updatedRecord.id }, {email: auths[0].email}).exec(function(err, updated){
        if (err) {
          sails.log.err('Couldn\'t update the users\' email address.');
        }
      });
    }
    cb();
  }).fail(function(err){
    // An error occurred
    sails.log.err('Couldn\'t find the users\' ' + updatedRecord.id + ' auth model.');
    cb();
  });
}
};
/**
 * User.js
 *
 * @description :: users for
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require("bcrypt");

module.exports = {

  schema: true,

  attributes: {
    login            : {
      type    : 'string',
      required: true,
      email   : true,
      unique  : true
    },
    encryptedPassword: {
      type: 'string'
    },
    boards           : {
      collection: 'board',
      via       : 'user'
    },
    toJSON           : function ()
    {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },

  beforeCreate: function (values, next)
  {
    bcrypt.genSalt(12, function (err, salt)
    {
      if (err)
      {
        return next(err);
      }

      bcrypt.hash(values.password, salt, function (err, hash)
      {
        if (err)
        {
          return next(err);
        }

        values.encryptedPassword = hash;
        next();
      });
    });
  },

  validatePassword: function (password, user, cb)
  {
    bcrypt.compare(password, user.encryptedPassword, function (err, match)
    {
      if (err)
      {
        cb(err);
      }

      if (match)
      {
        cb(null, true);
      }
      else
      {
        cb(err);
      }
    });
  }
};


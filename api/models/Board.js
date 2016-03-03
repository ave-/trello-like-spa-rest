/**
 * Board.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    name  : {
      type: "string"
    },
    user  : {
      model: "user"
    },
    cards : {
      type: "array"
    },
    toJSON: function ()
    {
      var obj = this.toObject();
      delete obj.user; //do not expose user relation to outside world
      return obj;
    }
  },
};


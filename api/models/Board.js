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
  ownBoard: function (id, callback)
  {
    BoardService.findOne(values.board).exec(
      function (err, board)
      {

        if (!board)
        {
          return callback("board not found");
        }
        if (err)
        {
          return callback(err); //some other error
        }
        if (board.user.id !== values.user) //board with this id belongs to another user
        {
          return callback("forbidden");
        }
        return callback(); //passed
      }
    );
  }
};


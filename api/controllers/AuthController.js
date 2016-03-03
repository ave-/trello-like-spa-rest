/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * authenticate action, returns 401 if missing params
   * @param req
   * @param res
   */
  index: function (req, res)
  {
    var login    = req.param('login');
    var password = req.param('password');

    if (!login || !password)
    {
      return res.json(401, {err: 'username and password required'});
    }

    User.findOne({
                   login: login
                 })
        .exec(
          function (err, user)
          {
            if (!user)
            {
              return res.json(401, {err: 'user not found or incorrect password'});
            }

            User.validatePassword(password, user, function (err, valid)
            {
              if (err)
              {
                return res.json(403, {err: 'forbidden'});
              }

              if (!valid)
              {
                return res.json(401, {err: 'user not found or incorrect password'});
              }
              else
              {
                res.json({login: user.login, token: AuthToken.createToken({sid: user.id})});
              }
            });
          });
  },

  register: function (req, res)
  {
    if (req.body.password !== req.body.confirmPassword)
    {
      return res.json(401, {err: 'Passwords must match!'});
    }
    User.create({login: req.body.login, password: req.body.password})
        .exec(function (err, user)
              {
                if (err)
                {
                  return res.json(err.status, {err: err.message});
                }
                if (user)
                {
                  return res.json({login: user.login, token: AuthToken.createToken({sid: user.id})});
                }
              });
  }
};


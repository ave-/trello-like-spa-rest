/**
 *
 * @type {{}}
 */
module.exports = function (req, res, next)
{
  if (req.body)
  {
    req.body.user = req.token.sid; // add current user id to models
  }
  if (req.method == 'GET')
  {
    req.query.user = req.token.sid; //filter all gets for this user
  }
  next();
};

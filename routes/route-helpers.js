module.exports = function (knex) {
  const {getUserId} = require('../db/query-db')(knex);

  return {
    authenticateUser: (req, res, next) => {
      getUserId(req.session.username || null).then(data => {
        if (!data.length) {
          return next({
            status: 401,
            message: "You must be logged in to do this"
          });
        } else {
          next();
        }
      });
    }
  };
};

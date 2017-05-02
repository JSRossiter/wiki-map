module.exports = function authenticateUser (req, res, next) {
  console.log("authenticating");
  if (!req.session.username) {
    return next ({ status: 401, message: "You must be logged in to view this page" });
  } else {
    next();
  }
};

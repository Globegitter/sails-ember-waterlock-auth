module.exports = function  (roleName) {
  return function (req, res, next) {
    console.log(roleName);
    if (req.session.user.hasRole(roleName)) {
      return next();
    } else {
      return res.forbidden();
    }
  }
}
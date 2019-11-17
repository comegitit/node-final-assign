
//Ensures user is authenticated
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    // method attached to the request object
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please Log-In To View This Resource");
    res.redirect("/users/login");
  }
}
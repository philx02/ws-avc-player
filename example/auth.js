function auth(req, res, next) {
  if (!req.signedCookies.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error("You are not authenticated");

      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    } else {
      var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
        .toString()
        .split(":");
      var username = auth[0];
      var password = auth[1];

      if (username == "philx02" && password == "orbitxxx1") {
        res.cookie('user', 'philx02', {
          signed: true,
          expire: 99983090
        });
        next();
      } else {
        var err = new Error("You are not authenticated");

        res.setHeader("WWW-Authenticate", "Basic");
        err.status = 401;
        next(err);
      }
    }
  } else {
    if (req.signedCookies.user == 'philx02') {
      next();
    } else {
      var err = new Error("You are not authenticated");
      err.status = 401;
      next(err);
    }
  }
}

module.exports = auth;

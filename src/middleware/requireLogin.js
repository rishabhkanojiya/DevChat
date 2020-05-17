const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must Log in" });
  }

  next();
};

module.exports = requireLogin;

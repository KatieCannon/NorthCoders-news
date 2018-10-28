const { Topic, Article, Comments, User } = require("../models/index");

exports.getUserByUsername = (req, res, next) => {
  const userName = req.params.username;
  User.find({ username: userName })
    .then(user => {
      if (!user.length) next({ status: 400, msg: "invalid user id" });
      else res.status(200).send({ user });
    })
    .catch(next);
};

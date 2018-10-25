const { Topic, Article, Comments, User } = require("../models/index");

exports.getUserByUsername = (req, res, next) => {
    const userName = req.params.username;
    User.find({username:userName})
    .then(user => {
        res.status(200).send({user})
    })
    .catch(next)
}
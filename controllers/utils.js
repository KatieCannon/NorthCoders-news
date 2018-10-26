const { Topic, Article, Comments, User } = require("../models/index");

exports.commentCount = (article) => {
    return Comments.find({belongs_to : article._id}).countDocuments()
  .then(count => {
     article.commentCount = count;
     return article
    })
}
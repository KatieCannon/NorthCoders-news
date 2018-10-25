const { Topic, Article, Comments, User } = require("../models/index");

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  console.log(articleId);
  Article.find({ _id: articleId })
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const articleId = req.params.article_id;
  Comments.find({ belongs_to: articleId })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addCommentToArticle = (req, res, next) => {
  const articleId = req.params.article_id;
  Comments.create({ ...req.body, belongs_to: articleId })
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.voteOnArticle = (req, res, next) => {
  const vote = req.query.vote;
  const articleId = req.params.article_id;
  console.log(articleId);
  Article.findByIdAndUpdate(
    { _id: articleId },
    { $inc: { votes: vote === "up" ? +1 : vote === "down" ? -1 : 0 } }
  )
    .then(articleUpdate => {
      Article.find({ _id: articleId }).then(article => {
        res.status(201).send({ article });
      });
    })
    .catch(next);
};

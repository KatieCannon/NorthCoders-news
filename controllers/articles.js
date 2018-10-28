const { Topic, Article, Comments, User } = require("../models/index");
const { commentCount } = require("./utils");

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .populate("created_by")
    .lean()
    .then(articles => {
      const articlesComments = articles.map(article => commentCount(article));
      return Promise.all(articlesComments);
    })
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  Article.findById(articleId)
    .populate("created_by")
    .lean()
    .then(article => {
      return Promise.all([commentCount(article)]);
    })
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(err => {
      if (err.name === "CastError")
        next({ status: 400, msg: "article id is not valid" });
      else next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const articleId = req.params.article_id;
  Comments.find({ belongs_to: articleId })
    .populate("belongs_to")
    .lean()
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      if (err.name === "CastError")
        next({ status: 400, msg: "article id is invalid" });
      else next(err);
    });
};

exports.addCommentToArticle = (req, res, next) => {
  const articleId = req.params.article_id;
  Comments.create({ ...req.body, belongs_to: articleId })
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.voteOnArticle = (req, res, next) => {
  const vote = req.query.vote;
  const articleId = req.params.article_id;
  Article.findByIdAndUpdate(
    { _id: articleId },
    { $inc: { votes: vote === "up" ? +1 : vote === "down" ? -1 : 0 } },
    { new: true }
  )
    .populate("created_by")
    .lean()
    .then(article => {
      return Promise.all([commentCount(article)]).then(article => {
        res.status(200).send({ article });
      });
    })
    .catch(next);
};

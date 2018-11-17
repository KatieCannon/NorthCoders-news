const { Topic, Article } = require("../models/index");
const { commentCount } = require("../Utils/utils");

exports.fetchAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.fetchArticlesByTopic = (req, res, next) => {
  const slug = req.params.topic_slug;
  Article.find({ belongs_to: slug })
    .populate("created_by")
    .lean()
    .then(articles => {
      if (!articles.length) {
        return Promise.reject({ status: 400, msg: "invalid topic" });
      } else {
        const articlesWithCommentCounts = articles.map(article =>
          commentCount(article)
        );
        return Promise.all(articlesWithCommentCounts).then(articles => {
          res.status(200).send({ articles });
        });
      }
    })
    .catch(next);
};

exports.addArticleByTopic = (req, res, next) => {
  const slug = req.params.topic_slug;
  return Article.create({ ...req.body, belongs_to: slug })
    .then(article => {
      return Article.findOne({'_id':article._id}).populate("created_by").lean()
    }).then(article1 => {
     const article ={...article1, comment_count:0}
      res.status(201).send({article})
  })
  
    //   res.status(201).send({ article });
    // })
     .catch(next);
};


const { Topic, Article, Comment, User } = require("../models/index");

exports.fetchAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
       res.status(200).send({ topics });
    })
    .catch(next);
};


exports.fetchArticlesByTopic =(req, res, next) => {
    console.log(req.params.topic_slug)
    const slug = req.params.topic_slug;
    Article.find({belongs_to : slug})
    .then(articles => {
        console.log(articles)
        res.status(200).send({articles})
    })
    .catch(next)
}

exports.addArticleByTopic = (req, res, next) => {
    console.log('hi')
    const slug =req.params.topic_slug;
    console.log(slug)
    Article.create({...req.body, belongs_to:slug})
    .then(article => {
        res.status(201).send({article})
    })
    .catch(next)
}
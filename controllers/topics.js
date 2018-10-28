const { Topic, Article, Comment, User } = require("../models/index");

exports.fetchAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
       res.status(200).send({ topics });
    })
    .catch(next);
};


exports.fetchArticlesByTopic =(req, res, next) => {
    const slug = req.params.topic_slug;
    Article.find({belongs_to : slug})
   .then(articles => {
        if(!articles.length){
            return Promise.reject({status:400,msg:"invalid topic"})
        } else {
        res.status(200).send({articles})
        }
    })
    .catch(next)
}
// add in commentCount and add to tests

exports.addArticleByTopic = (req, res, next) => {
    const slug =req.params.topic_slug;
    Article.create({...req.body, belongs_to:slug})
    .then(article => {
        res.status(201).send({article})
    })
    .catch(next)
}

// add in commentCount and add to tests
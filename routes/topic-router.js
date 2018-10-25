const topicsRouter = require('express').Router();
const{fetchAllTopics, fetchArticlesByTopic, addArticleByTopic} = require('../controllers/topics');

topicsRouter.get('/', fetchAllTopics);
topicsRouter.get('/:topic_slug/articles',fetchArticlesByTopic);
topicsRouter.post('/:topic_slug/articles',addArticleByTopic)


module.exports = topicsRouter 
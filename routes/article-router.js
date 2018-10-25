const articlesRouter = require('express').Router();
const{getAllArticles, getArticleById, getArticleComments, addCommentToArticle, voteOnArticle} = require('../controllers/articles')

articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:article_id', getArticleById);
articlesRouter.get('/:article_id/comments',getArticleComments);
articlesRouter.post('/:article_id/comments', addCommentToArticle);
articlesRouter.patch('/:article_id',voteOnArticle);

module.exports = articlesRouter;
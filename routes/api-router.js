const apiRouter =require('express').Router();
const topicsRouter = require('./topic-router');
const articlesRouter = require('./article-router');
const commentsRouter = require('./comment-router');
const usersRouter =  require('./user-router');

apiRouter.use('/topics',topicsRouter);
apiRouter.use('/articles',articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);


module.exports = apiRouter;
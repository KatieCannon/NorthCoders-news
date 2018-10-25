const commentRouter = require('express').Router();
const {voteOnComment, deleteCommentById} = require('../controllers/comments');

commentRouter.patch('/:comment_id',voteOnComment);
commentRouter.delete('/:comment_id', deleteCommentById);

module.exports = commentRouter;
const { Topic, Article, Comments, User } = require("../models/index");


exports.voteOnComment = (req, res, next) => {
const commentId = req.params.comment_id;
const vote = req.query.vote;
Comments.findByIdAndUpdate(
    {_id:commentId},
    {$inc: { votes: vote === 'up'? +1 : vote === 'down'? -1 : 0}}
)
.then(updatedComment => {
    if(!updatedComment)next({status:400, msg:"invalid comment id"})
    else Comments.find({_id:commentId})
    .then(comment=> {
        res.status(200).send({comment})
    } )
})
.catch(next)
};

exports.deleteCommentById =(req, res, next) => {
    const commentId = req.params.comment_id;
    Comments.deleteOne({_id : commentId})
    .then(comment => {
        res.status(200).send({msg: 'comment deleted successfully'})
    }
    )
    .catch(next)
}


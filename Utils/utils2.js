
exports.formatArticlesData = (articlesData, usersDocs) => {
   // console.log(usersDocs)
return articlesData.map(article => {
    //console.log(usersDocs)
    return{
         ...article,
          belongs_to: article.topic,
          created_by: usersDocs.find(user => user.username === article.created_by)._id
    }
})
};

exports.formatCommentsData = (commentsData,usersDocs,articlesDocs) => {
   // console.log(usersDocs)
return commentsData.map(comment => {
    return {
        ...comment,
    belongs_to : articlesDocs.find(article => article.title === comment.belongs_to)._id,
       created_by : usersDocs.find(user => user.username === comment.created_by)._id
    }
})
}

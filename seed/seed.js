const mongoose = require('mongoose');
const { Topic, User, Article, Comments} = require('../models/index')
const {formatArticlesData, formatCommentsData} = require('../Utils/utils2');

const seedDB = ({articlesData, commentsData, topicsData, usersData}) => {
return mongoose.connection.dropDatabase()
.then(()=> {
    return Promise.all([Topic.insertMany(topicsData), User.insertMany(usersData)])
})
.then(([topicsDocs, usersDocs])=> {
   // console.log(usersDocs)
    const articles = formatArticlesData(articlesData,usersDocs)
    return Promise.all([topicsDocs, usersDocs,Article.insertMany(articles)])
})
.then(([topicsDocs, usersDocs, articlesDocs])=> {
    //console.log(usersDocs)
const comments = formatCommentsData(commentsData,usersDocs,articlesDocs)
return Promise.all([topicsDocs, usersDocs, articlesDocs,Comments.insertMany(comments)])
})

.catch(console.log)
}


module.exports = seedDB;

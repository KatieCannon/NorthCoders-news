const mongoose = require('mongoose');
const {DB_URL} = require('../config');
const seedDb = require('./seed');
const {articlesData, commentsData, topicsData, usersData} =  require('./devData/index')


mongoose.connect(DB_URL, { useNewUrlParser : true })
 .then(() => {
     //console.log(articlesData)
     return seedDb({articlesData, commentsData, topicsData, usersData})
 })
 .then(() => {
     return mongoose.disconnect
    })
    .catch(console.log)

# Northcoders News Api

NC-News-Hack is a RESTful API that uses express and serves data from a mongoDB database.

Users can view and post articles related to topics of interest, comment on articles, vote on comments and view users.

[Here is a link to my live version of Nc-News-Hack](https://nc-news-hack.herokuapp.com)


## Getting Started

### Prerequisites

You will need to have the latest version of MongoDb and Node installed

### Installing

1. Fork this repository to your github account
2. Clone it in your terminal and cd into it
```bash
$git clone <`your forks url`>
$cd BE2-northcoders-news
```
3. Install all package dependancies
```bash
$npm install
```
This will install the following dependancies
*    body-parser: ^1.18.3
*    express: ^4.16.4
*    heroku: ^7.18.3
*    mongoose: ^5.3.6

and the following dev dependencies
*    chai: ^4.1.2
*    mocha: ^5.0.5
*    nodemon: ^1.17.4
*    supertest: ^3.3.0

4. create a config.js file 

In this file you will have to write a config file that points to the relevant database for the environment you are running

It should look like the below
```javascript
const env = process.env.NODE_ENV || 'development'

const config = {
    'development' : {
        DB_URL : 'mongodb://localhost:27017/nc_news'
    },
    'test' : {
        DB_URL : 'mongodb://localhost:27017/nc_news_test'
    }
}

module.exports = config[ENV]
```

5. Run mongod in a new terminal window and keep it running throughout
```bash
$ mongod
```

## Seeding

Once this is all set up and running you will need to seed the database
To do this you will need to run the seed.dev.js file
To do this run the following command

```bash
$npm run seed
```
This should successfully seed your database you can check it has been seeded successfully by running mongo in a new  terminal window and checking for the database nc_news
```bash
$ mongo
$ show dbs
```

## Testing

To run the api in the test environment enter the following command into your terminal
```bash
$ npm run test
```
Tests have been made for each endpoint checking that each endpoint runs successfully returning the correct information and gives a clear message for endpoints that are not met successfully

## Development

To run the api in the development environment run the following in the terminal
```bash
$ npm run dev
```
This should start your server and show the message listening at port 9090

## Endpoints

The following endpoints are available for this api

```http
GET /api 
# Serves an HTML page with documentation for all the available endpoints
```

```http
GET /api/topics
# Get all the topics
```

```http
GET /api/topics/:topic_slug/articles
# Return all the articles for a certain topic
# e.g: `/api/topics/football/articles`
```

```http
POST /api/topics/:topic_slug/articles
# Add a new article to a topic. This route requires a JSON body with title and body key value pairs
# e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
```

```http
GET /api/articles
# Returns all the articles
```

```http
GET /api/articles/:article_id
# Get an individual article
```

```http
GET /api/articles/:article_id/comments
# Get all the comments for a individual article
```

```http
POST /api/articles/:article_id/comments
# Add a new comment to an article. This route requires a JSON body with body and created_by key value pairs
# e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`
```

```http
PATCH /api/articles/:article_id
# Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
# e.g: `/api/articles/:article_id?vote=up`
```

```http
PATCH /api/comments/:comment_id
# Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
# e.g: `/api/comments/:comment_id?vote=down`
```

```http
DELETE /api/comments/:comment_id
# Deletes a comment
```

```http
GET /api/users/:username
# e.g: `/api/users/mitch123`
# Returns a JSON object with the profile data for the specified user.
```

## Deployment

My live nc-news-hack has been deployed on Heroku and the database on mLabs

### Built with

* Mocha - Javascript test framework
* Chai - Test assertion library
* nodemon - server change monitoring and restart
* mongoose.js - object modelling and db interaction
* supertest - used to test paths
* express.js - web framework for nodeJS

## Authors

Katie Cannon

## Acknowledgment

Northcoders bootcamp



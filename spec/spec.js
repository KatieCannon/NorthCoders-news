process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const mongoose = require("mongoose");
const seedDb = require("../seed/seed");
const {
  articlesData,
  commentsData,
  usersData,
  topicsData
} = require("../seed/testData");

describe("/api", () => {
  let topicsDocs, usersDocs, articlesDocs, commentsDocs;
  beforeEach(() => {
    return seedDb({ articlesData, commentsData, topicsData, usersData }).then(
      docs => {
        [topicsDocs, usersDocs, articlesDocs, commentsDocs] = docs;

        console.log("seeded a new database");
      }
    );
  });
  after(() => {
    return mongoose.disconnect();
  });

  describe("/topics", () => {
    it("GET / returns status 200 and topics data", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(Array.isArray(res.body.topics)).to.equal(true);
          expect(res.body.topics.length).to.equal(topicsDocs.length);
          expect(res.body.topics[0]).to.have.all.keys(
            "_id",
            "title",
            "slug",
            "__v"
          );
        });
    });
    it("responds with a 404 when the page is not found", () => {
      return request
        .get("/api/topic")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("page not found");
        });
    });

    it("GET / returns status 200 and the articles for a given topic", () => {
      return request
        .get(`/api/topics/${articlesDocs[0].belongs_to}/articles`)
        .expect(200)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(Array.isArray(res.body.articles)).to.equal(true);
          expect(res.body.articles[0].belongs_to).to.equal(
            articlesDocs[0].belongs_to
          );
          expect(res.body.articles[0]).to.have.all.keys(
            "_id",
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by",
            "commentCount",
            "__v"
          );
          expect(res.body.articles[0].created_by).to.be.an("object");
          expect(res.body.articles).to.have.lengthOf(2);
        });
    });
    it("responds with a 404 when the page is not found", () => {
      return request
        .get(`/api/topics/${articlesDocs[0].belongs_to}/article`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("page not found");
        });
    });
    it("responds with a 400 when given an invalid topic", () => {
      return request
        .get("/api/topics/football/articles")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("invalid topic");
        });
    });

    it("POST/ returns status 201 and the new article for a given topic", () => {
      return request
        .post(`/api/topics/${articlesDocs[0].belongs_to}/articles`)
        .send({
          title: "new article",
          body: "This is my new article content",
          created_by: `${usersDocs[0]._id}`
        })
        .expect(201)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(res.body.article.belongs_to).to.equal(
            articlesDocs[0].belongs_to
          );
          expect(res.body.article.title).to.equal("new article");
          expect(res.body.article.created_by).to.equal(`${usersDocs[0]._id}`);
          expect(res.body.article).to.have.all.keys(
            "_id",
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by",
            "__v"
          );
        });
    });
    it("responds with a 404 when the page is not found", () => {
      return request
        .post(`/api/topics/${articlesDocs[0].belongs_to}/article`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("page not found");
        });
    });
    it("responds with a 400 when given an invalid input types", () => {
      return request
        .post(`/api/topics/${articlesDocs[0].belongs_to}/articles`)
        .send({
          title: "new article",
          body: "This is my new article content",
          created_by: "tggg"
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("invalid input types");
        });
    });
  });

  describe("/articles", () => {
    it("GET / returns status 200 and articles data", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(Array.isArray(res.body.articles)).to.equal(true);
          expect(res.body.articles.length).to.equal(articlesDocs.length);
          expect(res.body.articles[0]).to.have.all.keys(
            "_id",
            "title",
            "body",
            "votes",
            "created_by",
            "belongs_to",
            "created_at",
            "commentCount",
            "__v"
          );
          expect(res.body.articles[0].created_by).to.be.an("object");
          expect(typeof res.body.articles[0].created_by).to.equal("object");
        });
    });
    it("responds with a 404 when the page is not found", () => {
      return request
        .get("/api/article")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("page not found");
        });
    });

    it("GET / returns status 200 and the article for a given id", () => {
      return request
        .get(`/api/articles/${articlesDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(res.body.article.title).to.equal(articlesDocs[0].title);
          expect(res.body.article).to.have.all.keys(
            "_id",
            "title",
            "body",
            "votes",
            "created_by",
            "belongs_to",
            "created_at",
            "commentCount",
            "__v"
          );
          expect(res.body.article.created_by).to.be.an("object");
        });
    });
    it("responds with a 400 when the page is not found", () => {
      return request
        .get("/api/articles/hhfe")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("article id is not valid");
        });
    });

    it("GET / returns status 200 and the comments for a given article id", () => {
      return request
        .get(`/api/articles/${articlesDocs[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(res.body.comments[0].belongs_to).to.contain(
            articlesDocs[0]._id
          );
          expect(res.body.comments[0]).to.have.all.keys(
            "_id",
            "body",
            "votes",
            "created_by",
            "belongs_to",
            "created_at",
            "__v"
          );
        expect(res.body.comments[0].created_by).to.be.an("object");
        });
    });
    it("responds with a 404 when the page is not found", () => {
      return request
        .get(`/api/articles/${articlesDocs[0]._id}/comment`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("page not found");
        });
    });
    it("responds with a 400 when article id is not valid", () => {
      return request
        .get("/api/articles/dfg/comments")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("article id is not valid");
        });
    });

    it("POST/ returns status 201 and the new comment for the given article", () => {
      return request
        .post(`/api/articles/${articlesDocs[0]._id}/comments`)
        .send({
          body: "This is my new comment",
          created_by: `${usersDocs[0]._id}`
        })
        .expect(201)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(res.body.comment.belongs_to).to.contain(articlesDocs[0]._id);
          expect(res.body.comment).to.have.all.keys(
            "_id",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by",
            "__v"
          );
        });
    });
    it("responds with a 404 when the page is not found", () => {
      return request
        .post(`/api/articles/${articlesDocs[0]._id}/comment`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("page not found");
        });
    });
    it("responds with a 400 when given an invalid input types", () => {
      return request
        .post(`/api/articles/${articlesDocs[0]._id}/comments`)
        .send({
          body: "This is my new article content"
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("invalid input types");
        });
    });

    it("PATCH/ returns status 201 and the article for the given id with vote ammended", () => {
      return request
        .patch(`/api/articles/${articlesDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(res.body.article[0].votes).to.equal(1);
          expect(res.body.article[0].title).to.equal(articlesDocs[0].title);
          expect(res.body.article[0]).to.have.all.keys(
            "_id",
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by",
            "commentCount",
            "__v"
          );
          expect(res.body.article[0].created_by).to.be.an("object");
        });
    });

    it("PATCH/ returns status 201 and the article for the given id with vote ammended", () => {
      return request
        .patch(`/api/articles/${articlesDocs[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(typeof res.body).to.equal("object");
          expect(res.body.article[0].votes).to.equal(-1);
          expect(res.body.article[0].title).to.equal(articlesDocs[0].title);
          expect(res.body.article[0]).to.have.all.keys(
            "_id",
            "title",
            "body",
            "votes",
            "created_at",
            "belongs_to",
            "created_by",
            "commentCount",
            "__v"
          );
          expect(res.body.article[0].created_by).to.be.an("object");
        });
    });
    it("responds with a 200 when given anything that isnt up/down and returns original data", () => {
      return request
        .patch(`/api/articles/${articlesDocs[0]._id}?vote=not`)
        .expect(200)
        .then(res => {
          expect(res.body.article[0].votes).to.equal(0);
        });
    });
  });

  describe("/comments", () => {
    it("PATCH / returns a status 200 and the comment with vote ammended", () => {
      return request
        .patch(`/api/comments/${commentsDocs[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.comment[0].votes).to.equal(commentsDocs[0].votes + 1);
        });
    });
    it("returns a status 400 when comment id is invalid", () => {
      return request
        .patch("/api/comments/fjhkugthhiij?vote=up")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("invalid comment id");
        });
    });
    it("DELETE/ returns message that comment has been removed", () => {
      return request
        .delete(`/api/comments/${commentsDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.msg).to.equal("comment deleted successfully");
          return request;
        });
    });
  });

  describe("/users", () => {
    it("returns user by username", () => {
      return request
        .get(`/api/users/${usersDocs[0].username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user[0]).to.have.all.keys(
            "username",
            "name",
            "avatar_url",
            "__v",
            "_id"
          );
          expect(res.body.user[0].username).to.equal(
            `${usersDocs[0].username}`
          );
        });
    });
    it("returns a 400 when user id is invalid", () => {
      return request
        .get(`/api/users/gtyhujikolpl`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("invalid user id");
        });
    });
  });
});

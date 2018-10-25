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
          console.log(res.body)
          expect(res.body.topics.length).to.equal(topicsDocs.length);
        });
    });
    it("responds with a 404 when the page is not found", () => {
      return request
      .get("/api/topic")
      .expect(404)
      .then(res => {
        console.log(res.body.msg, '>>>>>>');
        expect(res.body.msg).to.equal('page not found')
      })
      .catch(console.log)
    });
  });
});

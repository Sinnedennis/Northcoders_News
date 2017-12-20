process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../seed/test.seed');
const app = require('../server');
const { Users, Articles, Comments, Topics } = require('../models/models');  // eslint-disable-line

describe('API', () => {
  let usefulData;
  beforeEach(() => {
    return mongoose.connection.dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
      })
      .catch(err => console.log('error: ' + err));  // eslint-disable-line
  });

  describe('GET /topics', () => {
    it('sends back the correct object containing all topics with a status code of 200', () => {
      return request(app).get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3);
          expect(res.body[0].title).to.be.a('string');
        });
    });
  });

  describe('GET /topics/:topic_id/articles', () => {
    it('sends back the correct object containing all articles about a supplied topic with a status code of 200', () => {
      return request(app).get(`/api/topics/${usefulData.topics[0]._id}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.be.a('string');
        });
    });
    it('returns 404 when given an invalid param', () => {
      return request(app).get('/api/topics/hello/articles')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Page not found');
        });
    });
  });

  describe('GET /article', () => {
    it('sends back the correct object containing all articles with a status code of 200', () => {
      return request(app).get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[0].belongs_to).to.be.a('string');
        });
    });
  });

  describe('GET /article/:article_id', () => {
    it('sends back the correct object containing all articles with a status code of 200', () => {
      return request(app).get(`/api/articles/${usefulData.articles[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article).to.be.an('object');
          expect(res.body.article.belongs_to).to.be.a('string');
          expect(res.body.article.title).to.be.a('string');
        });
    });
  });
  describe('GET /articles/:article_id/comments', () => {
    it('sends back the correct object containing all comments of an article with a status code of 200', () => {
      return request(app).get(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.be.an('array');
          expect(res.body.comments[0].body).to.be.a('string');
        });
    });
    it('returns 404 when given an invalid param', () => {
      return request(app).get('/api/articles/hello/comments')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Page not found');
        });
    });
  });

  describe('POST /articles/:article_id/comments', () => {
    it('receives a {comment} and adds it to a specific article in the db', () => {
      const commentObj = { comment: 'This is a test comment' };

      return request(app).post(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .send(commentObj)
        .expect(200)
        .then(res => {
          expect(res.body.message).to.equal('Comment successfully inserted!');
          expect(res.body.comment.body).to.equal(commentObj.comment);

          commentObj._id = res.body.comment._id;
          return Comments.findById(res.body.comment._id);
        })
        .then(queryRes => {
          expect(String(queryRes._id)).to.equal(commentObj._id);
          expect(queryRes.body).to.equal(commentObj.comment);
        });
    });
  });

  describe('PUT /articles/:article_id?vote=up', () => {
    it('upvotes an article', () => {
      expect(usefulData.articles[0].votes).to.equal(0);
      return request(app)
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.data._id).to.equal(String(usefulData.articles[0]._id));
          expect(res.body.data.votes).to.equal(1);
          expect(usefulData.articles[0].votes).to.equal(0);
        });
    });
    it('downvotes an article', () => {
      expect(usefulData.articles[0].votes).to.equal(0);
      return request(app)
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body.data._id).to.equal(String(usefulData.articles[0]._id));
          expect(res.body.data.votes).to.equal(-1);
          expect(usefulData.articles[0].votes).to.equal(0);
        });
    });
    it('does not affect an article\'s votes if invalid query is given', () => {
      expect(usefulData.articles[0].votes).to.equal(0);
      return request(app)
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=sideways`)
        .expect(400);
    });
  });

  describe('PUT /comments/:comment_id?vote=up', () => {
    it('upvotes an comment', () => {
      expect(usefulData.comments[0].votes).to.equal(0);
      return request(app)
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.data._id).to.equal(String(usefulData.comments[0]._id));
          expect(res.body.data.votes).to.equal(1);
          expect(usefulData.comments[0].votes).to.equal(0);
        });
    });
    it('downvotes an comment', () => {
      expect(usefulData.comments[0].votes).to.equal(0);
      return request(app)
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body.data._id).to.equal(String(usefulData.comments[0]._id));
          expect(res.body.data.votes).to.equal(-1);
          expect(usefulData.comments[0].votes).to.equal(0);
        });
    });
    it('does not affect an comment\'s votes if invalid query is given', () => {
      expect(usefulData.comments[0].votes).to.equal(0);
      return request(app)
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=sideways`)
        .expect(400);
    });
  });

  describe('DELETE /api/comments/:comment_id', () => {
    it('Deletes a comment by comment_id', () => {
      let commentId;
      let commentBody;
      return request(app).get(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .then(res => {
          commentId = res.body.comments[0]._id;
          commentBody = res.body.comments[0].body;

          expect(res.body.comments[0].body).to.be.a('string');

          return request(app).delete(`/api/comments/${commentId}`);
        })
        .then((result) => {
          expect(200);
          expect(result.body.message).to.equal('Comment successfully deleted');
          expect(result.body.deletedComment._id).to.equal(commentId);
          return request(app).get(`/api/articles/${usefulData.articles[0]._id}/comments`);
        })
        .then(response => {
          expect(response.body.comments[0]._id).to.not.equal(commentId);
          expect(response.body.comments[0].body).to.not.equal(commentBody);
        });
    });
  });

  describe('GET /users/', () => {
    it('sends back all users', () => {
      return request(app).get(`/api/users/`)
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(usefulData.user.length);

          res.body.forEach((user) => {
            expect(user).to.have.a.property('username');
            expect(user).to.have.a.property('name');
          })
        });
    });
  });

  describe('GET /users/:username', () => {
    it('sends back a user based on username param', () => {
      return request(app).get(`/api/users/${usefulData.user.username}`)
        .expect(200)
        .then((res) => {
          expect(res.body.username).to.equal(usefulData.user.username);
          expect(res.body.name).to.equal(usefulData.user.name);
          expect(res.body.avatar_url).to.equal(usefulData.user.avatar_url);
        });
    });
  });
});
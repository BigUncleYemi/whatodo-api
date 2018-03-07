'use strict'

var chai = require('chai');
var app = require('../app').app;
var server = require('../app').server;
var request = require("supertest").agent(server);

var expect = chai.expect;
describe('API Tests', function () {
  var results = {
    TaskName: 'sleep well',
    TaskDate: '2018-03-07',
    TaskTime: '23:00',
    TaskVenue: 'awo',
    TaskPriority: 'free',
    TaskNote: 'dk eat and sleep'
  }
  describe('# Form page Rendered', function () {
    after(function (done) {
      server.close();
      done();
    });
    it('should display form page', function (done) {
      request.get('/').end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      })
    })
  });

  describe('# Post a Task', function () {
    after(function (done) {
      server.close();
      done();
    });
    it('should post all tasks', function (done) {
      request.post('/sucessful').send(results).end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.results.TaskName).to.equal('sleep well');
        results = res.body;
        done();
      })
    })
  });

  describe('# Get all tasks', function () {
    after(function (done) {
      server.close();
      done();
  });

    it('should get all tasks', function (done) {
      request.get('/api').end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      })
    })
  });

  describe('# Get a task', function () {
    after(function (done) {
      server.close();
      done();
  });

    it('should get a task', function (done) {
      request.get('/api/' + results._Id).end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      })
    })
  });

  describe('Update a task by id', function() {
    it('should modify a task', function(done) {
      results.TaskName = 'wake up'
      request.put('/api/update/' + results._Id).send(results).end(function(err, res) {
          expect(res.body.results.TaskName).to.equal('wake up');
          expect(res.statusCode).to.equal(200);
          done();
        })
    })
  });

  describe('# Delete a Task', function () {
    after(function (done) {
      server.close();
      done();
    });
    it('should delete a task', function (done) {
      request.delete('/sucessful/'+ results._Id).end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.a('Object');
        done();
      })
    })
  })

  describe('# Delete all Tasks', function () {
    after(function (done) {
      server.close();
      done();
    });
    it('should delete all tasks', function (done) {
      request.delete('/sucessful').end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.be.an('string');
        done();
      })
    })
  })
});
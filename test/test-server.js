var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:3000/mainPage' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Login page', function(done) {
    request('http://localhost:3000/login' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Retrive token', function(done) {
    request('http://localhost:3000/token' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Logout', function(done) {
    request('http://localhost:3000/disconnect' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Access unavailable routes', function(done) {
    request('http://localhost:3000/asd' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});
it('Main page content after login', function(done) {
    request('http://localhost:3000/mainPage' , function(error, response, body) {
        expect(body).to.exist;
        done();
    });
});
it('Login content on the page', function(done) {
    request('http://localhost:3000/login' , function(error, response, body) {
        expect(body).to.exist;
        done();
    });
});

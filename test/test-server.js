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

it('Logout when no one is logged in', function(done) {
    request('http://localhost:3000/disconnect' , function(error, response, body) {
        expect(response).to.equal(undefined);
        done();
    });
});

it('the api route', function(done) {
    request('http://localhost:3000/api' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Create project route', function(done) {
    request('http://localhost:3000/api/createProject' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('Get project route', function(done) {
    request('http://localhost:3000/api/getProject' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('Sign project route', function(done) {
    request('http://localhost:3000/api/signProject' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('Upload route', function(done) {
    request('http://localhost:3000/api/upload' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('Download route', function(done) {
    request('http://localhost:3000/api/download' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Access unavailable routes from the api path', function(done) {
    request('http://localhost:3000/api/asd' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
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

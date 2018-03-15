var expect  = require('chai').expect;
var request = require('request');

it('Main page front end', function(done) {
    request('http://localhost:3006/' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Main page content front end', function(done) {
    request('http://localhost:3006/' , function(error, response, body) {
        expect(body).to.exist;
        done();
    });
});
it('Create project front end', function(done) {
    request('http://localhost:3006/createProject' , function(error, response, body) {
        expect(body).to.exist;
        done();
    });
});

it('Index front end', function(done) {
    request('http://localhost:3006/index' , function(error, response, body) {
        expect(body).to.exist;
        done();
    });
});

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
        expect(response).not.equal(200);
        done();
    });
});

it('the api route', function(done) {
    request('http://localhost:3000/api' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Displayname route', function(done) {
    request('http://localhost:3000/api/getUserDisplayName' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});

it('Check user route', function(done) {
    request('http://localhost:3000/api/checkUser' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});

it('Get department route', function(done) {
    request('http://localhost:3000/api/getDepartment' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});


it('Sign up route', function(done) {
    request('http://localhost:3000/api/signup' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});

it('Get RIS new projects route', function(done) {
    request('http://localhost:3000/api/getRISNewProjects' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Get RIS projects in proccess route', function(done) {
    request('http://localhost:3000/api/getRISInProcessProjects' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});

it('Get dean projects route', function(done) {
    request('http://localhost:3000/api/getDeanProjects' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});

it('Add comment route', function(done) {
    request('http://localhost:3000/api/addComment' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
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

it('Download2 route', function(done) {
    request('http://localhost:3000/api/download2' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});

it('Download3 route', function(done) {
    request('http://localhost:3000/api/download3' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
        done();
    });
});

it('Delete route', function(done) {
    request('http://localhost:3000/api/delete' , function(error, response, body) {
        expect(response.statusCode).not.equal(200);
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

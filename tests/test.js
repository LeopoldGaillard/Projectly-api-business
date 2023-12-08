const { app, server } = require('../main.js');
const supertest = require('supertest');
require('dotenv').config()

const { TESTADMINPASS } = process.env;

const requestWithSupertest = supertest(server);

let authToken

beforeAll(async () => {
    await new Promise((resolve, reject) => {
        app.on('ready', () => {
            requestWithSupertest
                .post('/auth/signin')
                .send({email: 'admin@admin.admin', password: TESTADMINPASS})
                .then((res) => {
                    authToken = res.body.accessToken;
                    resolve();
                })
        });
        server.on('error', (err) => {
            console.error(err);
            reject(err);
        });
    });
})

afterAll(async () => {
    return new Promise((resolve, reject) => {
        console.log('Closing server...');
        server.close(() => {
            console.log('Server closed.');
            resolve();
        });
    });
});

describe('GET /users not admin', () => {
    it('GET /users without email should give a 400 status', async () => {
        const res = await requestWithSupertest
            .get('/users');
        expect(res.status).toEqual(400);
    });
});

describe('POST /auth/signin password setup', () => {
    it('POST /auth/signin on a user that has to set his password up should give a 403 status', async () => {
        const res = await requestWithSupertest
            .post('/auth/signin')
            .send({email: 'toto@toto.toto', password: 'any'});
        expect(res.status).toEqual(403);
    });
});

describe('POST /auth/signin works', () => {
    it('POST /auth/signin on a correct user should give a 200 status', async () => {
        const res = await requestWithSupertest
            .post('/auth/signin')
            .send({email: 'admin@admin.admin', password: TESTADMINPASS});
        expect(res.status).toEqual(200);
    });
});

describe('POST /users should work when doing it as an admin', () => {
    it('POST /users as an admin with right fields should give a 201 status', async () => {
        const res = await requestWithSupertest
            .post('/users')
            .set('x-access-token', authToken)
            .send({email: 'test@test.test', firstname: 'Thomas', lastname: 'Wayne'});

        expect(res.status).toEqual(201);
    });
})

describe('PUT on /users/promote should not work on a user that has no password set up', () => {
    it('PUT /users/promote to a user with no password should give a 409 status', async () => {
        const res = await requestWithSupertest
            .put('/users/promote')
            .set('x-access-token', authToken)
            .send({email: 'test@test.test'});

        expect(res.status).toEqual(409);
    });
})

describe('DELETE /users should work when doing it as an admin', () => {
    it('DELETE /users as an admin with right fields should give a 204 status', async () => {
        const res = await requestWithSupertest
            .delete('/users')
            .set('x-access-token', authToken)
            .send({email: 'test@test.test'});

        expect(res.status).toEqual(204);
    });
})
const { app, server } = require('../main.js');
const supertest = require('supertest');

const requestWithSupertest = supertest(server);

beforeAll(async () => {
    await new Promise((resolve, reject) => {
        app.on('ready', () => {
            resolve();
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

describe('User Endpoints', () => {
    it('GET /users without email should give a 400 status', async () => {
        const res = await requestWithSupertest.get('/users');
        expect(res.status).toEqual(400);
    });
});

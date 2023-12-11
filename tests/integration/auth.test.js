const { server } = require('../../main.js');
const supertest = require('supertest');
require('dotenv').config()

const { TESTADMINPASS } = process.env;

const requestWithSupertest = supertest(server);

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
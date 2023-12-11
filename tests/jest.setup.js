const { app, server } = require('../main.js');

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
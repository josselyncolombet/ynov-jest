
const request = require('supertest');
const app = require('../server');
const Task = require('../models/task');

Task.find = jest.fn(() => Promise.resolve([{ _id: 'someId', title: 'Test Task', completed: false }]));

describe('GET /mockedtasks', () => {
    test('should fetch all tasks', async () => { 
        const res = await request(app).get('/mockedtasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{ _id: 'someId', title: 'Test Task', completed: false }]);
    });
});
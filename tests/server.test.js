const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
    let taskId;

    // Test for GET all tasks
    test('should fetch all tasks', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Test for POST a new task
    test('should create a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                title: 'Test Task',
                completed: false
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        taskId = res.body.id;  // Save the task ID for later tests
    });

    // Test for PUT to update a task
    test('should update a task', async () => {
        const res = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                title: 'Updated Task Title',
                completed: true
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('Updated Task Title');
    });

    // Test for DELETE a task
    test('should delete a task', async () => {
        const res = await request(app)
            .delete(`/tasks/${taskId}`);
        expect(res.statusCode).toEqual(204);
    })
})
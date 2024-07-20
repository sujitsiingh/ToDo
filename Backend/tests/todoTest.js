const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Todo = require('../models/todoModel');
const User = require('../models/userModel');

let token;

beforeAll(async () => {
    await mongoose.connect(process.env.DB_STRING);

    const user = new User({ email: 'testuser', password: 'password123' });
    await user.save();

    const res = await request(app)
        .post('/api/login')
        .send({ email: 'testuser', password: 'password123' });

    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Todo.deleteMany();
});


describe('Todo API Backend', () => {
    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/api/todos/addTodo').set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Todo',
                description: 'Test Description',
                status: 'incomplete',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Test Todo');
    });

    it('should fetch all todos', async () => {
        await Todo.create({ title: 'Test Todo', description: 'Test Description', status: 'pending' });

        const res = await request(app).get('/api/todos/').set('Authorization', `Bearer ${token}`);;

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should fetch a single todo by id', async () => {
        const todo = await Todo.create({ title: 'Test Todo', description: 'Test Description', status: 'pending' });

        const res = await request(app).get(`/api/todos/${todo._id}`).set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Test Todo');
    });

    it('should update a todo by id', async () => {
        const todo = await Todo.create({ title: 'Test Todo', description: 'Test Description', status: 'pending' });

        const res = await request(app)
            .patch(`/api/todos/updateTodo/${todo._id}`).set('Authorization', `Bearer ${token}`)
            .send({ status: 'completed' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'completed');
    });

    it('should delete a todo by id', async () => {
        const todo = await Todo.create({ title: 'Test Todo', description: 'Test Description', status: 'pending' });

        const res = await request(app).delete(`/api/todos/deleteTodo/${todo._id}`).set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });
});

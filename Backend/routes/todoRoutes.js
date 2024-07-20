const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');
const auth = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the todo item
 *         title:
 *           type: string
 *           description: The title of the todo item
 *         description:
 *           type: string
 *           description: The description of the todo item
 *         status:
 *           type: Boolean
 *           description: The status of the todo item
 *           enum:
 *             - incomplete
 *             - completed
 *       example:
 *         id: d5fE_aszgtedgh
 *         title: google form
 *         description: fill in google form for squbix
 *         status: incomplete
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Bad Request
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Returns the list of all the todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: The list of the todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get the todo by id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: The todo was not found
 */

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update the todo by the id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Bad Request
 *       400:
 *         description: The todo was not found
 */

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Remove the todo by id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: The todo was not found
 */

router.get('/', auth, todoController.getAllTodos);
router.get('/todosByUser/:id', auth, todoController.getTodosByUser);
router.post('/addTodo', auth, todoController.addTodo);
router.put('/updateTodo/:id', auth, todoController.updateTodo);
router.put('/complete/:id', auth, todoController.completeTodo);
router.put('/incomplete/:id', auth, todoController.incompleteTodo);
router.delete('/deleteTodo/:id', auth, todoController.deleteTodo);

module.exports = router;
import express from "express";
import {getTodos, getTodoById, createTodos, updateTodos, deleteTodos} from "../controllers/TodoController.js";

const router = express.Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
// router.get('/todos/order/:order', getTodos);
// router.get('/todos/filter/:filter', getTodos)
router.post('/todos', createTodos)
router.patch('/todos/:id', updateTodos)
router.delete('/todos/:id', deleteTodos)
router.get('/todos/:order/:filter', getTodos)

export default router;
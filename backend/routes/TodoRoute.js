import express from "express";
import {createTodos, deleteTodos, getTodoById, getTodos, updateTodos} from "../controllers/TodoController.js";

const router = express.Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.post('/todos', createTodos)
router.patch('/todos/:id', updateTodos)
router.delete('/todos/:id', deleteTodos)

export default router;
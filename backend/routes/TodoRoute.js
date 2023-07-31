import express from "express";
import {getTodos, getTodoById, createTodos, updateTodos, deleteTodos} from "../controllers/TodoController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

//for todos routes
router.get('/todos', getTodos);
router.get('/todos/:id', getTodoById);
router.post('/todos', createTodos)
router.patch('/todos/:id', updateTodos)
router.delete('/todos/:id', deleteTodos)
router.get('/todos/:order/:filter', getTodos)

export default router;
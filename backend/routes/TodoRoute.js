import express from "express";
import {getTodos} from "../controllers/TodoController.js";

const router = express.Router();

router.get('/todos', getTodos);

export default router;
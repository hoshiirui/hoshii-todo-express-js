import express from "express";
import { Register, getUsers } from "../controllers/UserController.js";

const router = express.Router();

//for user routes
router.get('/users', getUsers);
router.post('/users', Register)

export default router;
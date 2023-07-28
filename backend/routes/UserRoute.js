import express from "express";
import { Login, Register, getUsers } from "../controllers/UserController.js";

const router = express.Router();

//for user routes
router.get('/users', getUsers);
router.post('/users', Register);
router.post('/login', Login);

export default router;
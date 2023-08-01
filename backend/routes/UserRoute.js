import express from "express";
import { Login, Logout, Register, getUsers } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyTokenRefresh } from "../middleware/verifyTokenRefresh.js";

const router = express.Router();

//for user routes
// router.get('/users', getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.delete('/logout', Logout)
router.get('/users', verifyToken, getUsers)
router.get('/token', verifyTokenRefresh, refreshToken)

//verif nya pake verifyToken secret untuk refreshtoken

export default router;
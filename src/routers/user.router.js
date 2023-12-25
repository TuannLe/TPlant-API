import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { verifyToken } from '../common/authMiddleware.js'

const router = express.Router();

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/update/:account_id", verifyToken, userController.update)
router.post("/change-password", verifyToken, userController.changePassword)

export default router
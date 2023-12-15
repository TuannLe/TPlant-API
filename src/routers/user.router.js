import express from 'express';
import { userController } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/update/:account_id", userController.update)
router.post("/change-password", userController.changePassword)

export default router
import express from 'express';
import { commentController } from '../controllers/comment.controller.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: 'uploads/' })

router.post("/create", upload.single('images'), commentController.create)
router.get("/get-all/:id", commentController.getAll)
router.post("/update/:id", upload.single('images'), commentController.update)
router.delete("/delete/:id", commentController.delete)

export default router
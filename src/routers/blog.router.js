import express from 'express';
import { blogController } from '../controllers/blog.controller.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: 'uploads/' })

router.post("/create", upload.single('images'), blogController.create)
router.post("/update/:articles_id", upload.single('images'), blogController.update)
router.delete("/delete/:articles_id", blogController.delete)
router.get("/get-all", blogController.getAll)

export default router
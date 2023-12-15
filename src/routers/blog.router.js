import express from 'express';
import { blogController } from '../controllers/blog.controller.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: 'uploads/' })

router.post("/create", upload.single('images'), blogController.create)
router.post("/update/:article_id", upload.single('images'), blogController.update)
router.post("/handle-emotion", blogController.handleEmotion)
router.delete("/delete/:article_id", blogController.delete)
router.get("/get-all", blogController.getAll)
router.get("/get-popular", blogController.getPopular)
router.get("/get-detail-by-id/:article_id", blogController.getByID)

export default router
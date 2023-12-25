import express from 'express';
import multer from 'multer';
import { diseaseController } from '../controllers/disease.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' })

router.post("/create", upload.single('images'), diseaseController.create)
router.get("/get-detail/:disease_id", diseaseController.getDetail)
router.post("/create-feedback", diseaseController.createFeedback)

export default router
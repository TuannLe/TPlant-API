import express from 'express';
import { diseaseController } from '../controllers/disease.controller.js';

const router = express.Router();

router.post("/create-feedback", diseaseController.create)
router.get("/get-detail/:disease_id", diseaseController.getDetail)

export default router
import { Feedback, Disease } from '../models/disease.model.js'
import multer from "multer"
import cloudinary from "../../upload.js"

export const diseaseController = {
    getDetail: (req, res) => {
        const disease_id = req.params.disease_id;
        Disease.getDetail(disease_id, (result) => {
            res.send(result);
        });
    },
    create: (req, res) => {
        multer(cloudinary.uploader.upload(req.file.path,
            {
                allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'wedp']
            },
            function (error, result) {
                if (error) {
                    return error;
                } else {
                    const images = result.url;
                    const name = req.body.name;
                    const description = req.body.description;
                    Disease.create(name, description, images, (result) => {
                        res.send(result);
                    });
                }
            })
        );
    },
    createFeedback: (req, res) => {
        const account_id = req.body.account_id;
        const disease_id = req.body.disease_id;
        const rate = req.body.rate;
        Feedback.createFeedback(disease_id, account_id, rate, (result) => {
            res.send(result);
        });
    },
}
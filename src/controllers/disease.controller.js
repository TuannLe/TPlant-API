import { Feedback, Disease } from '../models/disease.model.js'

export const diseaseController = {
    create: (req, res) => {
        const account_id = req.body.account_id;
        const disease_id = req.body.disease_id;
        const rate = req.body.rate;
        Feedback.create(disease_id, account_id, rate, (result) => {
            res.send(result);
        });
    },
    getDetail: (req, res) => {
        const disease_id = req.params.disease_id;
        Disease.getDetail(disease_id, (result) => {
            res.send(result);
        });
    }
}
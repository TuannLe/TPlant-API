import User from '../models/user.model.js'

export const userController = {
    register: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const created_at = new Date()
        User.register(email, password, created_at, (result) => {
            res.send(result);
        });
    },
    login: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.login(email, password, (result) => {
            res.send(result);
        });
    }
}
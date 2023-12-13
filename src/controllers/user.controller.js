import User from '../models/user.model.js'

export const userController = {
    register: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const created_at = new Date()
        User.register(email, password, username, created_at, (result) => {
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
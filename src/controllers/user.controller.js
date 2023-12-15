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
    },
    update: (req, res) => {
        const account_id = req.params.account_id;
        const username = req.body.username;
        const address = req.body.address;
        User.update(username, address, account_id, (result) => {
            res.send(result);
        });
    },
    changePassword: (req, res) => {
        const old_password = req.body.old_password;
        const new_password = req.body.new_password;
        const email = req.body.email;
        User.changePassword(old_password, new_password, email, (result) => {
            res.send(result)
        })
    }
}
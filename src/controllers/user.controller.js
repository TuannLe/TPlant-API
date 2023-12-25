import bcrypt from 'bcrypt';
import User from '../models/user.model.js'
import { createToken } from '../common/JWT.js'

export const userController = {
    register: async (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const created_at = new Date()
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        User.register(email, password, username, created_at, (result) => {
            res.send(result);
        });
    },
    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password
        User.login(email, password, async (result) => {
            if (result) {
                const token = await createToken(result)
                const { password, ...others } = result[0]
                res.send({ ...others, token })
            } else {
                res.send("Login fail");
            }
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
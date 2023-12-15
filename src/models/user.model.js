import db from '../common/connect.js'

const User = (blog) => {
    this.account_id = blog.account_id;
    this.email = blog.email;
    this.password = blog.password;
    this.username = blog.username;
    this.address = blog.address;
    this.otp = blog.otp;
    this.status = blog.status;
    this.role = blog.role;
    this.created_at = blog.created_at;
};

User.register = (email, password, username, created_at, callback) => {
    const sqlString = "SELECT * FROM `accounts` WHERE `email`=?";
    db.query(sqlString, [email], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length > 0) {
            callback("Email already exists");
        } else {
            const sqlString = `INSERT INTO 
                            accounts(email, password, username, status, role, created_at) 
                        VALUES 
                            (?,?,?,1,0,?)`;
            db.query(sqlString, [email, password, username, created_at], (err, result) => {
                if (err) {
                    return callback(err);
                }
                callback('Create account successfully');
            });
        }
    });
};

User.login = (email, password, callback) => {
    const sqlString = "SELECT * FROM `accounts` WHERE `email` = ? AND `password` = ?";
    db.query(sqlString, [email, password], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length > 0) {
            callback(result);
        } else {
            callback("Login fail!");
        }
    });
};

User.update = (username, address, account_id, callback) => {
    const sqlString = `UPDATE accounts
                            SET username=?, address=?
                        WHERE account_id = ?`;
    db.query(sqlString, [username, address, account_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Update account successfully');
    });
};

User.changePassword = (old_password, new_password, email, callback) => {
    const sqlString = "SELECT * FROM `accounts` WHERE `email` = ? AND `password` = ?";
    db.query(sqlString, [email, old_password], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length > 0) {
            const sqlString = `UPDATE accounts
                                SET password=?
                                WHERE email=?`;
            db.query(sqlString, [new_password, email], (err, result) => {
                if (err) {
                    return callback(err);
                }
                callback('Change password successfully');
            });
        } else {
            callback("Information invalid!");
        }
    });
};

export default User
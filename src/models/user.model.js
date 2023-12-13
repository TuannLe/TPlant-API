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

User.register = (email, password, created_at, callback) => {
    const sqlString = `INSERT INTO 
                            accounts(email, password, status, role, created_at) 
                        VALUES 
                            (?,?,1,0,?)`;
    db.query(sqlString, [email, password, created_at], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Create account successfully');
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

export default User
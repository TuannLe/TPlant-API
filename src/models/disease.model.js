import db from '../common/connect.js'

export const Disease = (blog) => {
    this.disease_id = blog.disease_id;
    this.name = blog.name;
    this.description = blog.description;
    this.images = blog.images;
};

export const Feedback = (blog) => {
    this.disease_id = blog.disease_id;
    this.account_id = blog.account_id;
    this.rate = blog.rate;
};

Feedback.create = (disease_id, account_id, rate, callback) => {
    const sqlString = `INSERT INTO 
                            disease_feedback(disease_id, account_id, rate) 
                        VALUES 
                            (?,?,?)`;
    db.query(sqlString, [disease_id, account_id, rate], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Feedback successfully');
    });
};

Disease.getDetail = (disease_id, callback) => {
    const sqlString = `SELECT diseases.disease_id, diseases.name , diseases.description, diseases.images, AVG(disease_feedback.rate) AS 'avg_rate'
    FROM diseases
        INNER JOIN disease_feedback ON diseases.disease_id = disease_feedback.disease_id
    WHERE diseases.disease_id = ?`;
    db.query(sqlString, [disease_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(result);
    });
};
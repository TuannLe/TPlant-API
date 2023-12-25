import db from '../common/connect.js'

const Comment = (blog) => {
    this.ar_comment_id = blog.ar_comment_id;
    this.account_id = blog.account_id;
    this.article_id = blog.article_id;
    this.comment = blog.comment;
    this.images = blog.images;
    this.created_at = blog.created_at;
};

Comment.create = (account_id, article_id, comment, images, created_at, callback) => {
    const sqlString = `INSERT INTO 
                            article_comment(account_id, article_id, comment, images, created_at) 
                        VALUES 
                            (?,?,?,?,?)`;
    db.query(sqlString, [account_id, article_id, comment, images, created_at], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Create comment successfully');
    });
};
Comment.getAll = (article_id, callback) => {
    const sqlString = `SELECT article_comment.ar_comment_id,article_comment.account_id, article_comment.comment, article_comment.images, article_comment.created_at, accounts.username AS 'created_by'
    FROM article_comment
        INNER JOIN accounts ON article_comment.account_id = accounts.account_id
    WHERE article_comment.article_id=?`;
    db.query(sqlString, [article_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(result);
    });
};
Comment.update = (comment, images, ar_comment_id, callback) => {
    const sqlString = `UPDATE article_comment
                        SET 
                        comment=?, images=?
                        WHERE ar_comment_id = ?`;
    db.query(sqlString, [comment, images, ar_comment_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Update comment successfully');
    });
}
Comment.delete = (ar_comment_id, callback) => {
    const sqlString = `DELETE FROM article_comment WHERE ar_comment_id = ?`;
    db.query(sqlString, ar_comment_id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Delete comment successfully');
    });
}

export default Comment
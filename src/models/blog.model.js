import db from '../common/connect.js'

const Blog = (blog) => {
    this.article_id = blog.articles_id;
    this.title = blog.title;
    this.content = blog.content;
    this.images = blog.images;
    this.created_at = blog.created_at;
    this.created_by = blog.created_by;
};


Blog.create = (title, content, images, created_at, created_by, callback) => {
    const sqlString = `INSERT INTO 
                            articles(title, content, images, created_at, created_by) 
                        VALUES 
                            (?,?,?,?,?)`;
    db.query(sqlString, [title, content, images, created_at, created_by], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Create blog successfully');
    });
};

Blog.update = (title, content, images, article_id, callback) => {
    const sqlString = `UPDATE articles
                        SET 
                            title=?, content=?, images=? 
                        WHERE article_id = ?`;
    db.query(sqlString, [title, content, images, article_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Update blog successfully');
    });
}

Blog.delete = (article_id, callback) => {
    const sqlString = `DELETE FROM articles WHERE article_id = ?`;
    db.query(sqlString, article_id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Delete blog successfully');
    });
}

Blog.getAll = (callback) => {
    const sqlString = `SELECT articles.article_id, articles.title, articles.content, articles.images, articles.created_at, accounts.username AS 'created_by'
    FROM articles
        INNER JOIN accounts ON articles.created_by = accounts.account_id
    ORDER BY articles.article_id DESC`;
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(result);
    });
};

Blog.getById = (article_id, callback) => {
    const sqlString = `SELECT * FROM articles WHERE article_id = ?`;
    db.query(sqlString, article_id, (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length > 0) {
            callback(result);
        } else {
            callback("Get detail blog fail!");
        }
    });
};

export default Blog
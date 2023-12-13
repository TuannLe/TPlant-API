import db from '../common/connect.js'

const Blog = (blog) => {
    this.articles_id = blog.articles_id;
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

Blog.update = (title, content, images, articles_id, callback) => {
    const sqlString = `UPDATE articles
                        SET 
                            title=?, content=?, images=? 
                        WHERE articles_id = ?`;
    db.query(sqlString, [title, content, images, articles_id], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Update blog successfully');
    });
}

Blog.delete = (articles_id, callback) => {
    const sqlString = `DELETE FROM articles WHERE articles_id = ?`;
    db.query(sqlString, articles_id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback('Delete blog successfully');
    });
}

Blog.getAll = (callback) => {
    const sqlString = `SELECT * FROM articles`;
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(result);
    });
};

export default Blog
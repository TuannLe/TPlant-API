import Comment from '../models/comment.model.js'
import multer from "multer"
import cloudinary from "../../upload.js"


export const commentController = {
    create: (req, res) => {
        if (req.file?.path != undefined) {
            multer(cloudinary.uploader.upload(req.file.path,
                {
                    allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'wedp']
                },
                function (error, result) {
                    if (error) {
                        return error;
                    } else {
                        const account_id = req.body.account_id;
                        const article_id = req.body.article_id;
                        const comment = req.body.comment;
                        const images = result.url;
                        const created_at = new Date()
                        Comment.create(account_id, article_id, comment, images, created_at, (result) => {
                            res.send(result);
                        });
                    }
                })
            );
        } else {
            const account_id = req.body.account_id;
            const article_id = req.body.article_id;
            const comment = req.body.comment;
            const images = null
            const created_at = new Date()
            Comment.create(account_id, article_id, comment, images, created_at, (result) => {
                res.send(result);
            });
        }
    },
    getAll: (req, res) => {
        const article_id = req.params.id;
        Comment.getAll(article_id, (result) => {
            res.send(result);
        });
    },
    update: (req, res) => {
        if (req.file?.path != undefined) {
            multer(cloudinary.uploader.upload(req.file.path,
                {
                    allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'wedp']
                },
                function (error, result) {
                    if (error) {
                        return error;
                    } else {
                        const ar_comment_id = req.params.id;
                        const comment = req.body.comment;
                        const images = result.url;
                        Comment.update(comment, images, ar_comment_id, (result) => {
                            res.send(result);
                        });
                    }
                })
            );
        } else {
            const ar_comment_id = req.params.id;
            const comment = req.body.comment;
            const images = null
            Comment.update(comment, images, ar_comment_id, (result) => {
                res.send(result);
            });
        }
    },
    delete: (req, res) => {
        const ar_comment_id = req.params.id;
        Comment.delete(ar_comment_id, (result) => {
            res.send(result);
        });
    },
}
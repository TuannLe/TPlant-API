
import { EmotionBlog, Blog } from '../models/blog.model.js'
import multer from "multer"
import cloudinary from "../../upload.js"


export const blogController = {
    create: (req, res) => {
        multer(cloudinary.uploader.upload(req.file.path,
            {
                allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'wedp']
            },
            function (error, result) {
                if (error) {
                    return error;
                } else {
                    const images = result.url;
                    const title = req.body.title;
                    const content = req.body.content;
                    const created_by = req.body.created_by;
                    const created_at = new Date()
                    Blog.create(title, content, images, created_at, created_by, (result) => {
                        res.send(result);
                    });
                }
            })
        );
    },
    update: (req, res) => {
        const article_id = req.params.article_id;
        multer(cloudinary.uploader.upload(req.file.path,
            {
                allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'wedp']
            },
            function (error, result) {
                if (error) {
                    return error;
                } else {
                    const images = result.url;
                    const title = req.body.title;
                    const content = req.body.content;
                    Blog.update(title, content, images, article_id, (result) => {
                        res.send(result);
                    });
                }
            })
        );
    },
    delete: (req, res) => {
        const article_id = req.params.article_id;
        Blog.delete(article_id, (result) => {
            res.send(result);
        });
    },
    getAll: (req, res) => {
        try {
            Blog.getAll((result) => {
                res.send(result);
            });
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getByID: (req, res) => {
        const article_id = req.params.article_id;
        Blog.getById(article_id, (result) => {
            res.send(result);
        });
    },
    getPopular: (req, res) => {
        Blog.getPopular((result) => {
            res.send(result);
        });
    },
    handleEmotion: (req, res) => {
        const article_id = req.body.article_id;
        const account_id = req.body.account_id;
        const emotion = req.body.emotion;
        EmotionBlog.emotionChange(article_id, account_id, emotion, (result) => {
            res.send(result);
        });
    }
}
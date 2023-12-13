import Blog from '../models/blog.model.js'
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
        const articles_id = req.params.articles_id;
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
                    Blog.update(title, content, images, articles_id, (result) => {
                        res.send(result);
                    });
                }
            })
        );
    },
    delete: (req, res) => {
        const articles_id = req.params.articles_id;
        Blog.delete(articles_id, (result) => {
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
    }
}
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogRouter from './src/routers/blog.router.js'
import userRouter from './src/routers/user.router.js'
import commentRouter from './src/routers/comment.router.js'
import diseaseRouter from './src/routers/disease.router.js'
import { verifyToken } from './src/common/authMiddleware.js'

dotenv.config()
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/users', userRouter)
app.use('/blogs', verifyToken, blogRouter)
app.use('/comments', verifyToken, commentRouter)
app.use('/diseases', verifyToken, diseaseRouter)

app.listen(PORT);

console.log("RESTful API server started on: " + PORT);
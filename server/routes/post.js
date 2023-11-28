import express from 'express'
import { AddPost, getAllPost, getPost } from '../controllers/post.js';

const router = express.Router();

router.post('/add',AddPost);
router.get('/get/:id',getPost);
router.get('/get',getAllPost);

export default router;
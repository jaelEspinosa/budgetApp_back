import express from 'express'
import { deleteChapter, editChapter, getChapter, getChapters, newChapter } from '../controllers/ChapterController.js';
import checkAuth from '../middlewere/authMiddleware.js'

const router = express.Router()

// validación de token
router.use(checkAuth)

// api endpoints 
router.post('/new', newChapter);
router.get('/', getChapters);
router.get('/:id', getChapter);
router.put('/:id', editChapter);
router.delete('/:id', deleteChapter);


export default router;
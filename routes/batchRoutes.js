import express from 'express'
import { deleteBatch, editBatch, getBatch, getBatchs, newBatch } from '../controllers/BatchController.js';
import checkAuth from '../middlewere/authMiddleware.js'

const router = express.Router()

// validación de token
router.use(checkAuth)

// api endpoints 
router.post('/new', newBatch);
router.get('/', getBatchs);
router.get('/:id', getBatch);
router.put('/:id', editBatch);
router.delete('/:id', deleteBatch);






export default router
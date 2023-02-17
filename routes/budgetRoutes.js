import express from 'express'
import { deleteBudget, editBudget, getBudget, getBudgets, newBudget } from '../controllers/BudgetController.js';

import checkAuth from '../middlewere/authMiddleware.js'

const router = express.Router()

// validación de token
router.use(checkAuth)

// api endpoints 
router.post('/new', newBudget);
router.get('/', getBudgets);
router.get('/:id', getBudget);
router.put('/:id', editBudget);
router.delete('/:id', deleteBudget);


export default router;
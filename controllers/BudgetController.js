
import Budget from '../models/BudgetModel.js'


const newBudget = async ( req, res ) => {

   const budget = new Budget(req.body)
   
   budget.user = req.user._id
   console.log(budget)
   try {
    
     await budget.save()
     res.status(200).json({msg:'saved Successfully', budget})
   } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'There was an error'})
   }

};


const getBudgets = async ( req, res ) => {
   try {
     const budgets = await Budget.find().populate({path:'chapters', populate: {path:'batchs'}})
     if(!budgets.length){
        return res.status(200).json({msg:"You don't have any budgets yet"})
      }
     return res.status(200).json( budgets ) 
   } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'There was an error'})
   }

};

const getBudget = async ( req, res ) => {
  const { id } = req.params

  try {
    const budget = await Budget.findById( id ).populate({path:'chapters', populate: {path:'batchs'}})
    if (budget === null || budget  === undefined){
        return res.status(404).json({msg:'Budget not found'})
       }
    return res.status(200).json(budget)   
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:'There was an error'})
  }

};
const editBudget = async ( req, res ) => {
   const { id } = req.params
   const budgetAct = req.body
   const budgetDB = await Budget.findById( id )

   if(!budgetDB){
     const error = new Error('Data not found')
     return res.status(404).json({msg: error.message})
     }

   try {
     const budget = await Budget.findByIdAndUpdate( id, {budgetDB, ...budgetAct}, {new:true}).populate('chapters')
     return res.status(200).json({msg:'Data updated', budget})
    
   } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'There was an error'})
   }

};
const deleteBudget = async ( req, res ) => {

    const { id } = req.params
    try {
      await Budget.findByIdAndDelete( id )  
      return res.status(200).json({msg:'Budget Deleted'})
        
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg:'There was an error'}) 
    }
};



export {
    newBudget,
    getBudgets,
    getBudget,
    editBudget,
    deleteBudget,
}
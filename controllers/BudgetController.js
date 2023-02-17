
import Budget from '../models/BudgetModel.js'


const newBudget = async ( req, res ) => {

   const budget = new Budget(req.body)
   try {
     await budget.save()
     res.status(200).json({msg:'guardado con éxito', budget})
   } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'hubo un error'})
   }

};


const getBudgets = async ( req, res ) => {
   try {
     const budgets = await Budget.find().populate({path:'chapters', populate: {path:'batchs'}})
     if(!budgets.length){
        return res.status(200).json({msg:'Aún no tienes presupuestos'})
      }
     return res.status(200).json( budgets ) 
   } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'hubo un error'})
   }

};

const getBudget = async ( req, res ) => {
  const { id } = req.params

  try {
    const budget = await Budget.findById( id ).populate({path:'chapters', populate: {path:'batchs'}})
    if (budget === null || budget  === undefined){
        return res.status(404).json({msg:'no se ha encontrado el Presupuesto'})
       }
    return res.status(200).json(budget)   
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:'hubo un error'})
  }

};
const editBudget = async ( req, res ) => {
   const { id } = req.params
   const budgetAct = req.body
   const budgetDB = await Budget.findById( id )

   if(!budgetDB){
     const error = new Error('No se han encontrado los datos')
     return res.status(404).json({msg: error.message})
     }

   try {
     const budget = await Budget.findByIdAndUpdate( id, {budgetDB, ...budgetAct}, {new:true}).populate('chapters')
     return res.status(200).json({msg:'Dato actualizado', budget})
    
   } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'hubo un error'})
   }

};
const deleteBudget = async ( req, res ) => {

    const { id } = req.params
    try {
      await Budget.findByIdAndDelete( id )  
      return res.status(200).json({msg:'Presupuesto eliminado'})
        
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg:'hubo un error'}) 
    }
};



export {
    newBudget,
    getBudgets,
    getBudget,
    editBudget,
    deleteBudget,
}
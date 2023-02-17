
import Batch from '../models/BatchModel.js'


const newBatch = async (req,res) =>{

    try {
      const batch = new Batch(req.body)  
      await batch.save()
      res.status(200).json({msg:'Guardado con éxito', batch})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'hubo un error'})
    }
    
};
const getBatchs = async (req,res) =>{
    try {
        const batchs = await Batch.find()
        if (!batchs.length){
            return res.status(200).json({msg:'Aún no tienes Lotes'})
        }
       return res.status(200).json(batchs)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'hubo un error'})
    }

};


const getBatch = async (req,res) =>{
   const { id } = req.params
   
    try {
        const batch = await Batch.findById(id)
        console.log(batch)
        if (batch=== null || batch === undefined){
         return res.status(404).json({msg:'no se ha encontrado el lote'})
        }

        return res.status(200).json(batch)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'hubo un error'}) 
    }

};


const editBatch = async (req,res) =>{
  const { id } = req.params

  try {
    const batchAct = await Batch.findByIdAndUpdate( id, req.body, {new: true})
    return res.status(200).json(batchAct)

  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:'hubo un error'}) 
  }

};
const deleteBatch = async (req,res) =>{
  const { id } = req.params

  try {
    await Batch.findByIdAndDelete( id )
    return res.status(200).json({msg:'Eliminado con éxito'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:'hubo un error'}) 
  }
};





export {
    newBatch,
    getBatchs,
    getBatch,
    editBatch,
    deleteBatch
}

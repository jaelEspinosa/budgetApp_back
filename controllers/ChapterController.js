import Chapter from '../models/ChapterModel.js'


const newChapter = async ( req, res )=>{

   const chapter = new Chapter(req.body)
   try {
     await chapter.save()
     res.status(200).json({msg:'guardado con éxito', chapter})
    
   } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'hubo un error'})
   }
};


const getChapters = async ( req, res )=>{

    try {
       const chapters = await Chapter.find().populate('batchs')
       if(!chapters.length){
        return res.status(200).json({msg:'Aún no tienes Capitulos'})
       } 
       return res.status(200).json( chapters )
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'hubo un error'}) 
    }

};


const getChapter = async ( req, res )=>{
   const { id } = req.params
   try {
     const chapter = await Chapter.findById( id ).populate('batchs')
     
     if (chapter === null || chapter  === undefined){
        return res.status(404).json({msg:'no se ha encontrado el Capitulo'})
       }
     return res.status(200).json( chapter )  
   } catch (error) {
    console.log(error)
    return res.status(500).json({msg:'hubo un error'}) 
   }

};


const editChapter = async ( req, res )=>{

    const { id } = req.params
    const chapterAct = req.body
    const chapterDB = await Chapter.findById( id )

    if(!chapterDB){
        const error = new Error('No se han encontrado los datos')
        return res.status(404).json({msg: error.message})
    }

    try {
      const chapter = await Chapter.findByIdAndUpdate(id, {chapterDB, ...chapterAct},{new:true}).populate('batchs')  
      return res.status(200).json({msg:"Dato actualizado", chapter}) 

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'hubo un error'})   
    }
};


const deleteChapter = async ( req, res )=>{
  const { id } = req.params
   
  try {
    await Chapter.findByIdAndDelete( id );
    return res.status(200).json({msg: "Eliminado con éxito"})
  } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'hubo un error'})  
  }
};






export {
    newChapter,
    getChapters,
    getChapter,
    editChapter,
    deleteChapter,
}
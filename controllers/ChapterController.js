import Chapter from '../models/ChapterModel.js'


const newChapter = async ( req, res )=>{

   const chapter = new Chapter(req.body)
   try {
     await chapter.save()
     res.status(200).json({msg:'saved succesfully', chapter})
    
   } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'There was an error'})
   }
};


const getChapters = async ( req, res )=>{

    try {
       const chapters = await Chapter.find().populate('batchs')
       if(!chapters.length){
        return res.status(200).json({msg:"You don't have any chapters yet"})
       } 
       return res.status(200).json( chapters )
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'There was an error'}) 
    }

};


const getChapter = async ( req, res )=>{
   const { id } = req.params
   try {
     const chapter = await Chapter.findById( id ).populate('batchs')
     
     if (chapter === null || chapter  === undefined){
        return res.status(404).json({msg:'Chapter not found'})
       }
     return res.status(200).json( chapter )  
   } catch (error) {
    console.log(error)
    return res.status(500).json({msg:'There was an error'}) 
   }

};


const editChapter = async ( req, res )=>{

    const { id } = req.params
    const chapterAct = req.body
    const chapterDB = await Chapter.findById( id )

    if(!chapterDB){
        const error = new Error('Data not found')
        return res.status(404).json({msg: error.message})
    }

    try {
      const chapter = await Chapter.findByIdAndUpdate(id, {chapterDB, ...chapterAct},{new:true}).populate('batchs')  
      return res.status(200).json({msg:"Data updated", chapter}) 

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'There was an error'})   
    }
};


const deleteChapter = async ( req, res )=>{
  const { id } = req.params
   
  try {
    await Chapter.findByIdAndDelete( id );
    return res.status(200).json({msg: "successfully deleted"})
  } catch (error) {
     console.log(error)
     return res.status(500).json({msg:'There was an error'})  
  }
};






export {
    newChapter,
    getChapters,
    getChapter,
    editChapter,
    deleteChapter,
}
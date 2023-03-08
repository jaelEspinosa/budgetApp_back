import mongoose from "mongoose";

const chapterSchema = mongoose.Schema({

    rank:{
        type: Number,
        required: false
    },
    description:{
        type: String, 
        required: true
    },
    coefficiensMaterial:{
        type:Number,
        required:true
    },
    coefficiensLabour:{
        type:Number,
        required:true
    },
    batchs:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Batch', 
        required:false
    }]

})

const Chapter = mongoose.model('Chapter', chapterSchema)
export default Chapter

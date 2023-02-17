
import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
    rank:{
        type: Number,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    materialCost:{
        type:Number,
        required:true,
    },
    labourCost:{
        type:Number,
        required:true
    }
})

const Batch = mongoose.model('Batch', batchSchema)
export default Batch
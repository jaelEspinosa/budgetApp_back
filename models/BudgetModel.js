import mongoose from 'mongoose';

const budgetSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref:"User"
    },
    name:{
        type: String,
        required:true
    },
    img:{
        type: String       
    },
    date:{
        type: Date,
        required:true, 
        default:Date.now()
    },
    clientName:{
        type: String,
        required: true
    },
    chapters:[{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: false }],

})

const Budget = mongoose.model('Budget', budgetSchema )
export default Budget
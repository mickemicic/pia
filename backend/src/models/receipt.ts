import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Receipt = new Schema({
    title:{
        type: String,
    },
    sum:{
        type: Number
    },
    date:{
        type: Date
    },
    buyer:{
        type: String
    },
    pib:{
        type: Number
    }
})

export default mongoose.model('Receipt', Receipt, 'receipts');